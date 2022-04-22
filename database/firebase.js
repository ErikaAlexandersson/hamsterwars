// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebaseConfig from "./firebaseConfig.json" assert { type: "json" };
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
// const my_json_file = require("./firebaseConfig.json"); // use the require method

let privateKey;
if (process.env.PRIVATE_KEY) {
  privateKey = JSON.parse(process.env.PRIVATE_KEY);
} else {
  privateKey = require("./firebaseConfig.json");
}

const app = initializeApp(privateKey);

const db = getFirestore(app);

export { db };
