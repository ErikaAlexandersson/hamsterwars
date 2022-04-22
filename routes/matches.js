import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../database/firebase.js";
import express from "express";

const router = express.Router();
const colRef = collection(db, "matches");

router.get("/", async (req, res) => {
  let allHamsters = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((doc) => {
    allHamsters.push({ ...doc.data(), id: doc.id });
  });
  res.status(200).send(allHamsters);
});

router.post("/", async (req, res) => {
  let newHamster = req.body;

  if (req.body.winnerId === undefined || req.body.loserId === undefined) {
    res.sendStatus(406);
    return;
  }
  const newDocRef = await addDoc(colRef, newHamster);
  res.status(200).send({ id: newDocRef.id });

  console.log("Lade till nytt dokument med id: ", newDocRef.id);
});

router.get("/:id", async (req, res) => {
  const docRef = doc(colRef, req.params.id);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();
  if (snapshot.exists()) {
    res.status(200).send(data);
    return;
  }
  res.sendStatus(404);
});

router.delete("/:id", async (req, res) => {
  let idToRemove = req.params.id;
  const docRef = doc(colRef, idToRemove);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();
  if (snapshot.exists()) {
    await deleteDoc(docRef);
    res.sendStatus(200);
    return;
  }
  res.status(404).send(data);
});

export default router;
