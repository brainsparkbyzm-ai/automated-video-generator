const ffprobe = require("ffprobe-static");
const ffmpeg = require("fluent-ffmpeg");


ffmpeg.setFfprobePath(
    ffprobe.path
);



// Get audio duration

const getAudioDuration = (audio)=>{


    return new Promise((resolve,reject)=>{


        ffmpeg.ffprobe(
            audio,
            (err,data)=>{


                if(err){

                    reject(err);
                    return;

                }


                resolve(
                    Number(
                        data.format.duration
                    )
                );


            }
        );


    });


};




// Sync voice with timeline

const syncVoiceWithScenes = async(
    timeline,
    audio
)=>{


    const voiceDuration =
    await getAudioDuration(audio);



    const totalScenes =
    timeline.timeline.length;



    if(totalScenes === 0){

        return timeline;

    }



    const averageDuration =
    voiceDuration / totalScenes;



    const updatedTimeline =
    timeline.timeline.map(
        (scene,index)=>{


            return {

                ...scene,


                duration:
                Number(
                    averageDuration.toFixed(2)
                ),


                voiceStart:
                Number(
                    (
                        index *
                        averageDuration
                    ).toFixed(2)
                ),


                voiceEnd:
                Number(
                    (
                        (index+1) *
                        averageDuration
                    ).toFixed(2)
                )


            };


        }
    );



    return {


        ...timeline,


        voiceDuration,


        timeline:
        updatedTimeline


    };


};




module.exports = {

    syncVoiceWithScenes

};