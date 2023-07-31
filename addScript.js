const fs = require("fs");
const path = require("path");
console.log("Running script");
const userPackageJsonPath = path.resolve(process.cwd(), "package.json");
const userPackageJson = require(userPackageJsonPath);

// Modify the user's package.json here
if (!userPackageJson.scripts) {
  userPackageJson.scripts = {};
}

userPackageJson.scripts["banao"] = "node ./node_modules/aj-auto/app.js";

// Write the modified package.json back to the user's file system
fs.writeFileSync(userPackageJsonPath, JSON.stringify(userPackageJson, null, 2));

console.log("Your custom script has been added to package.json!");
