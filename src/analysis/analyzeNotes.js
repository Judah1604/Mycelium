import fs from "fs";
import { askLLM } from "../llm/askLLM.js";
import { extractKeywords } from "../analysis/extractKeywords.js";
import { getRelatedNotes } from "../analysis/getRelatedNotes.js";
import { compareNotes } from "../analysis/compareNotes.js";
import { writeResults } from "../vault/writeResults.js";

export async function analyzeNote(subjectFile) {
  console.log("\n Analyzing note...\n");

  const analysisInject = fs.readFileSync(
    "./src/prompts/analysis_inject.md",
    "utf8",
  );

  const comparisonInject = fs.readFileSync(
    "./src/prompts/comparison_inject.md",
    "utf8",
  );

  const fileContent = fs.readFileSync(`./Vault/${subjectFile}`, "utf8");

  const analysisPrompt = `Subject Note: ${subjectFile}\n${analysisInject}\n\n${fileContent}`;

  const analysis = await askLLM(analysisPrompt);

  if (!analysis) {
    console.log("Analysis failed.");
    return;
  }

  console.log("✓ Analysis complete");

  const keywords = extractKeywords(analysis);

  console.log("Finding related notes...");

  const relatedNotes = getRelatedNotes(keywords, subjectFile);

  if (relatedNotes.length === 0) {
    console.log("⚠ No related notes found.");

    writeResults(analysis, null, subjectFile);

    return;
  }

  console.log(`✓ Found ${relatedNotes.length} related notes`);
  relatedNotes.forEach((note) => {
    console.log(note.file);
  });

  console.log("Comparing ideas...");

  const comparisonResponse = await compareNotes(
    analysis,
    comparisonInject,
    relatedNotes,
  );

  if (!comparisonResponse) {
    console.log("Skipping comparison report.");
    return;
  }

  console.log("✓ Comparison complete");

  writeResults(analysis, comparisonResponse, subjectFile);

  console.log("✓ Reports saved");
}
