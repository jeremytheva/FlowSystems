import { scoreWorkflow } from "./scoring";
import { sampleWorkflows } from "./sample-data";

// Minimal usage example for manual testing and type-checking.
export function exampleScoreFirstWorkflow() {
  const workflow = sampleWorkflows[0];
  const result = scoreWorkflow(workflow);

  if (result.overallScore < 0 || result.overallScore > 100) {
    throw new Error("overallScore is out of expected 0-100 range");
  }

  if (!result.criteriaResults.length) {
    throw new Error("Expected at least one criterion result");
  }

  // Log for local debugging; avoid noisy output in production imports.
  // eslint-disable-next-line no-console
  console.log("Workflow score", {
    name: workflow.name,
    overallScore: result.overallScore,
    criteria: result.criteriaResults.map((c) => ({
      id: c.criterionId,
      score: c.score,
      weight: c.weight,
    })),
  });

  return result;
}
