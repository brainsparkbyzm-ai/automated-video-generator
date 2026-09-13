const { generateVoice } = require("./voice/voiceGenerator");

async function test(){

    const audio = await generateVoice(
        "Hello everyone. Welcome to Hygen AI."
    );

    console.log("AUDIO CREATED:");
    console.log(audio);

}

test();