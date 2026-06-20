import fs from "fs";
import inquirer from "inquirer";

export async function selectNote() {
  const notes = fs
    .readdirSync("./Vault")
    .filter((file) => file.endsWith(".md"));

  const { subjectFile } = await inquirer.prompt([
    {
      type: "select",
      name: "subjectFile",
      message: "Select a note:",
      choices: notes,
    },
  ]);

  return subjectFile;
}