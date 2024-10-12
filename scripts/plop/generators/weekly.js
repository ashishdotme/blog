const generator = (plop) => {
  plop.load("../helpers/date.js");
  plop.setDefaultInclude({ generators: true });

  plop.setGenerator("weekly", {
    prompts: [],
    actions: [
      {
        type: "add",
        path: "../../weekly/week-{{week}}-{{year}}.md",
        templateFile: "../templates/weekly.hbs",
      },
    ],
  });
};

export default generator;
