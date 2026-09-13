const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");


// ================================
// ENV CHECK
// ================================

console.log(
    "Pexels from env:",
    process.env.PEXELS_API_KEY ? "LOADED" : "MISSING"
);


// ================================
// ROUTES
// ================================

const pexelsRoutes = require("./routes/pexelsRoutes");
const chatRoutes = require("./routes/chatRoutes");
const videoRoutes = require("./routes/videoRoutes");
const voiceRoutes = require("./routes/voiceRoutes");



// ================================
// APP
// ================================

const app = express();



// ================================
// MIDDLEWARE
// ================================

app.use(cors());


app.use(
    express.json({
        limit:"50mb"
    })
);


app.use(
    express.urlencoded({
        extended:true,
        limit:"50mb"
    })
);



// ================================
// REQUEST LOGGER
// ================================

app.use((req,res,next)=>{

    console.log(
        "REQUEST:",
        req.method,
        req.originalUrl
    );

    next();

});



// ================================
// STATIC FILES
// ================================


app.use(
    "/voice",
    express.static(
        path.join(
            __dirname,
            "voice/output"
        )
    )
);



app.use(
    "/videos",
    express.static(
        path.join(
            __dirname,
            "video/output"
        )
    )
);



// ================================
// API ROUTES
// ================================


// AI Chat
app.use(
    "/api",
    chatRoutes
);


// Video Generator
app.use(
    "/api/video",
    videoRoutes
);


// Voice
app.use(
    "/api",
    voiceRoutes
);


// Pexels
app.use(
    "/api",
    pexelsRoutes
);



// ================================
// HOME TEST
// ================================

app.get(
    "/",
    (req,res)=>{

        res.json({

            success:true,

            message:
            "BrainSpark AI Backend Running"

        });

    }
);



// ================================
// 404 HANDLER
// ================================

app.use(
    (req,res)=>{

        res.status(404).json({

            success:false,

            message:
            "Route not found"

        });

    }
);



// ================================
// ERROR HANDLER
// ================================

app.use(
    (err,req,res,next)=>{


        console.log(
            "SERVER ERROR:",
            err.message
        );


        res.status(500).json({

            success:false,

            message:err.message

        });


    }
);




// ================================
// START SERVER
// ================================

const PORT = 5000;


app.listen(
    PORT,
    ()=>{


        console.log(
            "================================="
        );


        console.log(
            "✅ BrainSpark AI Server Running"
        );


        console.log(
            `PORT: ${PORT}`
        );


        console.log(
            "================================="
        );


    }
);