const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc, getDoc, setDoc } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let ret = [];
        const docRef = await getDocs(collection(db, "forum"));

        docRef.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data()
            })
        }) 

        res.status(200).json(ret)
    } catch(e) {
        res.status(400).json({error: `Error fetching user data ${e}`})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const docRef = doc(db, "forum", req.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
        } else {
            console.log("Document does not exist");
        }
    } catch (e) {
        res.status(400).json({error: `Error fetching user data ${e}`})
    }
})

// like a discussion post
router.put("/:id", async (req, res) => {
    try {
        const forumId = req.params.id;
        const currentLikes = req.body.currentLikes;
        
        await updateDoc(doc(db, "forum", forumId), {
            likes: currentLikes + 1,
        });
        res.status(200).json({ message: "success" });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post("/replies/:id", async (req, res) => {
    try {
        const id = req.body.id;
        const timestamp = req.body.createdAt;
        const message = req.body.message;
        const userId = req.body.userId;

        const discussionRef = doc(db, "forum", id);
        const discussionDoc = await getDoc(discussionRef);

        if (!discussionDoc.exists()) {
            res.status(404).send('Discussion not found.');
            return;
        }

        const discussionData = discussionDoc.data();
        const updatedReplies = [...discussionData.replies, {
            createdAt: timestamp,
            message: message,
            userId: userId,
        }];

        await updateDoc(discussionRef, {
            replies: updatedReplies,
        });
        res.status(200).send('Reply added successfully.');
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;