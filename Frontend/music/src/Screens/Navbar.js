import "../Styles/Navbar.css"
import { useNavigate } from "react-router-dom"

function Navbar(){
    const navigate = useNavigate()
    function isActive(path){
        return window.location.href.includes(path)
    }
    return(
        <div id="navbar">
            <ul>
                <li class={`navlink${isActive('/home')?'active':''}`}><a onClick={()=>navigate('/home')}>Home</a></li>
                <li class={`navlink${isActive('/about')?'active':''}`}><a onClick={()=>navigate('/about')}>About</a></li>
                <li class={`navlink${isActive('/contact')?'active':''}`}><a onClick={()=>navigate('/contact')}>Contact</a></li>
                <li class={`navlink${isActive('/addsong')?'active':''}`}><a onClick={()=>navigate('/addsong')}>Add</a></li>
            </ul>
        </div>
    )
}
export default Navbar