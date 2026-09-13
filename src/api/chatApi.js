import axios from "axios";


const API = "http://localhost:5000/api";



// =====================================
// 🤖 AI CHAT / DOCUMENTARY GENERATOR
// =====================================

export const sendPrompt = async (prompt) => {

    const { data } = await axios.post(

        `${API}/chat`,

        {
            prompt
        }

    );


    return data;

};





// =====================================
// 🎥 FREE STOCK VIDEO SEARCH (PEXELS)
// =====================================

export const searchPexels = async (query) => {


    const { data } = await axios.post(

        `${API}/pexels`,

        {
            query
        }

    );


    return data;

};






// =====================================
// 🎬 AI VIDEO GENERATOR
// =====================================

export const generateAIVideo = async (scene) => {


    console.log(
        "AI VIDEO REQUEST:",
        scene
    );



    const { data } = await axios.post(

        `${API}/video/generate-ai-video`,

        {

            sceneId:
            scene.id,


            title:
            scene.title || "",


            prompt:
            scene.aiVideoPrompt ||
            scene.imagePrompt ||
            scene.title ||
            "",


            imagePrompt:
            scene.imagePrompt || "",


            camera:
            scene.camera ||
            "Cinematic camera movement",


            animation:
            scene.animation ||
            "Realistic documentary animation",


            duration:
            scene.duration || 10


        }

    );


    return data;


};






// =====================================
// 🎬 CREATE VIDEO PROJECT
// =====================================

export const createVideoProject = async (project) => {


    console.log(
        "SENDING VIDEO PROJECT:",
        project
    );



    const { data } = await axios.post(

        `${API}/video/create-video`,

        project

    );


    return data;


};







// =====================================
// 🎙 AI VOICE GENERATOR
// =====================================

export const generateVoice = async (script) => {


    console.log(
        "SENDING VOICE REQUEST:",
        script
    );



    const { data } = await axios.post(

        `${API}/generate-voice`,

        {
            script
        }

    );


    return data;


};