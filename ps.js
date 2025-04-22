const { create } = require("domain");
const fs = require("fs");
const { stdin, stdout } = require("process");
const filePath = "products.json";
const readline = require("readline");
const { json } = require("stream/consumers");

//
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Write Product
function WriteProduct() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function ReadProduct() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
}
