const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())


const mangaRouter = require("./routes/manga.router")
const animeRouter = require("./routes/anime.router")

app.use("/manga", mangaRouter)
app.use("/anime", animeRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))