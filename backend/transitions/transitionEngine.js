const addTransitions = (timeline)=>{


const transitions = [];


timeline.timeline.forEach((scene,index)=>{


transitions.push({

scene:index,

transition:
index===0
?
"fade-in"
:
"crossfade",


duration:2

});


});


return transitions;


};



module.exports={

addTransitions

};