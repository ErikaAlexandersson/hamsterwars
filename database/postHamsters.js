import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  let newHamster = req.body;
  const collectionRef = collection(db, "hamsters");

  if (newHamster === null || newHamster === undefined) {
    res.sendStatus(400);
    return;
  }
  const newDocRef = await addDoc(collectionRef, newHamster);
  res.status(200).send({ id: newDocRef.id });

  console.log("Lade till nytt dokument med id: ", newDocRef.id);
});

export default router;
