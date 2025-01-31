
const User = require("../models/user");


async  function handleGetAllUsers(req, res){

  const allDbUsers = await User.find({});
  return res.json(allDbUsers)
}
// Get
async function handleGetUserById(req, res){
  const user = await User.findById(req.params.id);

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
}


//petch
async function handleUpdateUserById(req,res) {

  await User.findByIdAndUpdate(req.params.id, {lastName:"Changed"});
  return res.json({ status: "Success" })
  
}

//delete
async function handleDeleteUserById(req,res) {

  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
  
}

// create new user
async function handelCreateNewUser(req,res) {
  const { first_name, last_name, email, gender, job_title } = req.body;

  try {
    const newUser = await User.create({
      firstName: first_name,
      lastName: last_name,
      email,
      gender,
      jobTitle: job_title,
    });

    console.log("New User Created:", newUser);
    return res.status(201).json({ msg: "User created successfully.", id: newUser._id});
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user." });
  }
  
}


module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handelCreateNewUser,
}

