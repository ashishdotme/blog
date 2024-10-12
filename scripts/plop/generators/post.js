const generator = (plop) => {
  plop.load("plop-helper-slugify");

  plop.setDefaultInclude({ generators: true });

  plop.setGenerator("post", {
    prompts: [
      {
        type: "input",
        name: "title",
        message: "post title",
      },
      {
        type: "list",
        name: "topic",
        message: "post topic",
        choices: ["coding", "life", "tech", "leetcode"],
      },
      {
        type: "input",
        name: "tags",
        message: "post tag",
        filter: (input) => {
          if (!input) {
            return "";
          }

          const filteredInput = input
            .split(" ")
            .map((item) => `"${item}"`)
            .join(", ");

          return filteredInput;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "../../posts/{{slugify title}}.md",
        templateFile: "../templates/post.hbs",
      },
    ],
  });
};

export default generator;
