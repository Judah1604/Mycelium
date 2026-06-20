import fs from "fs";
import dotenv from "dotenv";
import inquirer from "inquirer";
import { selectNote } from "./ui/selectNote.js";
import { mainMenu } from "./ui/mainMenu.js";
import { analyzeNote } from "./analysis/analyzeNotes.js";

dotenv.config();

const action = await mainMenu();

if (action === "exit") {
  process.exit();
}

if (action === "analyze") {
  const note = await selectNote();

  await analyzeNote(note);
}
