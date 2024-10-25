import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home";
import AboutUs from "../Screens/AboutUs";
import AddSong from "../Screens/AddSong";
import Contact from "../Screens/Contact"

function AllRoutes() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='/addsong' element={<AddSong />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
        </>
    )
}

export default AllRoutes