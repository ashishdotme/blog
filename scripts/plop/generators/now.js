const generator = (plop) => {
  plop.load("../helpers/date.js");

  plop.setDefaultInclude({ generators: true });

  plop.setGenerator("now", {
    prompts: [],
    actions: [
      {
        type: "add",
        path: "../../now/{{date}}.md",
        templateFile: "../templates/now.hbs",
      },
    ],
  });
};

export default generator;
