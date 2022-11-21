const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const conversationRoutes = require("./routes/conversations");
const messagesRoutes = require("./routes/messages");
const multer = require("multer");
const path = require("path");

dotenv.config();



mongoose.connect
                (process.env.MONGO_URL, 
                {useNewUrlParser: true, useUnifiedTopology: true},  
                ()=>{
    console.log("Connection to database is successful");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messagesRoutes)

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/images");
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try{
        return res.status(200).json("File uploaded successfully");
    }catch(err){
        console.log(err)
    }
});

app.get("/", (req, res)=>{
    res.send("Welcome to the Homepage")
});


app.listen(8800, ()=>{
    console.log("Server is running!")
});

