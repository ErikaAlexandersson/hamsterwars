import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import express from "express";

const router = express.Router();
const colRef = collection(db, "hamsters");
let allHamsters = [];

router.get("/", async (req, res) => {
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((doc) => {
    allHamsters.push({ ...doc.data(), id: doc.id });
  });
  res.status(200).send(allHamsters);
});

export default router;
