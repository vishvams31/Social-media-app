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
const multer = require('multer')
const path = require('path')

app.use(cors())

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to MongoDb")
}).catch((err) => {
    console.log(err);
})

app.use("/images", express.static(path.join(__dirname, "public/images")));
//middlware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});
app.put("/api/posts/:id/image", upload.single("file"), async (req, res) => {
    try {
        // Logic to update the post's image in the database
        const postId = req.params.id;
        const imageName = req.body.name; // Assuming you pass the desired image name in the request body

        // Example: Update the post's image in the database using postId and imageName

        return res.status(200).json("Post image updated successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error updating post image");
    }
});


app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.listen(8800, () => {
    console.log("Backend server is running on 8800")
})