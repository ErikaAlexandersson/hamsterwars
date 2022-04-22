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
const colRef = collection(db, "hamsters");

router.post("/", async (req, res) => {
  let newHamster = req.body;

  if (
    req.body.name === undefined ||
    req.body.age === undefined ||
    req.body.favFood === undefined ||
    req.body.loves === undefined ||
    req.body.imgName === undefined ||
    req.body.wins === undefined ||
    req.body.defeats === undefined ||
    req.body.defeats === undefined
  ) {
    res.sendStatus(406);
    return;
  }
  const newDocRef = await addDoc(colRef, newHamster);
  res.status(200).send({ id: newDocRef.id });

  console.log("Lade till nytt dokument med id: ", newDocRef.id);
});

router.get("/random", async (req, res) => {
  let allHamsters = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((doc) => {
    allHamsters.push({ ...doc.data(), id: doc.id });
  });
  let randomNumber = Math.floor(Math.random() * allHamsters.length);
  console.log(allHamsters[randomNumber]);
  res.status(200).send(allHamsters[randomNumber]);
});

router.put("/:id", async (req, res) => {
  // Vilket objekt ska ändras?
  let oldDocId = req.params.id;
  // ny data som ska in
  let newData = req.body;
  //hitta document som ska uppdateras
  const oldDocRef = doc(colRef, oldDocId);
  console.log("Objektet som skall hittas", oldDocId);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log("Object missing");
    res.sendStatus(400);
    return;
  }

  if (oldDocId === "id-does-not-exist") {
    res.sendStatus(404);
    return;
  }
  await updateDoc(oldDocRef, newData);
  console.log("New Data", newData);
  res.status(200).send(newData);
});

// hämtar alla hamstrar
router.get("/", async (req, res) => {
  let allHamsters = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((doc) => {
    allHamsters.push({ ...doc.data(), id: doc.id });
  });
  res.status(200).send(allHamsters);
});

router.get("/cutest", async (req, res) => {
  let allHamsters = [];
  let score = [];
  const snapshot = await getDocs(colRef);

  snapshot.docs.forEach((docSnapshot) => {
    allHamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  //skapa en nyckel sum = wins - defeats
  allHamsters.forEach((h) => {
    const sum = h.wins - h.defeats;
    return score.push({ ...h, sum: sum });
  });

  //iterate and check highest sum
  let biggestVal = Math.max.apply(
    Math,
    score.map((o) => o.sum)
  );
  //pick cutest hamster with biggest sum
  let bestHamsters = score.filter((i) => i.sum === biggestVal);
  // then remove sum key
  bestHamsters.filter((i) => delete i.sum);

  return res.status(200).send(bestHamsters);
});
//hämtar alla hamstrar med id

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
  if (idToRemove !== "id-does-not-exist") {
    await deleteDoc(docRef);
    res.send(idToRemove).status(200);
    return;
  }
  res.sendStatus(404);
});

//hämtar random hamster

export default router;

//
