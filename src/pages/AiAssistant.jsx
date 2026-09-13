import {useState} from "react";
import {
Menu,
Search,
Bell,
Settings,
User,
LogOut,
Bot,
Sparkles,
MessageSquare,
Image as ImageIcon,
Video,
PenSquare,
FolderOpen
} from "lucide-react";
import "./AIAssistant.css";

export default function AIAssistant(){

const [sidebar,setSidebar]=useState(true);
const [profile,setProfile]=useState(false);
const [search,setSearch]=useState("");
const [message,setMessage]=useState("");

const user={
name:"BrainSpark",
email:"brainspark@example.com",
avatar:"https://ui-avatars.com/api/?name=BrainSpark"
};

const menu=[
{title:"Chat",icon:MessageSquare},
{title:"Writer",icon:PenSquare},
{title:"Images",icon:ImageIcon},
{title:"Videos",icon:Video},
{title:"Projects",icon:FolderOpen}
];

const chats=[
"Create YouTube Script",
"Generate Image Prompt",
"Explain React",
"Business Ideas",
"Fix Code"
];
return(
<div className="ai-page">

<aside className={sidebar?"sidebar open":"sidebar"}>

<div className="logo">
<Sparkles size={24}/>
<h2>BrainSpark</h2>
</div>

<button className="menu-btn">
<Menu size={20}/>
</button>

<div className="menu-list">

{menu.map((item,index)=>{

const Icon=item.icon;

return(
<button key={index} className="menu-item">
<Icon size={20}/>
<span>{item.title}</span>
</button>
);

})}

</div>

<div className="logout">
<button>
<LogOut size={20}/>
<span>Logout</span>
</button>
</div>

</aside>

<div className="main">

<header className="header">

<div className="search-box">
<Search size={18}/>
<input
type="text"
placeholder="Search..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</div>

<div className="header-right">

<button className="icon-btn">
<Bell size={20}/>
</button>

<button className="icon-btn">
<Settings size={20}/>
</button>

<div
className="profile"
onClick={()=>setProfile(!profile)}
>

<img
src={user.avatar}
alt=""
/>

<span>{user.name}</span>

<User size={18}/>

</div>

</div>

</header>
<div className="content">

<div className="left-panel">

<div className="chat-header">
<Bot size={22}/>
<h2>BrainSpark AI</h2>
</div>

<div className="chat-body">

<div className="ai-msg">
<div className="bubble ai">
Hello 👋 I'm BrainSpark AI. How can I help you today?
</div>
</div>

<div className="user-msg">
<div className="bubble user">
{message||"Type a message below..."}
</div>
</div>

</div>

<div className="chat-input">

<input
type="text"
placeholder="Ask anything..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button className="send-btn">
Send
</button>

</div>

</div>

<div className="right-panel">

<h3>Quick Prompts</h3>

{chats.map((chat,index)=>(
<button
key={index}
className="prompt-btn"
onClick={()=>setMessage(chat)}
>
{chat}
</button>
))}
<div className="card">

<h3>Account</h3>

<img
className="avatar"
src={user.avatar}
alt=""
/>

<h4>{user.name}</h4>

<p>{user.email}</p>

</div>

<div className="card">

<h3>Quick Tools</h3>

<button className="tool-btn">
<PenSquare size={18}/>
<span>AI Writer</span>
</button>

<button className="tool-btn">
<ImageIcon size={18}/>
<span>AI Images</span>
</button>

<button className="tool-btn">
<Video size={18}/>
<span>AI Videos</span>
</button>

</div>

</div>

</div>

</div>

{profile&&(
<div className="profile-menu">
<button>
<User size={18}/>
Profile
</button>

<button>
<Settings size={18}/>
Settings
</button>

<button>
<LogOut size={18}/>
Logout
</button>
</div>
)}

</div>
);

}