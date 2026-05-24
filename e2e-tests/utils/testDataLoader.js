const fs = require("fs");
const path = require("path");

function resolveEnvName() {
  if (process.env.ENV_NAME) {
    return process.env.ENV_NAME.toLowerCase();
  }

  const envFile = process.env.ENV_FILE || ".env.dev";
  const fileName = path.basename(envFile).toLowerCase();

  if (fileName.includes("qa")) return "qa";
  if (fileName.includes("uat")) return "uat";
  return "dev";
}

function loadTestData() {
  const envName = resolveEnvName();
  const dataPath = path.resolve(__dirname, "..", "..", "test-data", `${envName}.json`);

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Test data file not found for env '${envName}': ${dataPath}`);
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

module.exports = {
  resolveEnvName,
  loadTestData,
};
