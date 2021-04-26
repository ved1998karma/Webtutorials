const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[            //array of object because a user ca login multiple times
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})

// Hashing the password in before saving in the database
userSchema.pre('save', async function(next){        //Async
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,12);        //Await
        this.cpassword = await bcrypt.hash(this.cpassword,12);      //Await
    }
    next();     //let it go
})

//we are genreating auth token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    }catch{console.error();}

}

const User = mongoose.model('USER', userSchema); 

module.exports = User;