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

const fetchUserProfile = async (req, res) => {
  res.send(req.user);
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
    const updates = ['name', 'password', 'email'];
    try {
        // const user = await User.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,
        //     {
        //         new: true,
        //         runValidators: true
        //     });
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).send();
        }
        updates.forEach(key => user[key] = req.body[key]? req.body[key]: user[key]);
        await user.save();
        res.send(user);
    } catch(error) {
        console.log(error);
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

const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch(e) {
        res.status(400).send(e);
    }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(obj => obj.token !== req.token);
    await req.user.save();
    res.send();
  } catch(e) {
    res.status(500).send(e);
  }
};

module.exports = {
    createUser,
    fetchUsers,
    fetchUser,
    fetchUserProfile,
    updateUser,
    deleteUser,
    searchUser,
    loginUser,
    logoutUser
};
