const { generateVoice } = require("../voice/voiceGenerator");


const voiceController = async (req, res) => {

    console.log("🔥 VOICE CONTROLLER HIT");

    try {

        console.log("BODY RECEIVED:");
        console.log(req.body);


        const { script } = req.body;


        if (!script) {

            console.log("NO SCRIPT FOUND");

            return res.status(400).json({

                success:false,
                message:"Script required"

            });

        }


        console.log("GENERATING VOICE...");


        const audio = await generateVoice(script);



        console.log(
            "VOICE PATH:",
            audio
        );



        return res.status(200).json({

            success:true,

            message:"Voice generated successfully",

            audio

        });



    }
    catch(error){


        console.log(
            "VOICE CONTROLLER ERROR:",
            error
        );


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }

};



module.exports = {
    voiceController
};