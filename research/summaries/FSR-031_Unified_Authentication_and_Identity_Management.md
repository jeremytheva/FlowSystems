# Unified Authentication & Identity Management (FSR‑31)

## Overview and rationale

As Flow Systems expands across marketing, sales, delivery and governance, users currently manage identities separately within each module.  This fragmentation creates friction (multiple logins), complicates permissions and increases security risk.  The **Unified Authentication & Identity Management** research area aims to build a **single sign‑on (SSO) and role‑based access control (RBAC)** system that serves all modules.  Centralising authentication will streamline onboarding, enforce consistent security policies and simplify auditing.

A unified identity layer also unlocks cross‑module personalisation: SmartEx can tailor priorities based on the same user profile that governs access to ServeFlow proposals or EvolveFlow knowledge.  Integrating identity with the Platform Data Model ensures that user records are authoritative and up‑to‑date across the system.

## Related Flow Systems modules

- **FlowBot Core** – hosts the authentication broker and provides token issuance and validation【293456135875423†L6-L13】.
- **Platform Data Model (FSR‑002)** – defines the canonical user schema and stores identity metadata.
- **All functional modules** – AttractFlow, ServeFlow, EvolveFlow, WorkflowFlow and GovernFlow must authenticate against the central service and honour RBAC policies.

## Expected outcomes

1. **Single sign‑on service:** A central service implementing OAuth 2.0 / OpenID Connect that issues access tokens recognised by all modules.
2. **Role & permission model:** A flexible RBAC system with hierarchical roles (admin, editor, viewer) and module‑specific scopes.
3. **User directory:** A consolidated user store that synchronises identities across internal systems and external providers (e.g., Google Workspace, Azure AD).
4. **Policy enforcement points:** Middleware libraries for each module to validate tokens, enforce permissions and provide hooks for auditing.

## Risks and unknowns

- **Security & compliance:** Centralising authentication increases the impact of a breach; robust encryption, monitoring and compliance with regulations (GDPR, SOC 2) are essential.
- **Integration complexity:** Migrating existing modules to a new identity provider may require significant refactoring.
- **User management policies:** Deciding how roles map to modules and whether users can self‑register or require approval.

## Preliminary framework outline

1. **Requirements gathering:** Catalogue current authentication mechanisms across modules and define target requirements (SSO protocols, MFA, password policies).
2. **Select identity provider:** Choose to build in‑house using open‑source frameworks (e.g., Keycloak) or integrate with third‑party providers (Auth0, Okta).
3. **Define RBAC model:** Identify common roles and scopes.  Map them to module actions (e.g., only users with `proposal:edit` scope can modify ServeFlow proposals).
4. **Implement authentication broker:** Deploy the chosen identity provider.  Configure OIDC/OAuth flows, token lifetimes and refresh mechanisms.
5. **Module integration:** Replace local login forms with redirects to the identity provider.  Add middleware to validate JWTs and enforce scopes on API routes.
6. **Migration & rollout:** Migrate existing users to the new directory, provide self‑service password reset and document new login flows.

## Technical notes & next steps

A typical implementation uses an open‑source identity server.  The pseudocode below illustrates how a module might validate incoming requests:

```python
from functools import wraps
from jose import jwt
from flask import request, abort

AUTH_PUBLIC_KEY = get_jwks_key()  # fetched from the identity provider

def requires_scope(required_scope):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                abort(401)
            token = auth_header.split(' ')[1]
            try:
                claims = jwt.decode(token, AUTH_PUBLIC_KEY, algorithms=['RS256'], audience='flow-systems')
            except jwt.JWTError:
                abort(401)
            if required_scope not in claims.get('scope', '').split():
                abort(403)
            return f(*args, **kwargs)
        return wrapper
    return decorator

@requires_scope('proposal:edit')
def update_proposal(proposal_id):
    # Only users with the correct scope can update a proposal
    pass
```

Next steps include selecting a provider, drafting an RBAC matrix, integrating token validation libraries into each module, and documenting the migration plan.  Once deployed, the unified identity service will serve as the security backbone for Flow Systems.
