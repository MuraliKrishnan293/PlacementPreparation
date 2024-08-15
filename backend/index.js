const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;
// const  Middleware  = require("./verify");

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log("App connected to PORT 5000");
});


app.use("/app", require("./routes/User"));
app.use("/app", require("./routes/PythonQn"));

try {
  mongoDBURL =
    "mongodb+srv://MuraliKrishnan412:MuraliKrishnan412@cluster0.d0ek1az.mongodb.net/PlacementPreparation?retryWrites=true&w=majority";
  mongoose.connect(mongoDBURL).then(() => {
    console.log("Successfully connected to Database");
  });
} catch (e) {
  console.log(e);
}