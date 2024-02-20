const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const cors = require('cors')

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to MongoDb")
}).catch((err) => {
    console.log(err);
})
//middlware
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.listen(8800, () => {
    console.log("Backend server is running on 8800")
})