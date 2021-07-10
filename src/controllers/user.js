const User = require("../models/user");

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch(error) {
        res.status(400).send(error);
    }
};

const fetchUsers = async (req, res) => {
    try { 
        const result = await User.find();
        res.status(200).send({
            data: result,
            count: result.length
        });
    } catch(error) {
        res.status(500).send(error);
    }
};

const fetchUser = async (req, res) => {
    try {
        const result = await User.findById(req.params.id);
        if(!result) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send(error)
    }
};

const searchUser = async (req, res) => {
    try {
        const result = await User.find(req.query);
        if(!result.length) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send(error)
    }
};


const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {
                new: true,
                runValidators: true
            });
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(error) {
        res.status(500).send(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!createUser) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createUser,
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser,
    searchUser
};
