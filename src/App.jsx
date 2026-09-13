import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import ScriptStudio from "./pages/ScriptStudio";
import ImageStudio from "./pages/ImageStudio";
import VideoStudio from "./pages/VideoStudio";
import Projects from "./pages/Projects";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./pages/Sidebar";



function DashboardLayout(){

  return (

    <div className="app-layout">

      <Sidebar/>


      <main className="page-content">

        <Outlet/>

      </main>


    </div>

  );

}




export default function App(){


return (

<BrowserRouter>


<Routes>


<Route 
path="/" 
element={<Login/>}
/>


<Route 
path="/register" 
element={<Register/>}
/>



<Route 
path="/dashboard" 
element={<DashboardLayout/>}
>


<Route 
index 
element={<Dashboard/>}
/>


<Route 
path="writer" 
element={<ScriptStudio/>}
/>


<Route 
path="images" 
element={<ImageStudio/>}
/>


<Route 
path="videos" 
element={<VideoStudio/>}
/>


<Route 
path="projects" 
element={<Projects/>}
/>


<Route 
path="favorites" 
element={<Favorites/>}
/>


<Route 
path="settings" 
element={<Settings/>}
/>


</Route>



<Route 
path="*" 
element={<Navigate to="/" replace />}
/>



</Routes>


</BrowserRouter>


);

}