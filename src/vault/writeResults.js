import fs from "fs";

export function writeResults(analysis, comparison, subjectFile) {
  const match = comparison.match(/```json([\s\S]*?)```/);
  const relationshipData = JSON.parse(match[1]);
  const today = new Date().toISOString().split("T")[0];
  const safeName = subjectFile.replace(".md", "").replace(/[<>:"/\\|?*]/g, "_");
  const reportFolder = `./src/vault/reports/${safeName}/${today}`;

  fs.mkdirSync(reportFolder, { recursive: true });

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
