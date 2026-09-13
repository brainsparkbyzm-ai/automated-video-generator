const fs=require("fs");
const path=require("path");


const generateSubtitle = (script)=>{


const file =
path.join(
__dirname,
"subtitle.srt"
);



const lines =
script.split(". ");



let content="";


lines.forEach((line,index)=>{


content += `${index+1}\n`;

content += `00:00:${index
.toString()
.padStart(2,"0")} --> 00:00:${(index+1)
.toString()
.padStart(2,"0")}\n`;

content += `${line}\n\n`;


});



fs.writeFileSync(
file,
content
);


return file;


};



module.exports={
generateSubtitle
};