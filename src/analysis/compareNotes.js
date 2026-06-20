import fs from "fs";
import { askLLM } from "../llm/askLLM.js";

export async function compareNotes(analysis, comparison_inject, relatedNotes) {
  let notesAndContent = "";

  const start = analysis.indexOf("# Hidden Assumptions");
  const end = analysis.indexOf("# Adjacent Concepts");
  const distilledSubject = analysis.slice(start, end);

  if (relatedNotes.length === 0) {
    console.log("No related notes found.");
    return;
  }
  relatedNotes.forEach((note) => {
    console.log(note.file);
  });

  for (const note of relatedNotes) {
    const content = fs.readFileSync(`./Vault/${note.file}`, "utf-8");
    notesAndContent += `Related Note: ${note.file}\nContent:\n${content}\n\n`;
  }
  const comparison_prompt = `${comparison_inject}\n\nSubject: ${distilledSubject}\n\n${notesAndContent}\n`;
  const comparisonResponse = await askLLM(comparison_prompt);
  // console.log(comparisonResponse);
  return comparisonResponse;
}
