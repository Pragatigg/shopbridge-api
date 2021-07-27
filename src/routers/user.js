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
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", createUser);

router.get("/", fetchUsers);

router.get("/search", searchUser);

router.get("/:id", auth, fetchUser);

router.patch("/:id", auth, updateUser);

router.delete("/:id", auth, deleteUser);

router.post("/login", loginUser);

module.exports = router;
