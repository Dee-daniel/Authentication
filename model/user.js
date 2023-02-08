// email - string , unique , requried validaten

const mongoose= require ("mongoose");
const Schema = mongoose.Schema
const { isEmail } = require ("validator")
const bcrypt = require ('bcrypt')

const userSchema = new Schema(
{
    email: {
        type: String,
        unique: [true, 'Please provide an email'],
        required: [true, 'This email has been registerd'],
        validate:  [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required:  [true, 'Please enter a password'],
        minlength:  [10, 'the minimum length of your password is 10']
    },

}, {timestamps: true}
);

//mongoose hooks
//function that protect user info before we save
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

module.exports = mongoose.model("user", userSchema);