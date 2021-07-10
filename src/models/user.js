const mongoose = require("mongoose");

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (email) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: "Invalid Email"
        }
    }
});

module.exports = User;