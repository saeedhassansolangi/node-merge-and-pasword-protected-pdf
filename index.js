const { exec } = require("node:child_process");
const execute = require("node:util").promisify(exec);
const fs = require("node:fs");

const FILES = ["file1.pdf", "file2.pdf", "file3.pdf"];
const USER_PASSWORD = "123456";
const OWNER_PASSWORD = "123456";
const ENTRY_FILE = "Account12.pdf";

//  prettier-ignore
const mergeCommand = `qpdf --empty --pages ${FILES.join(" ")} -- ${ENTRY_FILE}`;
const passProtectedCommand = `qpdf --replace-input --encrypt ${USER_PASSWORD} ${OWNER_PASSWORD} 256 -- ${ENTRY_FILE}`;

async function run() {
  await execute(mergeCommand);
  await execute(passProtectedCommand);
  const base64Str = fs.readFileSync("entryFile.pdf", { encoding: "base64" });
  console.log(base64Str);
}

run();
