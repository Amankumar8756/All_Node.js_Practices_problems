const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/image/aman.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", function (next) {
  const user = this; 

  if (!user.isModified("password")) return; // Fix return issue

  const salt = randomBytes(16).toString(); // Ensure correct encoding

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;
   
  next();
});


// userSchema.static("matchPassword", async function (email , password){

//   const user = await this.findOne({ email });
//  if(!user) throw new Error("User not found!");



//  const salt = user.salt;  

//  const hashedPassword = user.password;

//  const userProvidedHash = createHmac("sha256", salt)
//  .update(user.password)
//  .digest("hex");


//  console.log("Stored Hash:", hashedPassword); 
// console.log("User Input Hash:", userProvidedHash);


//    if(hashedPassword !== userProvidedHash)
//    throw new Error("Incorrect password");
//    return {...user, password: undefined, salt: undefined};
// });

// ✅ Match Password Function
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found!");

  const salt = user.salt; // Stored salt
  const hashedPassword = user.password; // Stored hashed password

  // 🛠 Fix: Hash user-inputted password and compare
  const userProvidedHash = createHmac("sha256", salt)
    .update(password) 
    .digest("hex");



  if (hashedPassword !== userProvidedHash) throw new Error("Incorrect password");

  // return { ...user.toObject(), password: undefined, salt: undefined };
  return user;
});


const User = model("User", userSchema);

module.exports = User;
