import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderProvider } from "../../context/HeaderContext";

import Home from "../../pages/Home";
import SinglePlayer from "../../pages/SinglePlayer";
import Input from "../Input";

export default function App() {
    return (
        <HeaderProvider>
            <Router basename='tic-tac-toe'>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/singleplayer' element={<SinglePlayer />} />
                    <Route path='/multiplayer' />
                    <Route path='*' />
                </Routes>

                {/* <Input label='your name' type='text' /> */}

            </Router>
        </HeaderProvider>
    )
}