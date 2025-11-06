# Internationalisation & Localisation (FSR‑032)

## Overview and rationale

Flow Systems currently assumes an English‑centric interface and data format.  To reach a global audience, the platform must be **internationalised** (prepared to support multiple languages and regions) and **localised** (adapted for specific locales).  This research area examines how to implement multilingual user interfaces, localise dates, numbers and currency formats, and translate content (e.g., templates, help text) without duplicating effort or breaking brand consistency.

Internationalisation aligns with the adaptive UX principles articulated in Interface Adaptation Logic (FSR‑015).  A centralised localisation strategy ensures that modules like BrandingFlow and ServeFlow can present copy and assets that adhere to regional norms, while the Adaptive Behaviour Engine (FSR‑006) can adjust preferences based on locale.  Providing a truly inclusive experience opens Flow Systems to new markets and enhances accessibility.

## Related Flow Systems modules

- **Interface Adaptation Logic (FSR‑015)** – will use localisation settings to choose layouts and colour palettes.
- **BrandingFlow** – provides language‑specific tone and asset guidelines.
- **FlowBot Core** – orchestrates prompts and templates, which must be translated and localised【293456135875423†L6-L13】.
- **ServeFlow / AttractFlow** – need multilingual templates for proposals and marketing campaigns.

## Expected outcomes

1. **Localisation framework:** Tooling and process for extracting text, creating resource bundles and plugging translations back into UI components.
2. **Locale detection & preferences:** Mechanisms to detect user locale (browser settings, account preferences) and store it in the user profile.
3. **Translation workflow:** Guidelines for professional translation vs. machine translation, including quality assurance and context management.
4. **Locale‑aware formatting:** Libraries for formatting dates, times, numbers and currencies according to regional standards.

## Risks and unknowns

- **Quality & consistency:** Machine‑translated content may not capture nuance or brand voice; quality control is critical.
- **Layout challenges:** Some languages require right‑to‑left (RTL) layouts or have longer text strings, impacting design.
- **Maintenance overhead:** New features must include localisation from the outset to avoid technical debt.

## Preliminary framework outline

1. **Audit & extraction:** Scan existing code and content for hard‑coded strings.  Replace them with keys referencing resource files (e.g., JSON or i18n YAML files).
2. **Resource bundling:** Organise translations by locale and module.  Use a consistent naming convention and fallback rules when a translation is missing.
3. **Locale detection:** Implement functions that detect user locale based on browser settings or saved preferences and set it in the session context.
4. **Runtime resolution:** When rendering UI components or generating documents, look up the appropriate translation key and format locale‑sensitive values using libraries like `Intl` (JavaScript) or `babel` (Python).
5. **Translation workflow:** Integrate with translation management systems (TMS) or services like Crowdin or Transifex.  Include review steps to ensure accuracy and tone alignment.

## Technical notes & next steps

Internationalisation can be layered on top of existing UI frameworks.  The pseudocode below sketches how a component might load translations based on locale:

```javascript
// Example using JavaScript and JSON resource bundles
import translations from './i18n/en.json';
import translations_fr from './i18n/fr.json';

function getTranslator(locale) {
  const resources = { en: translations, fr: translations_fr };
  return (key) => resources[locale][key] || resources['en'][key];
}

function Greeting({ locale }) {
  const t = getTranslator(locale);
  return <h1>{t('welcome_message')}</h1>;
}
```

For dates and numbers, use locale‑aware formatting:

```python
import babel.dates as dates
from datetime import datetime

def format_date(dt, locale='en_US'):
    return dates.format_datetime(dt, locale=locale)

# Example
print(format_date(datetime.now(), locale='fr_FR'))  # « 6 novembre 2025 à 14:30 »
```

Next steps involve cataloguing all user‑visible strings, establishing translation guidelines with BrandingFlow, and integrating i18n tooling into the build process so that localisation becomes a standard part of development.
