import React, { useState, useEffect } from "react";
import { json } from "react-router-dom";


function App({ children }) {
    return (
        <div style={{gap: "12px", border: '2px solid red', display: "flex", alignItems: "space-between"}}>
         {children}
         </div>
    )  
}
export default App;