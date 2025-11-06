# Automated Versioning & Regeneration (FSR‑35)

## Overview and rationale

The Flow Systems research tracker and documentation are living artefacts that change frequently as new information arrives.  Manual versioning and regeneration of diagrams and reports can be error‑prone and time‑consuming.  The **Automated Versioning & Regeneration** research area proposes scripts and pipelines to **detect changes**, automatically increment version numbers (v1.3, v1.4, …), update timestamps, regenerate dependency diagrams, flagged item reports and governance logs, and store them in the repository.

Automating these tasks reduces administrative overhead and ensures that stakeholders always have access to the latest information.  It also supports auditability: by capturing changes and versions, the programme can demonstrate due diligence and trace decisions over time.

## Related Flow Systems modules

- **Research Tracker (FSR‑28)** – the primary data source for change detection and version bumping.
- **WorkflowFlow** – could run the automation pipeline on a schedule or trigger based on repository commits.
- **GovernFlow** – stores logs of changes and renders dashboards showing version history【293456135875423†L6-L13】.

## Expected outcomes

1. **Change detection script:** A script that monitors the CSV and documentation for changes (e.g., new rows, updated dependencies) using file hashes or diffs.
2. **Version bump & timestamp:** Automatic update of the “Last Updated” and “Last Updated in Version” fields, incrementing the minor version number.
3. **Artifact regeneration:** Regeneration of Mermaid dependency diagrams, flagged items reports and governance logs, storing them with consistent naming (e.g., `dependencies_v1.4.mmd`).
4. **CI/CD integration:** Pipeline integration (e.g., GitHub Actions) that runs the script on commit and pushes updated files back to the repository.

## Risks and unknowns

- **False positives:** Overly sensitive change detection may bump versions unnecessarily; diff logic must focus on substantive changes.
- **File conflicts:** Automated updates could conflict with manual edits; a review step may be needed.
- **Environment compatibility:** Scripts must run in the same environment as the repository, requiring careful configuration.

## Preliminary framework outline

1. **File monitoring:** Use checksum or diff libraries (e.g., Python’s `hashlib`, `difflib`) to detect when the CSV or summary files have changed since the last version.
2. **Version management:** Store the current version number in a metadata file.  When changes are detected, increment the version (e.g., v1.3 → v1.4) and write it back.
3. **Regeneration tasks:** Call functions to rebuild diagrams (`dependencies.mmd`), flagged items report and governance log based on the updated CSV.  Save these artifacts with the new version suffix.
4. **Automated commit:** Use Git CLI or a GitHub API to commit the updated files and tag the version.  Optionally create a pull request for review.
5. **Scheduling:** Configure a CI job or repository webhook to run the script on a schedule or on each commit to the CSV.

## Technical notes & next steps

Below is a simplified pseudocode sketch for detecting changes and bumping versions:

```python
import hashlib, json

VERSION_FILE = 'tracker_version.json'

# Load current version and last hash
with open(VERSION_FILE) as f:
    meta = json.load(f)
current_version = meta['version']
last_hash = meta['hash']

# Compute new hash
with open('Flow_Systems_Research_Tracker.csv', 'rb') as f:
    data = f.read()
    new_hash = hashlib.md5(data).hexdigest()

if new_hash != last_hash:
    # bump version
    major, minor = map(int, current_version.strip('v').split('.'))
    minor += 1
    new_version = f'v{major}.{minor}'
    meta.update({'version': new_version, 'hash': new_hash})
    with open(VERSION_FILE, 'w') as f:
        json.dump(meta, f)
    regenerate_artifacts(new_version)
```

Next steps involve refining the diff logic to ignore whitespace or comments, integrating diagram generation scripts, and setting up CI pipelines.  Clear documentation and review procedures will prevent automated updates from introducing inconsistencies.
