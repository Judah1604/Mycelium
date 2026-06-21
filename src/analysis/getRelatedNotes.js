import fs from "fs";

export function getRelatedNotes(keywords, subjectFile) {
  const files = fs
    .readdirSync("./Vault")
    .filter((file) => file.endsWith(".md"));
  const results = [];

  for (const file of files) {
    if (file === `${subjectFile}`) {
      continue;
    }
    let score = 0;
    const content = fs.readFileSync(`./Vault/${file}`, "utf-8");

    for (const keyword of keywords) {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        score++;
      }
    }

    results.push({
      file,
      score,
    });
  }

  results.sort((a, b) => b.score - a.score);
  const candidates = results.filter((result) => result.score > 0);

  return candidates;
}
