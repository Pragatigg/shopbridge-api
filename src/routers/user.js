const express = require("express");

const { 
    createUser, 
    fetchUsers, 
    fetchUser, 
    updateUser, 
    deleteUser,
    searchUser,
    loginUser
} = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);

router.get("/", fetchUsers);

router.get("/search", searchUser);

router.get("/:id", fetchUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login", loginUser);

module.exports = router;