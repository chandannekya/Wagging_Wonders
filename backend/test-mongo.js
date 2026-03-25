const mongoose = require('mongoose');

const uri = "mongodb+srv://petApp:asdfghjkl@cluster0.5ughu.mongodb.net/grooming";

mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESSFULLY CONNECTED");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILED TO CONNECT");
    console.error(err);
    process.exit(1);
  });
