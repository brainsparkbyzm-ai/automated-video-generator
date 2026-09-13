const { exec } = require("child_process");
const path = require("path");


const generateVoice = (text) => {

    return new Promise((resolve, reject) => {


        const output = path.join(
            __dirname,
            "voice.wav"
        );


        const command = 
        `echo "${text}" | piper --model en_US-lessac-medium.onnx --output_file "${output}"`;


        exec(command, (error, stdout, stderr) => {


            if(error){

                console.log("VOICE ERROR:");
                console.log(error);

                reject(error);
                return;

            }


            console.log("VOICE GENERATED:", output);


            resolve(output);


        });


    });


};


module.exports = {
    generateVoice
};