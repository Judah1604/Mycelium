import fs from "fs";

export function writeResults(analysis, comparison, subjectFile) {
  function extractJson(text) {
    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

      if (!match) {
        throw new Error("No valid JSON found");
      }

      return JSON.parse(match[1]);
    }
  }
  const relationshipData = extractJson(comparison);
  const today = new Date().toISOString().split("T")[0];
  const safeName = subjectFile.replace(".md", "").replace(/[<>:"/\\|?*]/g, "_");
  const reportFolder = `./src/vault/reports/${safeName}/${today}`;

  fs.mkdirSync(reportFolder, { recursive: true });

  fs.writeFileSync(
    `./src/vault/reports/${safeName}/${today}/analysis.md`,
    analysis,
  );
  console.log(comparison);

  fs.writeFileSync(
    `./src/vault/reports/${safeName}/${today}/comparison.md`,
    comparison,
  );

  fs.writeFileSync(
    `./src/vault/reports/${safeName}/${today}/relationship.json`,
    JSON.stringify(relationshipData, null, 2),
  );
}
