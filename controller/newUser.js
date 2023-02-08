const Users = require ('../model/user')
const bcrypt = require ('bcrypt')

const handleErrors = (err) => {
    //err messages err codes -- 11000
    let errors = {email: "", password: "",}
    if (err.code === 11000){
        errors.email = 'Email is already in use'
        return errors
    }

    if (err.message === "User not registered yet") {
        errors.email = "This Email has not been registered"
        return errors;
    }
    if (err.message === "Invalid email or password"){
        errors.email = "Invalid email or password";
        errors.password = "Invalid email or password";
        return errors;
    }
    if (err.message.includes ("user validation failed")) {
        //object to array - for each method
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
};

const register = async (req, res) =>{
    const {email, password } = req.body
    try {
        const user = await Users.create({ email,password });
        res.status(201)
        .json({success: true, data:user});
    }  catch (error) {
    console.log(error);
        const errors = handleErrors(error)
        res.status(400)
        .json({success: false, errors})
    }         
};         


const login = async (req, res) => {
    const {email, password } = req.body
    // res.send("Login user");
    try {
        //check
        if (!email || !password) {
            return res.status(401).json({success:false, msg:"Please provide necessary information"});
        }
        //emaill is registered
        const user = await Users.findOne({email});
        if (user) {
            const authenticated = await bcrypt.compare (password, user.password)
            if (authenticated) {
                return res.status(201)
                .json({success: true, data: user})

            }throw Error('Invalid email or password')
        }

        throw Error ("User not registered yet");
    }catch(error) {
        const errors = handleErrors(error)
        res.status(400)
        .json({success: false,errors})
    }         
};


module.exports = {register, login};