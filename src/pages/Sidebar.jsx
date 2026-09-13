import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PenSquare,
  Image,
  Video,
  FolderOpen,
  History,
  Settings,
  Sparkles,
} from "lucide-react";
export default function Sidebar() {
console.log("NEW SIDEBAR RUNNING");
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "AI Writer",
      icon: PenSquare,
      path: "/dashboard/writer",
    },
    {
      name: "AI Images",
      icon: Image,
      path: "/dashboard/images",
    },
    {
      name: "AI Videos",
      icon: Video,
      path: "/dashboard/videos",
    },
    {
      name: "Projects",
      icon: FolderOpen,
      path: "/dashboard/projects",
    },
    {
      name: "History",
      icon: History,
      path: "/dashboard/history",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];


  return (

    <aside className="new-sidebar">


      {/* Logo */}

      <div className="sidebar-brand">

        <div className="brand-icon">
          <Sparkles size={26}/>
        </div>


        <div>
          <h2>
            BrainSpark
          </h2>

          <span>
            Premium AI
          </span>
        </div>

      </div>



      {/* Menu */}

      <nav className="sidebar-links">


      {
        menuItems.map((item)=>{

          const Icon=item.icon;


          return(

            <NavLink

              key={item.name}

              to={item.path}

              className={({isActive})=>
                isActive
                ?
                "sidebar-link active"
                :
                "sidebar-link"
              }

            >

              <Icon size={20}/>

              <span>
                {item.name}
              </span>


            </NavLink>


          )


        })
      }


      </nav>



      {/* Footer */}

      <div className="sidebar-footer">

        BrainSpark AI Studio
        <br/>
        Version 2.0

      </div>


    </aside>

  );

}