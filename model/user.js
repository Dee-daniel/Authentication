// email - string , unique , requried validaten

const mongoose= require ("mongoose");
const Schema = mongoose.Schema
const { isEmail } = require ("validator")

const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        unique: [true, 'Please provide an email'],
        required: [true, 'This email has been registerd'],
        validate:  [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,

        required:  [true, 'Please enter a password'],
        minlenghth:  [10, 'The minimum lent of your password is 10'],
    },

}, {timestamps: true}
);

module.exports = mongoose.model("user", userSchema);