const express = require("express");

const {handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handelCreateNewUser} = require('../controllers/user');

const router = express.Router();




// REST API
 router.route("/").get(handleGetAllUsers ).post(handelCreateNewUser);


router.route("/:id")
  .get(handleGetUserById)

  .patch(handleUpdateUserById)


  .delete(handleDeleteUserById)


// router.post("/",handelCreateNewUser);


 module.exports = router;