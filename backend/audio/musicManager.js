const path = require("path");


const getBackgroundMusic = ()=>{


return path.join(
__dirname,
"../assets/music/documentary.mp3"
);


};


module.exports={
getBackgroundMusic
};