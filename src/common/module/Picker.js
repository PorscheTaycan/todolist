import React from "react";
import Style from "./Style";


const Picker = ({ changeColor }) => {

    const colors = ['#efadce', '#ffe69c', '#a6e9d5', '#6ea8fe', '#c29ffa']

    return (
        <div className="picker">
            {colors.map((color, index) => (
                <div className="custom-check-box" style={Style(color)} onClick={() => changeColor(color)} key={index} />
            ))}
        </div>
    )
}

export default Picker;
