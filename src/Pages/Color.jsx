import React, { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import namer from "color-namer";
import { FiCopy } from "react-icons/fi";
import ColorVariations from "../components/ColorVariations";
import { TinyColor } from "@ctrl/tinycolor";
import toast, { Toaster } from 'react-hot-toast';



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
        console.log("value", value)
        toast.success(`Copied: ${value}`);
    };


    // console.log("color ", color)

    // VARIATIONS 
    const getShades = (hex) => {
        const base = new TinyColor(hex);
        return Array.from({ length: 11 }, (_, i) =>
            base.darken(i * 10).toHexString()
        );
    };

    const getTints = (hex) => {
        const base = new TinyColor(hex);
        return Array.from({ length: 11 }, (_, i) =>
            base.tint(i * 10).toHexString()
        );
    };

    const shades = getShades(color.hex);
    const tints = getTints(color.hex);

    console.log("shades ", shades)

    return (
        <>
            {/* <Navbar /> */}
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6"
            // style={{ backgroundColor: color.hex }}           
            >
                <h1 className="text-3xl font-bold mb-6 text-gray-800">🎨 Color Picker</h1>
                <div className='w-[30%]'>
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
                    </div>
                    {/* Add Color Variations Component Here */}
                    <div className="bg-white p-6 rounded-xl shadow-lg mt-8 w-full">
                        <h2 className="text-xl font-semibold mb-4">Variations</h2>
                        <p className="text-gray-600 mb-6">
                            These are generated tints (white added) and shades (black added) of the selected color.
                        </p>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Shades</h3>
                            <div className="flex flex-wrap gap-2 w-full">
                                {shades.map((shade, i) => (
                                    <div
                                        key={i}
                                        className="relative w-20 h-20 rounded cursor-pointer group border"
                                        style={{ backgroundColor: shade }}
                                        // title={shade}
                                        onClick={() => handleCopy(shade)}
                                    >
                                        <FiCopy className="absolute top-1 right-1 text-white opacity-0 group-hover:opacity-100 transition duration-200" />
                                        <p className="absolute bottom-1 left-1 right-1 text-[15px] text-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
                                            {shade}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Tints</h3>
                            <div className="flex flex-wrap gap-2">
                                {tints.map((tint, i) => (
                                    <div
                                        key={i}
                                        className="relative w-20 h-20 rounded cursor-pointer group border"
                                        style={{ backgroundColor: tint }}
                                        // title={tint}
                                        onClick={() => handleCopy(tint)}
                                    >
                                        <FiCopy className="absolute top-1 right-1 text-black opacity-0 group-hover:opacity-100 transition duration-200" />
                                        <p className="absolute bottom-1 left-1 right-1 text-[10px] text-center text-black opacity-0 group-hover:opacity-100 transition duration-200">
                                            {tint}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default Color