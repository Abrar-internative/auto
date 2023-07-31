const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const pluralize = require("pluralize");

const capitalize = require("./utility/capitalize");
const createOrUpdateFile = require("./utility/createOrUpdateFile");

const entityName = process.argv[2];

const directories = ["route", "controller", "service", "validation"];

const validations = ["create", "update"];

directories.forEach((directory) => {
  if (directory === "validation") {
    validations.forEach((validation) => {
      const starterTemplate = fs.readFileSync(
        `${__dirname}/template/${validation}${capitalize(
          directory
        )}.template.ejs`,
        "utf8"
      );
      const template = ejs.render(starterTemplate, {
        entityName,
        capitalize,
        plural: pluralize.plural,
      });

      createOrUpdateFile(
        `${directory}s/${entityName}/${entityName}${capitalize(
          validation
        )}.${directory}.js`,
        template
      );
    });
  } else {
    const starterTemplate = fs.readFileSync(
      `${__dirname}/template/${directory}.template.ejs`,
      "utf8"
    );
    const template = ejs.render(starterTemplate, {
      entityName,
      capitalize,
      plural: pluralize.plural,
    });

    createOrUpdateFile(
      `${directory}s/${entityName}/${entityName}.${
        directory === "route" ? directory + "s" : directory
      }.js`,
      template
    );
  }

  console.log(`${entityName} ${directory}s created successfully.`);
});

console.log(`All done.`);
