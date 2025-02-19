const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "doctor", "patient"],
        require: true
    },

}, 
{
    timestamps:true,

}
);

module.exports = mongoose.model("User", UserSchema)