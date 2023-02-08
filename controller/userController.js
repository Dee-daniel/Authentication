const User = require('../model/user');
const bcrypt = require("bcrypt");
const {response} = require ('express');
//error handling
//integrate views
//authenticatioin - jsonwebtoken


const register = async (req, res) => {
    
    const {email, password} = req.body
    //we want to make sure that they provide email and password
    if (!email || !password) {
        return res.status(401).json({sucess:false,msg:"Please provide necessary information"});
    }
    //we want to be sure that email hasnt been regisgeted
    const userExist = await User.findOne({email})
    if (userExist){
        return res.status(400).json({success:false, message:"Email is used"})
    }
    // we wznt to  protected user information
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // we want to create the user 
    try {
        const user = await User.create ({email, password: hashedPassword});
        res.status(201).send({success:true, data: user});
    }catch (error) {
        console.log(err);
        res.status(500).send({msg: "error"});
    }
};

const login = async (req, res) => {
    // we make sure they provide email and password
    const {email, password} = req.body
    //we want to make sure that they provide email and password
    if (!email || !password) {
        return res.status(401).json({sucess:false,msg:"Please provide necessary information"});
    }
    // user has registered
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json({success: false, message:"Please sign up first "});
    }
    // provide the correcet deatials, email and password
    const authenticated = user.email === email && (await bcrypt.compare(password, user.password));
    if (authenticated) {
        user.password = " "
        res.status(202).json({success: true, data:user});
    } else {
        return res.status (401).json({success: false, message: "Invalid email or password"});
    }      
};

module.exports = {register, login}