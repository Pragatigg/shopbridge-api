const mongoose = require("mongoose");

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (email) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                console.log(email);
                return emailRegex.test(email);
            },
            message: "Invalid Email"
        }
    }
});

module.exports = User;