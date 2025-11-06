# Continuous Feedback Loop (FSR‑034)

## Overview and rationale

Deploying new features is only the beginning; sustainable improvement requires listening to users and iterating.  The **Continuous Feedback Loop** research area proposes building mechanisms to **collect, aggregate and act on user feedback** throughout the lifecycle of research and development.  This includes in‑product surveys, post‑launch questionnaires, telemetry analysis and direct customer interviews.  Feedback should feed back into the research tracker, influencing Impact/Effort scores and helping prioritise the next cycle.

Integrating feedback closes the loop between delivery and research.  It supports evidence‑weighted decisions (a guiding principle of Flow Systems) and empowers users to shape the platform.  When combined with SmartEx and Contextual Rules, feedback can refine prioritisation algorithms and highlight emergent needs.

## Related Flow Systems modules

- **GovernFlow** – collects telemetry and survey results, surfaces trends and anomalies【293456135875423†L6-L13】.
- **WorkflowFlow** – triggers feedback collection workflows (e.g., send survey after a proposal is sent).
- **EvolveFlow** – hosts knowledge articles and could incorporate Q&A and discussion threads.
- **Research Tracker (FSR‑028)** – stores qualitative feedback as notes and quantitative ratings to inform priority weighting.

## Expected outcomes

1. **Feedback capture mechanisms:** Widgets and forms embedded in the UI (e.g., “Was this helpful?” prompts), periodic surveys and automated emails.
2. **Centralised feedback repository:** A store for qualitative comments, feature requests and ratings, linked to specific modules or research areas.
3. **Analytics & dashboards:** Tools in GovernFlow to analyse feedback sentiment, frequency and impact on key metrics (e.g., adoption, churn).
4. **Prioritisation integration:** Processes to convert feedback insights into updated Impact/Effort scores and research priorities.

## Risks and unknowns

- **Survey fatigue:** Over‑soliciting feedback can annoy users; feedback requests must be well‑timed and optional.
- **Bias & representativeness:** Feedback may overrepresent vocal users; triangulating with telemetry helps mitigate bias.
- **Actionability:** Collecting feedback without a clear path to action can erode trust; processes must ensure follow‑up.

## Preliminary framework outline

1. **Touchpoint mapping:** Identify moments when feedback can be requested (after completing a task, exiting a module, periodic check‑ins).  Ensure prompts are contextually relevant.
2. **Feedback channels:** Create multiple channels: in‑app micro‑surveys, email surveys, NPS scores, and community forums.
3. **Data ingestion & tagging:** Store feedback with metadata (module, user segment, timestamp).  Use natural language processing to categorise comments (e.g., themes, sentiment).
4. **Feedback processing:** Establish a review cadence where product teams triage feedback, assign owners and create follow‑up actions.  Feed prioritisation logic with aggregated metrics (e.g., number of requests for a feature × importance rating).
5. **Transparency:** Communicate back to users about how their feedback has influenced product updates, building trust and encouraging further input.

## Technical notes & next steps

A prototype could start with a simple API to post feedback and a dashboard to view submissions.  The pseudocode below illustrates a basic feedback capture endpoint:

```python
from datetime import datetime

feedback_store = []

def capture_feedback(module, user_id, rating, comment=None):
    feedback = {
        'module': module,
        'user_id': user_id,
        'rating': rating,
        'comment': comment,
        'timestamp': datetime.utcnow(),
    }
    feedback_store.append(feedback)
    return {'status': 'received'}

# Example usage
capture_feedback('ServeFlow', 'u123', 4, 'Great proposal generator but could be faster')
```

Next steps include designing the UI prompts, integrating feedback capture into WorkflowFlow triggers, and building analysis pipelines in GovernFlow.  Feeding aggregated scores back into the research tracker will close the loop between feedback and prioritisation.
