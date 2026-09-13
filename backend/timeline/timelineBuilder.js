const buildTimeline = (project) => {


    if(
        !project ||
        !Array.isArray(project.scenes)
    ){

        throw new Error(
            "Scenes missing for timeline"
        );

    }




    const timeline =
    project.scenes.map(
    (scene,index)=>{


        console.log(
            "=================================="
        );

        console.log(
            "BUILDING SCENE:",
            scene.id || index+1
        );

        console.log(
            "==================================");



        let asset = null;

        let assetType = "none";





        // =====================================
        // 1. AI VIDEO
        // =====================================

        if(
            scene.aiVideo
        ){

            asset =
            scene.aiVideo;

            assetType =
            "ai-video";

        }




        // =====================================
        // 2. STOCK VIDEO
        // =====================================

        else if(
            scene.stockVideo
        ){

            asset =
            scene.stockVideo;

            assetType =
            "stock-video";

        }




        // =====================================
        // 3. LOCAL VIDEO
        // =====================================

        else if(
            scene.video
        ){

            asset =
            scene.video;

            assetType =
            "video";

        }




        // =====================================
        // 4. VIDEO URL
        // =====================================

        else if(
            scene.videoUrl
        ){

            asset =
            scene.videoUrl;

            assetType =
            "video-url";

        }




        // =====================================
        // 5. AI IMAGE
        // =====================================

        else if(
            scene.aiImage
        ){

            asset =
            scene.aiImage;

            assetType =
            "ai-image";

        }




        // =====================================
        // 6. STOCK IMAGE
        // =====================================

        else if(
            scene.stockImage
        ){

            asset =
            scene.stockImage;

            assetType =
            "stock-image";

        }




        // =====================================
        // 7. NORMAL IMAGE
        // =====================================

        else if(
            scene.image
        ){

            asset =
            scene.image;

            assetType =
            "image";

        }




        console.log(
            "ASSET TYPE:",
            assetType
        );


        console.log(
            "ASSET:",
            asset
        );






        const duration =
        Number(
            String(
                scene.duration || "10"
            )
            .replace(
                "seconds",
                ""
            )
            .trim()
        )
        ||
        10;






        return {



            // BASIC

            sceneId:
            scene.id || index+1,


            title:
            scene.title ||
            `Scene ${index+1}`,





            // ASSET

            asset,

            assetType,




            // RENDERER COMPATIBILITY

            video:
            (
                assetType.includes("video")
            )
            ?
            asset
            :
            null,



            image:
            (
                assetType.includes("image")
            )
            ?
            asset
            :
            null,






            // AI FLAGS

            aiVideo:
            scene.aiVideo || null,


            aiImage:
            scene.aiImage || null,






            // PROMPTS

            imagePrompt:
            scene.imagePrompt || "",




            videoPrompt:
            scene.videoPrompt || "",





            // AUDIO

            voice:
            scene.voice || "",



            soundEffect:
            scene.soundEffect || null,






            // TIMING

            duration,






            // CINEMATIC

            camera:
            scene.camera ||
            "Slow cinematic camera movement",




            animation:
            scene.animation ||
            "Smooth documentary animation",




            transition:
            scene.transition ||
            "fade",






            // EXTRA

            subtitle:
            scene.subtitle || "",




            character:
            scene.character || null,



            avatar:
            scene.avatar || null,



            emotion:
            scene.emotion || null



        };



    });







    const totalDuration =
    timeline.reduce(

        (total,scene)=>

        total +
        scene.duration,

        0

    );





    console.log(
        "=================================="
    );

    console.log(
        "TIMELINE READY"
    );


    console.log(
        JSON.stringify(
            timeline,
            null,
            2
        )
    );


    console.log(
        "=================================="
    );






    return {


        title:
        project.title ||
        "Untitled Documentary",



        description:
        project.description ||
        "",



        totalScenes:
        timeline.length,



        totalDuration,



        timeline


    };

};





module.exports = {

    buildTimeline

};