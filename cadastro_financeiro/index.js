require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")
const helmet = require("helmet")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = require("./src/routes/routes")

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"))



app.use("/api/financeiro/",router);

app.listen(5000,()=>console.log("Servidor online, em http://localhost:5000"))



