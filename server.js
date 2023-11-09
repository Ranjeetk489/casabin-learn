const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { addPermission, getUserPermissions, addGroupPolicy }  = require("./api/controllers/casbinController.js");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.post("/add-permission", addPermission)
app.get("/get-permissions", getUserPermissions)
app.post("/add-group-policy", addGroupPolicy)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
