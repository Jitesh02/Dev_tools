import React, { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import namer from "color-namer";
import { FiCopy } from "react-icons/fi";
import Navbar from "../components/Navbar";

const Color = () => {
    // const [color, setColor] = useColor("hex", "#e0c6c6");
    const [color, setColor] = useState({
        hex: "#e0c6c6",
        rgb: { r: 224, g: 198, b: 198, a: 1 },
        hsv: { h: 0, s: 12, v: 88, a: 1 },
    });

    const colorName = namer(color.hex).ntc[0].name;

    const handleCopy = (value) => {
        navigator.clipboard.writeText(value);
        alert(`Copied: ${value}`);
    };


    console.log("color ", color)

    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">🎨 Color Picker</h1>
                <div className='w-[40%]'>
                    <ColorPicker
                        width={9000}
                        height={150}
                        color={color}
                        onChange={setColor}
                        hideHSV
                        dark
                    // 
                    />
                </div>
                <div className="w-[80%] my-4">
                    <div
                        className="w-full h-auto rounded-md mb-4 p-2"
                        style={{ backgroundColor: color.hex }}
                    ><p className="text-white font-bold text-left">{color.hex}</p><p className="text-white font-semibold text-left">~{colorName}</p></div>

                    <div className="grid grid-cols-2 mt-6 p-4 bg-white rounded-xl shadow-lg w-full text-center">
                        <div className="flex justify-between items-center p-2  rounded-lg m-2 border">
                            <p className="  m-2 rounded text-left text-lg font-semibold">HEX {color.hex}</p>
                            <FiCopy className="cursor-pointer" onClick={() => handleCopy(color.hex)} />
                        </div>
                        <div className="flex justify-between items-center p-2  rounded-lg m-2 border">
                            <p className="  m-2 rounded text-left text-lg font-semibold"> rgb({Math.round(color.rgb.r)}, {Math.round(color.rgb.g)}, {Math.round(color.rgb.b)})</p>
                            <FiCopy className="cursor-pointer" onClick={() => handleCopy(`rgb(${Math.round(color.rgb.r)}, ${Math.round(color.rgb.g)}, ${Math.round(color.rgb.b)})`)} />
                        </div>
                        <div className="flex justify-between items-center p-2 m-2 border rounded-lg">
                            <p className="m-2 text-left text-lg font-semibold">
                                rgba({Math.round(color.rgb.r)}, {Math.round(color.rgb.g)}, {Math.round(color.rgb.b)}, {color.rgb.a.toFixed(2)})
                            </p>
                            <FiCopy
                                className="cursor-pointer"
                                onClick={() =>
                                    handleCopy(
                                        `rgba(${Math.round(color.rgb.r)}, ${Math.round(color.rgb.g)}, ${Math.round(color.rgb.b)}, ${color.rgb.a.toFixed(2)})`
                                    )
                                }
                            />
                        </div>
                        <div className="flex justify-between items-center p-2  rounded-lg m-2 border">
                            <p className="  m-2 rounded text-left text-lg font-semibold">HSV: {Math.round(color.hsv.h)}, {Math.round(color.hsv.s)}, {Math.round(color.hsv.v)}</p>
                            <FiCopy className="cursor-pointer" onClick={() => handleCopy(`hsv(${Math.round(color.hsv.h)}, ${Math.round(color.hsv.s)}, ${Math.round(color.hsv.v)})`)} />
                        </div>

                        {/* <p className=" bg-gray-300 m-2  text-left p-2 text-sm font-semibold">
                        rgb({Math.round(color.rgb.r)}, {Math.round(color.rgb.g)}, {Math.round(color.rgb.b)})
                    </p> */}

                        {/* <p className=" bg-gray-300 m-2 rounded text-left p-2 text-sm font-semibold">
                        HSV: {Math.round(color.hsv.h)}, {Math.round(color.hsv.s)}, {Math.round(color.hsv.v)}
                    </p> */}

                        {/* <button
                        onClick={handleCopy}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
                    >
                        Copy to Clipboard
                    </button> */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Color