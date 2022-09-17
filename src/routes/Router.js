import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Bookmark from "../pages/Bookmark";
export function Router(){
    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
    )
}