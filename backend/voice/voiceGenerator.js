const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const ffmpeg = require("fluent-ffmpeg");

const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;


// FFmpeg Setup

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


// Output Folder

const OUTPUT_FOLDER = path.join(
    __dirname,
    "output"
);


if (!fs.existsSync(OUTPUT_FOLDER)) {

    fs.mkdirSync(
        OUTPUT_FOLDER,
        {
            recursive:true
        }
    );

}


console.log(
    "VOICE OUTPUT FOLDER:",
    OUTPUT_FOLDER
);



// Clean Text

function cleanText(text){

    return String(text)
        .replace(/"/g,"'")
        .replace(/\n/g," ")
        .replace(/\r/g," ")
        .replace(/\s+/g," ")
        .trim();

}




// Split Text

function splitText(text,maxLength=350){

    const words = cleanText(text).split(" ");

    let chunks=[];
    let current="";


    for(const word of words){


        if(
            (current+" "+word).length > maxLength
        ){

            chunks.push(current.trim());

            current = word;

        }
        else{

            current += " " + word;

        }

    }


    if(current.trim()){

        chunks.push(current.trim());

    }


    return chunks;

}





// Edge TTS

function runEdge(text,file){


    return new Promise((resolve,reject)=>{


        const command =
        `python -m edge_tts --voice en-US-GuyNeural --text "${text}" --write-media "${file}"`;


        console.log(
            "RUNNING:",
            command
        );


        exec(
            command,
            {
                maxBuffer:1024*1024*20
            },
            (error,stdout,stderr)=>{


                if(error){

                    console.log(
                        "EDGE ERROR:",
                        error
                    );

                    reject(error);

                    return;

                }



                setTimeout(()=>{


                    if(!fs.existsSync(file)){


                        reject(
                            new Error(
                                "Voice file was not created: "+file
                            )
                        );


                        return;

                    }



                    console.log(
                        "CHUNK CREATED:",
                        file
                    );


                    resolve();



                },500);



            }
        );


    });


}





// Retry

async function retryEdge(text,file){


    for(
        let i=1;
        i<=3;
        i++
    ){


        try{

            console.log(
                "Voice Try",
                i
            );


            await runEdge(
                text,
                file
            );


            return;


        }
        catch(error){


            console.log(
                "TRY FAILED",
                i
            );


            if(i===3)
                throw error;


            await new Promise(
                r=>setTimeout(r,2000)
            );


        }

    }

}





// Create Chunks


async function createChunks(chunks){


    let files=[];


    for(
        let i=0;
        i<chunks.length;
        i++
    ){


        const file =
        path.join(
            OUTPUT_FOLDER,
            `chunk-${Date.now()}-${i}.mp3`
        );



        await retryEdge(
            chunks[i],
            file
        );


        files.push(file);


    }


    return files;

}






// Merge Audio


function mergeAudio(files,output){


    return new Promise((resolve,reject)=>{


        console.log(
            "FILES TO MERGE:",
            files
        );



        files.forEach(file=>{


            if(!fs.existsSync(file)){

                reject(
                    new Error(
                        "Missing audio file: "+file
                    )
                );

            }


        });



        ffmpeg()

        .input(files[0])

        .on(
            "end",
            ()=>{

                console.log(
                    "MERGE COMPLETE"
                );

                resolve();

            }
        )

        .on(
            "error",
            err=>{

                console.log(
                    "FFMPEG ERROR",
                    err
                );

                reject(err);

            }
        )

        .save(output);



    });


}





// MAIN


async function generateVoice(text){


    console.log(
        "VOICE REQUEST RECEIVED"
    );



    const chunks =
    splitText(text);



    console.log(
        "TOTAL CHUNKS:",
        chunks.length
    );



    const files =
    await createChunks(chunks);



    const finalName =
    `voice-${Date.now()}.mp3`;



    const finalOutput =
    path.join(
        OUTPUT_FOLDER,
        finalName
    );



    console.log(
        "FINAL OUTPUT:",
        finalOutput
    );



    await mergeAudio(
        files,
        finalOutput
    );



    console.log(
        "FINAL EXISTS:",
        fs.existsSync(finalOutput)
    );



    return (
        "/voice/output/"+finalName
    );


}




module.exports={
    generateVoice
};