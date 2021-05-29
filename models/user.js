const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
});

/* BELOW LINE CREATES USERNAME, HASHING
AND SALTS BY ITS OWN USING 
passport-local-mongoose */
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)