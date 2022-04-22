import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase.js";
import express from "express";

const router = express.Router();
const colRef = collection(db, "hamsters");

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

// export default router;

// const docRef = doc(collectionRef, "rGjGZypAVShveU4CSXuq");

// const snapshot = await getDoc(docRef);

// // //Hämtar datan
// const data = snapshot.data();
// console.log(data);

export default router;
