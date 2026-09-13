import {useState,useEffect} from "react";
import {Search,Bell,Settings,ChevronDown,Clock3,PenSquare,Bot,Image as ImageIcon,Video} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard(){

const [time,setTime]=useState(new Date());
const [profile,setProfile]=useState(false);
const [search,setSearch]=useState("");

const user={
name:"BrainSpark",
email:"brainspark@example.com"
};

const quickTools=[
{name:"AI Writer",icon:PenSquare},
{name:"AI Chat",icon:Bot},
{name:"AI Images",icon:ImageIcon},
{name:"AI Videos",icon:Video}
];

const stats=[
{title:"Projects",value:28},
{title:"AI Chats",value:132},
{title:"Images",value:847},
{title:"Videos",value:46}
];

const weekly=[35,50,40,75,90,65,95];

const projects=[
{title:"Dream Documentary",type:"Video",status:"Completed"},
{title:"Thumbnail Collection",type:"Images",status:"Running"},
{title:"YouTube Scripts",type:"Writing",status:"Completed"}
];

const aiStatus=[
["AI Core","ONLINE"],
["Network","SECURE"],
["Database","CONNECTED"],
["Server","ACTIVE"],
["Encryption","AES-256"]
];

const storage=[
["Images","32 GB"],
["Videos","18 GB"],
["Documents","21 GB"]
];

const activities=[
["Created AI Image","Cyberpunk City"],
["Generated Script","Dream Documentary"],
["Rendered Video","YouTube Short"]
];

useEffect(()=>{
const timer=setInterval(()=>{
setTime(new Date());
},1000);
return()=>clearInterval(timer);
},[]);

return(
<>
<main className="dashboard-main">

<header className="dashboard-header">

<div className="header-left">

<div className="welcome-box">

<h1>
Good Morning,
<span> {user.name}</span>
</h1>

<p>{time.toLocaleDateString()}</p>

</div>

</div>

<div className="header-center">

<div className="search-box">

<Search size={18}/>

<input
type="text"
placeholder="Search anything..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

</div>

<div className="header-right">

<div className="live-clock">

<Clock3 size={18}/>

<span>{time.toLocaleTimeString()}</span>

</div>

<button className="header-icon">
<Bell size={20}/>
</button>

<button className="header-icon">
<Settings size={20}/>
</button>

<div className="profile-box">

<button
className="profile-btn"
onClick={()=>setProfile(!profile)}
>

<div>

<strong>{user.name}</strong>

<span>Premium User</span>

</div>

<ChevronDown size={18}/>

</button>

</div>

</div>

</header>

<section className="dashboard-grid">

<div className="dashboard-left">
<div className="glass-card">

<div className="section-title">
<h3>Quick Actions</h3>
</div>

<div className="quick-tools">

{quickTools.map((tool)=>{

const Icon=tool.icon;

return(

<button
key={tool.name}
className="tool-card"
>

<Icon size={22}/>

<span>{tool.name}</span>

</button>

);

})}

</div>

</div>

<div className="stats-grid">

{stats.map((item)=>(

<div
key={item.title}
className="stat-card"
>

<h3>{item.title}</h3>

<h2>{item.value}</h2>

</div>

))}

</div>

<div className="glass-card">

<div className="section-title">
<h3>Weekly Performance</h3>
</div>

<div className="graph-container">

{weekly.map((value,index)=>(

<div
key={index}
className="graph-item"
>

<div
className="graph-bar"
style={{
height:`${value}%`
}}
></div>

</div>

))}

</div>

</div>

<div className="glass-card">

<div className="section-title">
<h3>Recent Projects</h3>
</div>

{projects.map((project,index)=>(

<div
key={index}
className="project-row"
>

<div>

<h4>{project.title}</h4>

<span>{project.type}</span>

</div>

<strong>{project.status}</strong>

</div>

))}

</div>

</div>

<div className="dashboard-right">
<div className="glass-card">

<div className="section-title">
<h3>AI Status</h3>
</div>

<div className="system-list">

{aiStatus.map((item,index)=>(

<div
key={index}
className="system-row"
>

<span>{item[0]}</span>

<strong>{item[1]}</strong>

</div>

))}

</div>

</div>

<div className="glass-card">

<div className="section-title">
<h3>Cloud Storage</h3>
</div>

<div className="storage-details">

{storage.map((item,index)=>(

<div key={index}>

<span>{item[0]}</span>

<strong>{item[1]}</strong>

</div>

))}

</div>

</div>

<div className="glass-card">

<div className="section-title">
<h3>AI Credits</h3>
</div>

<div className="credits-box">

<h2>842</h2>

<span>Credits Remaining</span>

<div className="progress">

<div
className="progress-fill"
style={{width:"84%"}}
></div>

</div>

<small>Used 158 / 1000</small>

</div>

</div>

<div className="glass-card">

<div className="section-title">
<h3>Recent Activity</h3>
</div>

<div className="activity-list">

{activities.map((item,index)=>(

<div
key={index}
className="activity-item"
>

<div className="activity-info">

<strong>{item[0]}</strong>

<span>{item[1]}</span>

</div>

</div>

))}

</div>

</div>

</div>

</section>

</main>

</>

);

}