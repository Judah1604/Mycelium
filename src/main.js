import fs from "fs";
import dotenv from "dotenv";
import { askLLM } from "./llm/askLLM.js";
import { extractKeywords } from "./analysis/extractKeywords.js";
import { getRelatedNotes } from "./analysis/getRelatedNotes.js";
import { writeResults } from "./vault/writeResults.js";
import { compareNotes } from "./analysis/compareNotes.js";

dotenv.config();

const subjectFile = "We are God";
const analysis_inject = fs.readFileSync(
  "./src/prompts/analysis_inject.md",
  "utf-8",
);
const comparison_inject = fs.readFileSync(
  "./src/prompts/comparison_inject.md",
  "utf-8",
);
const fileContent = fs.readFileSync(`${subjectFile}.md`, "utf-8");
const analysis_prompt = `${analysis_inject}\n\n${fileContent}\n`;

const analysis = await askLLM(analysis_prompt);

const keywords =
  extractKeywords(analysis);

const relatedNotes =
  getRelatedNotes(
    keywords,
    subjectFile
  );

const comparisonResponse = await compareNotes(analysis, comparison_inject, relatedNotes);

writeResults(
  analysis,
  comparisonResponse,
  subjectFile
);
