const express = require('express');
// router provided from express
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require('../model/userSchema');            //CALLING USER STRUCTUR WE ALREADY DEFINED

// router.get('/',  (req, res) => {
//     res.send("Hello Guys, Welcome to Home ROUTER");
// })

// router.post('/register', async (req,res) => {

//     const { name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         console.log("Errrorr")
//         return res.status(422).json({error:"Plz fill all fields"});
//     }
//     //for the unique id an username

//     User.findOne({ email:email })
//         .then((userExist)=>{
//             if(userExist){
//                 return res.status(422).json({error: "Email allready registered"})
//             }
//             const user = new User({name, email, phone, work, password, cpassword})

//             user.save().then(()=>{
//                 res.status(201).json({message: "Succesfully registered"});
//             }).catch((error)=>{
//                 res.status(500).json({error: "Failed to registered"});
//             }).catch(error=>{ console.log(error); })
//         })


// })

router.post('/register', async (req, res) => {    //POSTING THE DATA & MAKING CALL BACK FUNCTION ASYNC

    const { name, email, phone, work, password, cpassword } = req.body;  // ASSIGNING REQUESTED DATA TO
    //NEW CONSTANT 

    if (!name || !email || !phone || !work || !password || !cpassword) {       //CHECK ALL VALUES TRUE
        return res.status(422).json({ error: "Plz fill all fields" });     //show messagefor empty field
    }

    try {
        const userExist = await User.findOne({ email: email });   // findones email exist on server and wait

        if (userExist) {                          //condition for already registered
            return res.status(422).json({ error: "Email already registered" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password does not match" })
        } else {
            //create new user
            const user = new User({ name, email, phone, work, password, cpassword })

            //const userRegister = await user.save();         //Save the new user details and wait
            await user.save();

            // if (userRegister) {
            //     res.status(201).json({message: "Succesfully registered"});     //register success
            // }
            res.status(201).json({ message: "Successfully registered" });
        }
    }
    catch (error) {
        console.log(error);
    }
    //for the unique id an username    
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {          //  comparing username and password of an ID
        res.json({ error: "Enter Email or password" });
    }
    try {
        const userLogin = await User.findOne({ email });
        // console.log(userLogin);
        if (userLogin) {
            
            const isMatch = await bcrypt.compare(password, userLogin.password);
                                        // [above is entered pas, res.Password]
            const token = await userLogin.generateAuthToken();
            if (!isMatch) {
                res.status(404).json({ error: '!Invalid Credentials pass' });
            }
            else {
                res.status(200).json({ message: "login Successfully" });
            }
        }
        else {
            res.status(404).json({ error: '!Invalid Credentials' });
        }

    } catch (error) {
        console.log(error)
    }
})
module.exports = router;