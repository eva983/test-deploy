const mongoose = require("mongoose")
const bcrypt = require("bcrypt") //to protect passwords and hash them
const validator=require("validator")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static sign up method
userSchema.statics.signup = async function (email, password) {
  //validation

  //check if its null
  if(!email || !password) {
    throw Error('All fields must be field')
  }

  //check if the string is a valid email
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid")
  }

  //check if password is strong enough 
  if(!validator.isStrongPassword(password)){
    throw Error ("Password not strong enough")
  }

  //first check if the email exists
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error("Email already in use")
  }

  //use await bc it takes a while for this func to run
  //sale is an extra step for security adding a unique salt to each
  //pass. if 2 users have the same pass theyll always have a diff "salt"
  //so their hash will be different
  //higher the number hgher the protection but also it
  //will take longer to sign up/ 10 is the default
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ email, password: hash })

  return user
};

//static log in method
userSchema.statics.login = async function (email, password) {
    //validation
  
    //check if its null
    if(!email || !password) {
      throw Error('All fields must be field')
    }
  
    //check if the string is a valid email
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid")
    }
  
    //looks for the email and returns the user if the email
    //exists
    const user = await this.findOne({ email })
  
    //if there is no user matching to that email
    if (!user) {
      throw Error("Incorrect Email")
    }
   
    //compare the password the user typed with the hash
    //that belongs to the above email that was typed
    // (pass user typed, hash pass from DB)
    //return true if they match 
    const pass_match=await bcrypt.compare(password,user.password)
      
    if (!pass_match) {
        throw Error('Wrong password')
    }

    return user 
  
  };

module.exports = mongoose.model("User", userSchema);
