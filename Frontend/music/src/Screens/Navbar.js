import "../Styles/Navbar.css"
import { useNavigate } from "react-router-dom"

function Navbar(){
    const navigate = useNavigate()
    return(
        <div id="navbar">
            <ul>
                <li><a onClick={()=>navigate('/')}>Home</a></li>
                <li><a onClick={()=>navigate('/about')}>About Us</a></li>
                <li><a onClick={()=>navigate('/')}>Contact</a></li>
            </ul>
        </div>
    )
}
export default Navbar