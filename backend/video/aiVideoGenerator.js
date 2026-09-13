const axios = require("axios");
const fs = require("fs");
const path = require("path");



// =====================================
// AI VIDEO GENERATOR
// Provider: Replicate
// =====================================


const generateAIVideo = async (
    prompt,
    fileName
)=>{


try{


console.log("================================");
console.log("🤖 AI VIDEO GENERATION START");
console.log(prompt);
console.log("================================");



if(!prompt){

throw new Error(
"AI video prompt missing"
);

}




if(
!process.env.REPLICATE_API_KEY
){

throw new Error(
"REPLICATE_API_KEY missing"
);

}



if(
!process.env.REPLICATE_VIDEO_MODEL
){

throw new Error(
"REPLICATE_VIDEO_MODEL missing"
);

}





// =====================================
// CREATE AI JOB
// =====================================


const response =
await axios.post(

"https://api.replicate.com/v1/predictions",

{

version:
process.env.REPLICATE_VIDEO_MODEL,


input:{


prompt,


duration:5,


aspect_ratio:"16:9"


}


},


{


headers:{


Authorization:
`Token ${process.env.REPLICATE_API_KEY}`,


"Content-Type":
"application/json"


},


timeout:120000


}

);



let prediction =
response.data;



console.log(
"🤖 AI JOB:",
prediction.id
);







// =====================================
// WAIT RESULT
// =====================================


let videoURL=null;



while(true){


await new Promise(
resolve=>setTimeout(resolve,5000)
);




const status =
await axios.get(

`https://api.replicate.com/v1/predictions/${prediction.id}`,

{


headers:{


Authorization:
`Token ${process.env.REPLICATE_API_KEY}`


},


timeout:120000


}

);



prediction =
status.data;



console.log(
"AI STATUS:",
prediction.status
);





if(
prediction.status==="succeeded"
){


if(
Array.isArray(prediction.output)
){


videoURL =
prediction.output[0];


}

else{


videoURL =
prediction.output;


}


break;


}





if(
prediction.status==="failed" ||
prediction.status==="canceled"
){


throw new Error(

prediction.error ||
"AI video generation failed"

);


}



}







if(!videoURL){

throw new Error(
"AI video URL missing"
);

}







// =====================================
// DOWNLOAD VIDEO
// =====================================


const folder =
path.join(

__dirname,

"downloads"

);



if(
!fs.existsSync(folder)
){


fs.mkdirSync(

folder,

{

recursive:true

}

);


}






const filePath =
path.join(

folder,

fileName

);





console.log(
"⬇ DOWNLOADING AI VIDEO"
);

console.log(
videoURL
);






const video =
await axios.get(

videoURL,

{


responseType:"stream",


timeout:180000


}

);






const writer =
fs.createWriteStream(

filePath

);





video.data.pipe(writer);







await new Promise(

(resolve,reject)=>{


writer.on(

"finish",

resolve

);



writer.on(

"error",

reject

);



}

);







const stats =
fs.statSync(
filePath
);




if(
stats.size < 10000
){


fs.unlinkSync(
filePath
);


throw new Error(
"AI video file corrupted"
);


}







console.log(
"✅ AI VIDEO SAVED:"
);


console.log(
filePath
);





return filePath;





}

catch(error){


console.log(
"❌ AI VIDEO ERROR"
);


console.log(
error.message
);



return null;


}



};





module.exports={

generateAIVideo

};