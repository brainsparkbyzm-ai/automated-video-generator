const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);


// ========================================
// IMAGE TO VIDEO GENERATOR
// ========================================

const createImageVideo = (
    imagePath,
    duration,
    output
)=>{


return new Promise((resolve,reject)=>{


ffmpeg()

.input(imagePath)

.loop(duration)


.videoFilters([

"scale=1920:1080:force_original_aspect_ratio=increase",

"crop=1920:1080",

"zoompan=z='min(zoom+0.0006,1.3)':d=250:s=1920x1080"

])


.outputOptions([

"-t",
String(duration),

"-r",
"25",

"-pix_fmt",
"yuv420p"

])


.on(
"end",
()=>{

console.log(
"✅ IMAGE VIDEO CREATED",
output
);

resolve(output);

}

)


.on(
"error",
(err)=>{

console.log(
"IMAGE VIDEO ERROR",
err.message
);

reject(err);

}

)


.save(output);



});


};






// ========================================
// MAIN VIDEO RENDER
// ========================================


const renderVideo = async (
timeline,
voicePath=null
)=>{


return new Promise(async(resolve,reject)=>{


try{


const scenes =
timeline.timeline ||
timeline.scenes;



if(
!Array.isArray(scenes)
){

return reject(
new Error(
"Invalid timeline"
)
);

}





const outputFolder =
path.join(
__dirname,
"output"
);



if(
!fs.existsSync(outputFolder)
){

fs.mkdirSync(
outputFolder,
{
recursive:true
}
);

}




const tempFolder =
path.join(
outputFolder,
"temp"
);



if(
!fs.existsSync(tempFolder)
){

fs.mkdirSync(
tempFolder,
{
recursive:true
}
);

}





const outputFile =
path.join(
outputFolder,
"final-documentary.mp4"
);



const concatFile =
path.join(
outputFolder,
"concat.txt"
);






let clips=[];



console.log(
"🎬 BUILDING DOCUMENTARY"
);


console.log(
"TOTAL SCENES:",
scenes.length
);






// ========================================
// MEDIA COLLECTION
// ========================================


for(
let i=0;
i<scenes.length;
i++
){



const scene =
scenes[i];



console.log(
"SCENE:",
scene.sceneId || i+1
);


console.log(
"VIDEO TYPE:",
typeof scene.video
);


console.log(
"VIDEO VALUE:",
scene.video
);


// AI VIDEO

if(

scene.aiVideo &&
fs.existsSync(scene.aiVideo)

){


console.log(
"🤖 AI VIDEO"
);


clips.push(
scene.aiVideo
);


continue;

}






// STOCK VIDEO


if(
scene.video &&
typeof scene.video === "string" &&
fs.existsSync(scene.video)
){


console.log(
"🎥 STOCK VIDEO"
);


clips.push(
scene.video
);


continue;

}






// IMAGE


let image = null;


if(
typeof scene.aiImage === "string"
){

image = scene.aiImage;

}


else if(
typeof scene.image === "string"
){

image = scene.image;

}



if(
image &&
fs.existsSync(image)
){


console.log(
"🖼 IMAGE"
);



const imageVideo =
path.join(

tempFolder,

`scene-${i}.mp4`

);




await createImageVideo(

image,

scene.duration || 10,

imageVideo

);



clips.push(
imageVideo
);



continue;

}





console.log(
"⚠ NO MEDIA:",
i+1
);



}




if(
clips.length===0
){

return reject(
new Error(
"No media found"
)
);

}




// ========================================
// CONCAT
// ========================================


let concatText="";



clips.forEach(file=>{


concatText +=
`file '${file.replace(/\\/g,"/")}'\n`;



});



fs.writeFileSync(
concatFile,
concatText
);



console.log(
"✅ CONCAT READY"
);

const command = ffmpeg()
  .input(concatFile)
  .inputOptions([
    "-f",
    "concat",
    "-safe",
    "0",
  ]);
  
// ========================================
// AUDIO SYSTEM
// ========================================


let hasVoice = false;
let hasMusic = false;
let hasSfx = false;


// ===============================
// VOICE
// ===============================


if(
    voicePath &&
    fs.existsSync(voicePath)
){

    console.log(
        "🎙 VOICE FOUND"
    );


    command.input(
        voicePath
    );


    hasVoice = true;

}




// ===============================
// BACKGROUND MUSIC
// ===============================


const musicFolder =
path.join(
    __dirname,
    "../media/music"
);



let musicFile = null;



if(
    fs.existsSync(musicFolder)
){

    const files =
    fs.readdirSync(musicFolder)
    .filter(
        file =>
        file.endsWith(".mp3")
    );


    if(files.length > 0){

        musicFile =
        path.join(
            musicFolder,
            files[0]
        );

    }

}




if(
    musicFile &&
    fs.existsSync(musicFile)
){

    console.log(
        "🎵 MUSIC FOUND:",
        musicFile
    );


    command
    .input(musicFile)
    .inputOptions([
        "-stream_loop",
        "-1"
    ]);


    hasMusic = true;

}





// ===============================
// SOUND EFFECTS
// ===============================


const soundFolder =
path.join(
    __dirname,
    "../media/sounds"
);



let soundFile = null;



if(
    fs.existsSync(soundFolder)
){

    const sounds =
    fs.readdirSync(soundFolder)
    .filter(
        file =>
        file.endsWith(".mp3")
    );


    if(
        sounds.length > 0
    ){

        soundFile =
        path.join(
            soundFolder,
            sounds[0]
        );

    }

}





if(
    soundFile &&
    fs.existsSync(soundFile)
){

    console.log(
        "🔊 SOUND EFFECT FOUND"
    );


    command.input(
        soundFile
    );


    hasSfx = true;

}





// ========================================
// VIDEO ENCODING
// ========================================


command.outputOptions([

    "-c:v",
    "libx264",

    "-preset",
    "medium",

    "-crf",
    "20",

    "-pix_fmt",
    "yuv420p",

    "-movflags",
    "+faststart"

]);






// ========================================
// AUDIO MIXING
// ========================================


if(
    hasVoice &&
    hasMusic &&
    hasSfx
){

    console.log(
        "🎧 VOICE + MUSIC + SFX"
    );


    command.complexFilter([

        "[1:a]volume=1[voice]",

        "[2:a]volume=0.12[music]",

        "[3:a]volume=0.25[sfx]",

        "[voice][music][sfx]amix=inputs=3:duration=first[audio]"

    ]);



    command.outputOptions([

        "-map",
        "0:v:0",

        "-map",
        "[audio]",

        "-c:a",
        "aac",

        "-b:a",
        "192k",

        "-shortest"

    ]);

}




else if(
    hasVoice &&
    hasMusic
){

    console.log(
        "🎙 VOICE + MUSIC"
    );


    command.complexFilter([

        "[1:a]volume=1[voice]",

        "[2:a]volume=0.12[music]",

        "[voice][music]amix=inputs=2:duration=first[audio]"

    ]);



    command.outputOptions([

        "-map",
        "0:v:0",

        "-map",
        "[audio]",

        "-c:a",
        "aac",

        "-b:a",
        "192k",

        "-shortest"

    ]);

}





else if(hasVoice){


    console.log(
        "🎙 ONLY VOICE"
    );


    command.outputOptions([

        "-map",
        "0:v:0",

        "-map",
        "1:a:0",

        "-c:a",
        "aac",

        "-b:a",
        "192k",

        "-shortest"

    ]);

}





else if(hasMusic){


    console.log(
        "🎵 ONLY MUSIC"
    );


    command.outputOptions([

        "-map",
        "0:v:0",

        "-map",
        "1:a:0",

        "-c:a",
        "aac",

        "-b:a",
        "192k",

        "-shortest"

    ]);

}





else{


    console.log(
        "🔇 NO AUDIO"
    );


    command.outputOptions([

        "-map",
        "0:v:0"

    ]);

}





// ========================================
// EVENTS
// ========================================


command


.on(
"start",
cmd=>{

console.log(
"🚀 FFMPEG START"
);

console.log(cmd);

}

)



.on(
"progress",
progress=>{


console.log(

"Rendering:",
Math.floor(
progress.percent || 0
),
"%"

);


}

)



.on(
"end",
()=>{


console.log(
"================================"
);


console.log(
"✅ DOCUMENTARY CREATED"
);


console.log(
outputFile
);



resolve(
outputFile
);


}

)



.on(
"error",
err=>{


console.log(
"❌ RENDER ERROR"
);


console.log(
err.message
);



reject(err);


}

)



.save(
outputFile
);



}

catch(error){


reject(error);


}


});

};





module.exports = {

renderVideo

};