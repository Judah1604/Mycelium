import inquirer from "inquirer";

export async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "select",
      name: "action",
      message: "Mycelium",
      choices: [
        {
          name: "Analyze Note",
          value: "analyze",
        },
        {
          name: "Exit",
          value: "exit",
        },
      ],
    },
  ]);

  return action;
}