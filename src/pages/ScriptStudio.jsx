import {useState,useEffect} from "react";
import ai from "../api/openrouter";
import {auth,db} from "../api/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {doc,getDoc,updateDoc,collection,addDoc,getDocs} from "firebase/firestore";
import ScriptHistory from "../components/ScriptHistory";
import "./ScriptStudio.css";

export default function ScriptStudio(){

const [topic,setTopic]=useState("");
const [result,setResult]=useState("");
const [loading,setLoading]=useState(false);
const [credits,setCredits]=useState(0);

const [contentType,setContentType]=useState("YouTube Script");
const [model,setModel]=useState("google/gemini-2.5-flash");

const [history,setHistory]=useState([]);
const [favorites,setFavorites]=useState([]);

const templates={
"YouTube Script":"Write a complete engaging YouTube script with hook, storytelling, curiosity and CTA.",
"Documentary":"Write a cinematic documentary narration with facts and storytelling.",
"Blog":"Write a detailed SEO blog article.",
"SEO Article":"Write a complete SEO optimized article.",
"Video Title":"Generate 20 viral YouTube titles.",
"Description":"Write an SEO YouTube description.",
"Hashtags":"Generate trending hashtags.",
"Shorts Script":"Write a 30 second viral Shorts script."
};

const user={
name:"BrainSpark"
};
useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

if (!currentUser) {
console.log("NO USER");
return;
}

try {

console.log("LOGIN USER:", currentUser.uid);

const userRef = doc(
db,
"user",
currentUser.uid
);
const userSnap = await getDoc(userRef);

if (userSnap.exists()) {

const data = userSnap.data();

console.log(data);

setCredits(data.credits || 100);

} else {

console.log("Creating default credits...");

await updateDoc(userRef,{
credits:100
}).catch(()=>{});

setCredits(100);

}

}catch(err){

console.log("Firestore Error:",err);

setCredits(100);

}

});


return ()=>unsubscribe();



},[]);
const generateContent=async()=>{

if(!topic.trim()){

alert("Enter a topic.");
return;

}

if(credits<=0){

alert("No credits left.");
return;

}

try{

setLoading(true);

const response=await ai.chat.completions.create({

model,

max_tokens:1800,

temperature:0.8,

messages:[

{
role:"system",
content:templates[contentType]
},

{
role:"user",
content:topic
}

]

});

const output=response.choices[0].message.content;

setResult(output);

const currentUser = auth.currentUser;

if(!currentUser){

alert("Login Required");

return;

}

const userRef = doc(
db,
"user",
currentUser.uid
);

await addDoc(

collection(
db,
"users",
currentUser.uid,
"history"
),

{

topic,
type:contentType,
model,
result:output,
createdAt:new Date()

}

);

await updateDoc(userRef,{

credits:credits-1

});

setCredits(prev=>prev-1);

setHistory(prev=>[

{

id:Date.now(),
topic,
type:contentType,
model,
result:output

},

...prev

]);

}catch(error){

console.error(error);

alert("Generation Failed");

}finally{

setLoading(false);

}

};
return(

<div className="script-page">

<div className="script-header">

<div>

<h1>AI Writer Studio</h1>

<p>Create professional scripts, blogs and SEO content with AI.</p>

</div>

<div className="credit-card">

<h2>{credits}</h2>

<span>Credits Left</span>

</div>

</div>

<div className="script-card">

<div className="input-group">

<label>Content Type</label>

<select
value={contentType}
onChange={(e)=>setContentType(e.target.value)}
>

<option>YouTube Script</option>
<option>Documentary</option>
<option>Blog</option>
<option>SEO Article</option>
<option>Video Title</option>
<option>Description</option>
<option>Hashtags</option>
<option>Shorts Script</option>

</select>

</div>

<div className="input-group">

<label>AI Model</label>

<select
value={model}
onChange={(e)=>setModel(e.target.value)}
>

<option value="google/gemini-2.5-flash">
Gemini 2.5 Flash
</option>

<option value="openai/gpt-4.1">
GPT-4.1
</option>

<option value="anthropic/claude-3.7-sonnet">
Claude 3.7 Sonnet
</option>

<option value="deepseek/deepseek-chat-v3">
DeepSeek V3
</option>

</select>

</div>

<div className="input-group">

<label>Topic</label>

<textarea

rows="8"

value={topic}

onChange={(e)=>setTopic(e.target.value)}

placeholder="Enter your topic..."

></textarea>

</div>

<button

className="generate-btn"

onClick={generateContent}

disabled={loading}

>

{loading?"Generating...":"Generate Content"}

</button>
{result&&(

<div className="result-card">

<h2>Generated Result</h2>

<textarea

readOnly

rows="18"

value={result}

></textarea>

<div className="result-actions">

<button
onClick={()=>{
navigator.clipboard.writeText(result);
}}
>
Copy
</button>

<button
onClick={()=>{

const blob=new Blob(
[result],
{type:"text/plain"}
);

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="BrainSpark-Script.txt";

a.click();

URL.revokeObjectURL(url);

}}
>
Download
</button>

<button

onClick={async()=>{

const currentUser=auth.currentUser;

await addDoc(

collection(
db,
"users",
currentUser.uid,
"favorites"
),

{

topic,
type:contentType,
model,
result,
createdAt:new Date()

}

);

setFavorites(prev=>[

{

id:Date.now(),
topic,
type:contentType,
model,
result

},

...prev

]);

}}

>

Favorite

</button>

</div>

<ScriptHistory

history={history}

setHistory={setHistory}

favorites={favorites}

setFavorites={setFavorites}

setResult={setResult}

setTopic={setTopic}

/>

</div>

)}
<div className="favorites-card">

<h2>Favorite Scripts</h2>

{favorites.length===0?(
<p>No favorite scripts found.</p>
):(

favorites.map((item)=>(

<div
key={item.id}
className="favorite-item"
>

<div>

<h4>{item.topic}</h4>

<span>{item.type}</span>

</div>

<div className="favorite-actions">

<button
onClick={()=>{
setTopic(item.topic);
setResult(item.result);
}}
>
Open
</button>

<button
onClick={()=>{
setFavorites(prev=>
prev.filter(f=>f.id!==item.id)
);
}}
>
Remove
</button>

</div>

</div>

))

)}

</div>

<div className="stats-card">

<div className="stat-box">

<h3>{history.length}</h3>

<span>Total Scripts</span>

</div>

<div className="stat-box">

<h3>{favorites.length}</h3>

<span>Favorites</span>

</div>

<div className="stat-box">

<h3>{credits}</h3>

<span>Credits Left</span>

</div>

</div>

</div>

</div>

);

}