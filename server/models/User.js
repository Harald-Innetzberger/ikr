const Joi = require('joi');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// https://vegibit.com/information-expert-principle-applied-to-mongoose-models/

// define user schema
const userSchema = new Schema({
   name: {
    type: String,
    required: false,
    trim: true,
   },
   email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
   },
   password: {
    type: String,
    required: true,
    trim: true,
   },
   role: {
    type: String,
    required: false,
    trim: true,
   }
})

// validate user input with joi
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string(),
    });
    return schema.validate(user);
}

//this method will hash the password before saving the user model
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });
  
  //this method search for a user by email and password.
  userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error({ error: "Ungültige Login Details" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error({ error: "Ungültige Login Details" });
    }
    return user;
  };

const User = model('User', userSchema);

module.exports.User = User
module.exports.validate = validateUser;