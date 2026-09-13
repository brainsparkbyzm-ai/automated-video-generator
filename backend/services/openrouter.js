const OpenAI = require("openai");

const ai = new OpenAI({

    apiKey: process.env.OPENROUTER_API_KEY,

    baseURL:
    "https://openrouter.ai/api/v1",

    timeout:120000

});



// ================================
// MAIN CHAT AI
// ================================

async function askAI(messages){

    try{


        const completion =
        await ai.chat.completions.create({

            model:
            "google/gemini-2.5-flash",


            temperature:0.2,


            max_tokens:2000,


            response_format:{
                type:"json_object"
            },


            messages


        });


        return (
            completion
            .choices[0]
            .message
            .content
        );


    }

    catch(error){


        console.log(
            "OPENROUTER CHAT ERROR:"
        );


        console.log(
            error.message
        );


        throw error;


    }

}






// ================================
// IMAGE PROMPT
// ================================

async function generateImagePrompt(scene){


    const completion =
    await ai.chat.completions.create({


        model:
        "google/gemini-2.5-flash",


        temperature:0.5,


        max_tokens:300,


        messages:[


            {

                role:"system",

                content:
`
Create ONE cinematic image prompt.

Include:

realistic documentary style
cinematic lighting
camera lens
composition
environment
color grading
8K detail

Return only prompt.
`

            },


            {

                role:"user",

                content:
                scene.imagePrompt ||
                scene.title ||
                ""

            }


        ]

    });



    return completion
    .choices[0]
    .message
    .content
    .trim();


}








// ================================
// VIDEO PROMPT
// ================================

async function generateVideoPrompt(scene){


    const completion =
    await ai.chat.completions.create({


        model:
        "google/gemini-2.5-flash",


        temperature:0.5,


        max_tokens:350,


        messages:[


            {

                role:"system",

                content:
`
Create ONE cinematic AI video prompt.

Include:

camera movement
subject movement
lighting
environment
depth
realistic documentary movie style

Return only prompt.
`

            },


            {

                role:"user",

                content:
                scene.imagePrompt ||
                scene.title ||
                ""

            }


        ]

    });



    return completion
    .choices[0]
    .message
    .content
    .trim();


}







// ================================
// CHARACTER PROMPT
// ================================

async function generateCharacterPrompt(character){


    const completion =
    await ai.chat.completions.create({


        model:
        "google/gemini-2.5-flash",


        temperature:0.4,


        max_tokens:250,


        messages:[


            {

                role:"system",

                content:
`
Create a realistic permanent character description.

Include:

age
face
hair
eyes
clothes
style
cinematic realism

Return only description.
`

            },


            {

                role:"user",

                content:
                character

            }


        ]

    });



    return completion
    .choices[0]
    .message
    .content
    .trim();


}







module.exports={


    askAI,


    generateImagePrompt,


    generateVideoPrompt,


    generateCharacterPrompt


};