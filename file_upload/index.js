const path = require("path");
const multer  = require('multer');
const express = require('express');

const app = express();
const port = 3000;

// Fix: Use relative path for the upload directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

// Fix: Correct the "views" setting
app.set("views", path.resolve("./views/"));

app.use(express.json());

app.get('/', (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single("profileimage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
