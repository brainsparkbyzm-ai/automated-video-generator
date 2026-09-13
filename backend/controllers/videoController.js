const {
    searchHybridAsset
} = require("../video/downloads/pexelsSearch");


const {
    generateAIVideo
} = require("../video/aiVideoGenerator");


const path = require("path");
const fs = require("fs");


const {
    downloadVideo
} = require("../video/downloads/downloadVideo");


const {
    renderVideo
} = require("../video/videoRenderer");


const {
    buildTimeline
} = require("../timeline/timelineBuilder");


const {
    syncVoiceWithScenes
} = require("../timing/voiceSync");


const {
    generateVoice
} = require("../voice/voiceGenerator");





// =====================================
// VIDEO CONTROLLER
// =====================================


const videoController = async(req,res)=>{


try{


console.log("================================");
console.log("🔥 DOCUMENTARY VIDEO PIPELINE START");
console.log("================================");



const project = req.body;

console.log(
"🔥 RECEIVED PROJECT BODY:"
);

console.log(
JSON.stringify(project,null,2)
);

if (
  !project.scenes ||
  !Array.isArray(project.scenes) ||
  project.scenes.length === 0
) {
  return res.status(400).json({
    success: false,
    message: "Scenes required",
  });
}


console.log(
"TOTAL SCENES:",
project.scenes.length
);





// =====================================
// MEDIA GENERATION
// =====================================


for(
const scene of project.scenes
){


console.log("--------------------------------");
console.log(
"PROCESSING SCENE:",
scene.id
);
console.log("--------------------------------");




// ================================
// EXISTING MEDIA
// ================================


if(
typeof scene.video === "string" &&
fs.existsSync(scene.video)
){

console.log(
"🎥 EXISTING VIDEO FOUND"
);

continue;

}




// ================================
// SEARCH PEXELS
// ================================


console.log(
"🔎 SEARCH STOCK:",
scene.imagePrompt
);



const asset =
await searchHybridAsset(
scene.imagePrompt
);





if(asset){



console.log(
"ASSET FOUND:",
asset.type
);




// ================================
// VIDEO ASSET
// ================================


if(
asset.type === "video"
){


let videoURL = null;




if(
asset.video_files &&
asset.video_files.length
){


videoURL =
asset.video_files
.sort(
(a,b)=>
b.width-a.width
)[0]
.link;


}




else if(asset.url){

videoURL =
asset.url;

}





if(videoURL){



console.log(
"DOWNLOADING:",
videoURL
);



const localVideo =
await downloadVideo(

videoURL,

`scene-${scene.id}.mp4`

);



scene.video =
localVideo;



scene.assetType =
"stock-video";



console.log(
"✅ VIDEO SAVED:",
localVideo
);



continue;


}



}




// ================================
// IMAGE ASSET
// ================================


if(
asset.type==="image"
){


scene.image =
asset.url;


scene.assetType =
"stock-image";


console.log(
"🖼 IMAGE SAVED"
);


continue;


}



}





// ================================
// AI VIDEO FALLBACK
// ================================


if(
!scene.video &&
!scene.image
){



console.log(
"🤖 GENERATING AI VIDEO"
);



const aiVideo =
await generateAIVideo(

scene.imagePrompt,

`ai-scene-${scene.id}.mp4`

);




if(aiVideo){


scene.video =
aiVideo;


scene.aiVideo =
aiVideo;



console.log(
"✅ AI VIDEO CREATED",
aiVideo
);



}

else{


console.log(
"❌ AI VIDEO FAILED",
scene.id
);


}



}



}






// =====================================
// VOICE
// =====================================


let voicePath=null;



if(project.script){



console.log(
"🎙 GENERATING DOCUMENTARY VOICE"
);



const voiceURL =
await generateVoice(
project.script
);



if(voiceURL){



voicePath =
path.join(

__dirname,

"..",

voiceURL.replace("/","")

);



console.log(
"VOICE PATH:",
voicePath
);



}



}





// =====================================
// TIMELINE
// =====================================


console.log(
"📝 BUILDING TIMELINE"
);



let timeline =
buildTimeline(project);






// FORCE MEDIA INTO TIMELINE

timeline.timeline =
timeline.timeline.map(
(item,index)=>{


const source =
project.scenes[index];



if(!source)
return item;




if(
source.video
){

item.video =
source.video;

}



if(
source.image
){

item.image =
source.image;

}



if(
source.aiVideo
){

item.aiVideo =
source.aiVideo;

}




return item;



});







console.log(
"========== FINAL TIMELINE =========="
);



timeline.timeline.forEach(scene=>{


console.log({

id:
scene.sceneId,

video:
scene.video,

image:
scene.image

});


});







// =====================================
// VOICE SYNC
// =====================================


if(
voicePath &&
fs.existsSync(voicePath)
){


console.log(
"🎙 SYNC VOICE"
);



timeline =
await syncVoiceWithScenes(

timeline,

voicePath

);


}







// =====================================
// FINAL RENDER
// =====================================


console.log(
"🎬 START FINAL RENDER"
);



const output =
await renderVideo(

timeline,

voicePath

);




console.log(
"✅ VIDEO CREATED:",
output
);





return res.json({

success:true,


video:

`http://localhost:5000/videos/${path.basename(output)}`,

timeline


});






}

catch(error){



console.log(
"================================"
);

console.log(
"❌ VIDEO CONTROLLER ERROR"
);


console.log(
error
);


console.log(
"================================"
);




return res.status(500).json({

success:false,

message:error.message

});


}



};





module.exports={

videoController

};