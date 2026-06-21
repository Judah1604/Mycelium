import fs from "fs";

export function writeResults(analysis, comparison, subjectFile) {
  const today = new Date().toISOString().split("T")[0];
  const safeName = subjectFile.replace(".md", "").replace(/[<>:"/\\|?*]/g, "_");
  const reportFolder = `./src/vault/reports/${safeName}/${today}`;

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

  fs.mkdirSync(reportFolder, { recursive: true });

  if (comparison === null) {
    fs.writeFileSync(`${reportFolder}/analysis.md`, analysis);

    return;
  }
  const relationshipData = extractJson(comparison);

  fs.writeFileSync(
    `./src/vault/reports/${safeName}/${today}/analysis.md`,
    analysis,
  );

  fs.writeFileSync(
    `./src/vault/reports/${safeName}/${today}/comparison.md`,
    comparison,
  );

  fs.writeFileSync(
    `./src/vault/reports/${safeName}/${today}/relationship.json`,
    JSON.stringify(relationshipData, null, 2),
  );
}
