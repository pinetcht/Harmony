var request = require("request");
const express = require("express");
const db = require("./firebase");
const {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} = require("firebase/firestore");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    let ret = [];
    const docRef = await getDocs(collection(db, "users"));

    docRef.forEach((doc) => {
      ret.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(ret);
  } catch (e) {
    res.status(400).json({ error: `Error fetching user data ${e}` });
  }
});

router.get("/:id", async (req, res) => {
  try {

    const docRef = doc(db, "users", req.params.id);
    console.log('req.params.id ', req.params.id)

    const docSnap = await getDoc(docRef);
    console.log('docsnap in get id ', docSnap)

    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      console.log("Document from user does not exist");
    }
  } catch (e) {
    res.status(400).json({ error: `Error fetching user data ${e}` });
  }
})

//Get Doc ID
router.put("/query/:query", async (req, res) => {
  try {
    const userId = req.body.userId;
    const q = query(collection(db,"users"), where("userid", "==", userId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      res.status(200).json(querySnapshot.docs[0].id);
    } else {
      console.log("Document does not exist");
    }
  } catch (e) {
    res.status(400).json({error: `Error fetching user data ${e}`})
  }
})

//update user privacy setting
router.put("/public/:id", async (req, res) => {
  try {
      const isPublic = req.body.public;
      const userId = req.body.userId;

      await updateDoc(doc(db, "users", userId), {
          public: isPublic,
      });
      res.status(200).json({ message: "Profile privacy updated successfully" });
  } catch (e) {
      res.status(400).json({ error: e.message });
  }
});

// update user follower count 
router.put("/follower/:id", async (req, res) => {
  try {
      const followers = req.body.followers;
      const userDocId = req.body.userId;
      
      await updateDoc(doc(db, "users", userDocId), {
          followercount: followers + 1,
      });
      res.status(200).json({ message: "Profile follower count updated successfully" });
  } catch (e) {
      res.status(400).json({ error: e.message });
  }
});


module.exports = router;
