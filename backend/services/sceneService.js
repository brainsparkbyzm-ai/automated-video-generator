// =====================================
// SCENE BUILDER SERVICE
// =====================================


function buildScenes(data) {


    // Agar AI ne scenes diye hain
    if (
        data.scenes &&
        Array.isArray(data.scenes) &&
        data.scenes.length > 0
    ) {


        return data.scenes.map((scene,index)=>{


            return {

                id:index + 1,


                title:
                scene.title ||
                `Scene ${index+1}`,


                duration:
                parseDuration(scene.duration),


                voice:
                scene.voice ||
                data.script ||
                "",


                imagePrompt:
                scene.imagePrompt ||
                scene.title ||
                data.title ||
                "documentary scene",



                image:
                null,


                stockVideo:
                null,


                aiVideo:
                null,


                video:
                null,



                camera:
                scene.camera ||
                "Slow cinematic drone movement",



                animation:
                scene.animation ||
                "Realistic documentary motion",



                transition:
                "fade",



                soundEffect:
                null,


                music:
                "documentary"



            };


        });


    }





    // =====================================
    // AUTO GENERATE SCENES
    // =====================================


    console.log(
        "⚠ No AI scenes found - Creating fallback scenes"
    );



    const totalScenes = 10;



    return Array.from(
        {
            length: totalScenes
        },

        (_,index)=>{


            return {


                id:index + 1,


                title:
                `Scene ${index+1}: ${data.title || "Documentary"}`,


                duration:
                10,



                voice:
                data.script ||
                "",



                imagePrompt:
                `${data.title || "Documentary"} cinematic scene ${index+1}, ultra realistic, documentary style, 4K`,



                image:
                null,


                stockVideo:
                null,


                aiVideo:
                null,


                video:
                null,



                camera:
                "Cinematic camera movement",



                animation:
                "Smooth documentary animation",



                transition:
                "fade",



                soundEffect:
                null,


                music:
                "cinematic documentary"



            };


        }


    );


}







function parseDuration(value){


    if(!value){
        return 10;
    }


    if(typeof value==="number"){
        return value;
    }


    const seconds =
    String(value)
    .replace("seconds","")
    .replace("second","")
    .trim();



    const number =
    Number(seconds);



    return isNaN(number)
    ?
    10
    :
    number;


}







module.exports={

    buildScenes

};