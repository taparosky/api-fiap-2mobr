require("dotenv").config();
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const router = require("./src/routes/routes")

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"))



app.use("/api/atualiza/",router);

app.listen(4000,()=>console.log("Servidor online, em http://localhost:4000"))



