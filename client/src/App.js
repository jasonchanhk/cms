import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes> 
                <Route path="/" element={<Login/>}></Route>                
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
