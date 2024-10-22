import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home";
import AboutUs from "../Screens/AboutUs";

function AllRoutes() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<AboutUs />} />
            </Routes>
        </>
    )
}

export default AllRoutes