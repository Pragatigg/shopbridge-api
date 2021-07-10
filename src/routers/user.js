const express = require("express");

const { 
    createUser, 
    fetchUsers, 
    fetchUser, 
    updateUser, 
    deleteUser,
    searchUser
} = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);

router.get("/", fetchUsers);

router.get("/search", searchUser);

router.get("/:id", fetchUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;