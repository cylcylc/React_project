
import './App.less';
import routes from "./router"
import {useRoutes,useLocation,useNavigate} from "react-router-dom"
import {useEffect} from "react"

function App() {
  const location=useLocation()
  const navigate=useNavigate()
  useEffect(()=>{
    
    if(location.pathname.indexOf("login")<0&&!localStorage.getItem("token")){
          navigate("/login")
          console.log(location)
    }
  })
  const router=useRoutes(routes)
  return (
    <div className="App">
     {router}
    </div>

  );
}
export default App;
