const { jsonrepair } = require("jsonrepair");

const { askAI } = require("../services/openrouter");
const { documentaryPrompt } = require("../services/promptService");
const { buildScenes } = require("../services/sceneService");


// =====================================
// ENRICH SCENES
// =====================================

const enrichScenes = (data) => {


    if (!Array.isArray(data.scenes)) {

        data.scenes = [];

    }


    data.scenes = data.scenes.map((scene, index) => {


        const prompt =
            scene.imagePrompt ||
            scene.title ||
            data.title ||
            "documentary scene";


        return {


            ...scene,


            id:
            scene.id || index + 1,


            duration:
            scene.duration || "10 seconds",



            imagePrompt:
            prompt,


            stockSearch:
            prompt,


            aiImagePrompt:
            prompt,


            aiVideoPrompt:
            `${prompt}, cinematic documentary style, ultra realistic, 4K, smooth camera movement`,



            video:null,

            image:null,

            aiVideo:null,

            aiImage:null,


            stockVideo:null,

            stockImage:null,



            camera:
            scene.camera ||
            "Slow cinematic drone movement",



            animation:
            scene.animation ||
            "Smooth documentary animation",



            transition:"fade",



            musicMood:"documentary",


            soundEffects:[],


            character:null


        };


    });



    return data;


};





// =====================================
// FALLBACK DATA
// =====================================


const buildFallback = (prompt, script)=>{


    let data = {


        title:prompt,


        hook:
        "A cinematic documentary journey",



        description:
        "AI generated documentary",



        script:script,



        thumbnailPrompt:
        `Ultra realistic documentary thumbnail about ${prompt}`,



        scenes:

        Array.from(
            {length:10},
            (_,i)=>({


                id:i+1,


                title:
                `Scene ${i+1}`,



                duration:
                "10 seconds",



                voice:
                script,



                imagePrompt:
                `Ultra realistic documentary scene about ${prompt}`,



                camera:
                "Cinematic drone movement",



                animation:
                "Smooth motion"

            })
        )


    };



    data.scenes =
    buildScenes(data);



    return enrichScenes(data);


};







// =====================================
// CONTROLLER
// =====================================


const chatController = async(req,res)=>{


    console.log("🔥 CHAT CONTROLLER HIT");

    console.log(req.body);



    try{


        const {prompt}=req.body;



        if(!prompt){


            return res.status(400).json({

                success:false,

                message:"Prompt required"

            });


        }




        console.log(
            "USER PROMPT:",
            prompt
        );




        let text =
        await askAI(
            documentaryPrompt(prompt)
        );



        if(!text){


            throw new Error(
                "AI empty response"
            );


        }




        text =
        text
        .replace(/```json/gi,"")
        .replace(/```/g,"")
        .trim();




        let data;



        try{


            data =
            JSON.parse(text);



            data.scenes =
            buildScenes(data);



            data =
            enrichScenes(data);



            console.log(
                "✅ JSON SUCCESS"
            );


        }



        catch(jsonError){



            console.log(
                "⚠ JSON REPAIR"
            );



            try{


                const fixed =
                jsonrepair(text);



                data =
                JSON.parse(fixed);



                data.scenes =
                buildScenes(data);



                data =
                enrichScenes(data);



                console.log(
                    "✅ JSON FIXED"
                );


            }



            catch(error){


                console.log(
                    "⚠ FALLBACK"
                );


                data =
                buildFallback(
                    prompt,
                    text
                );


            }



        }





        return res.json({

            success:true,

            data

        });





    }


    catch(error){



        console.log(
            "❌ CHAT ERROR:"
        );


        console.log(
            error
        );



        return res.status(500).json({


            success:false,


            message:error.message


        });



    }



};





module.exports={

    chatController

};