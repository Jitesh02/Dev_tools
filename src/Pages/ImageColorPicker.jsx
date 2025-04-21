import React, { useEffect, useRef, useState } from "react";
import basicImage from '../assets/basic.png'
import toast, { Toaster } from 'react-hot-toast';
import { FiCopy } from "react-icons/fi";


const ImageColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState({
        r: 255,
        g: 255,
        b: 255,
        hex: "#ffffff"
    });

    const [imageURL, setImageURL] = useState(null);
    const [hoverColor, setHoverColor] = useState({
        r: 255,
        g: 255,
        b: 255,
        hex: "#ffffff"
    });

    const canvasRef = useRef(null);
    const magnifierRef = useRef(null);
    const imageRef = useRef(null);

    const magnifierSize = 150; // instead of 150
    const zoom = 15;           // for crisp pixel zoom


    const handleImageUpload = (e) => {
        const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageURL(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = pixel;
        setSelectedColor({ r, g, b, hex: rgbToHex(r, g, b) });
    };

    const rgbToHex = (r, g, b) => {
        return (
            "#" +
            [r, g, b]
                .map((x) => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                })
                .join("")
        );
    };

    const dropZoneWidth = 580;
    const dropZoneHeight = 240;

    const drawToCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = imageRef.current;

        if (!img || !canvas || !ctx) return;

        const container = canvas.parentElement;
        const width = container.clientWidth;
        const height = (img.height / img.width) * width;

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
    };

    const handleMouseMove = (e) => {

        const canvas = canvasRef.current;
        const magnifier = magnifierRef.current;
        const ctx = canvas.getContext("2d");
        const mCtx = magnifier.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = pixel;
        const hex = rgbToHex(r, g, b);
        setHoverColor({ r, g, b, hex });

        const sx = x - magnifierSize / (2 * zoom);
        const sy = y - magnifierSize / (2 * zoom);

        // Clear magnifier canvas
        mCtx.clearRect(0, 0, magnifierSize, magnifierSize);
        mCtx.imageSmoothingEnabled = false;

        // Draw zoomed portion
        mCtx.drawImage(
            canvas,
            sx,
            sy,
            magnifierSize / zoom,
            magnifierSize / zoom,
            0,
            0,
            magnifierSize,
            magnifierSize
        );

        // Draw grid lines
        const cellSize = magnifierSize / (magnifierSize / zoom);
        mCtx.strokeStyle = "#ccc";
        for (let i = 0; i < magnifierSize; i += cellSize) {
            mCtx.beginPath();
            mCtx.moveTo(i, 0);
            mCtx.lineTo(i, magnifierSize);
            mCtx.stroke();
            mCtx.beginPath();
            mCtx.moveTo(0, i);
            mCtx.lineTo(magnifierSize, i);
            mCtx.stroke();
        }

        // Red center cross
        const centerIndex = Math.floor(magnifierSize / cellSize / 2); // middle grid cell index
        const centerCellStart = centerIndex * cellSize;

        mCtx.strokeStyle = "red";
        mCtx.lineWidth = 1;
        mCtx.strokeRect(centerCellStart, centerCellStart, cellSize, cellSize);

        // Position the magnifier
        magnifier.style.left = `${e.clientX + 20}px`;
        magnifier.style.top = `${e.clientY + 20}px`;
        magnifier.style.display = "block";
    };

    const handleMouseLeave = () => {
        const magnifier = magnifierRef.current;
        if (magnifier) magnifier.style.display = "none";
    };

    useEffect(() => {
        const handleResize = () => {
            drawToCanvas();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [imageURL]);

    const handleCopy = (value) => {
        navigator.clipboard.writeText(value);
        console.log("value", value)
        toast.success(`Copied: ${value}`);
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-200 flex flex-col items-center justify-center p-6 relative">
                <div className="flex w-full gap-8 max-w-7xl">
                    <div className="shadow-xl w-[90%] rounded-xl p-4 bg-white flex flex-col items-center">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">🎯 Image Color Picker with Magnifier</h1>
                        <label
                            htmlFor="upload"
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleImageUpload(e);
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl border-2 border-blue-700 hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center w-full h-40 mb-4 text-xl"
                        >
                            Drag and Drop Images here or Click to Upload
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>

                        <div className="relative w-full mt-4">
                            <canvas
                                ref={canvasRef}
                                onClick={handleImageClick}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="cursor-crosshair border-4 border-gray-400 rounded-lg w-full h-auto shadow-lg"
                            />
                            <img
                                ref={imageRef}
                                src={imageURL || basicImage}
                                alt="Displayed"
                                className="hidden"
                                onLoad={drawToCanvas}
                            />
                        </div>

                        <canvas
                            ref={magnifierRef}
                            width={magnifierSize}
                            height={magnifierSize}
                            className="fixed pointer-events-none rounded-full shadow-lg border-2 border-black z-50"
                            style={{ display: "none" }}
                        />
                    </div>

                    <div className="shadow-xl w-[90%] bg-white rounded-xl p-6">
                        {selectedColor && (
                            <div className="mt-6 text-center">
                                <div
                                    className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300"
                                    style={{ backgroundColor: selectedColor.hex }}
                                ></div>
                                <div className="flex justify-between items-center p-2 m-2 border rounded-lg">
                                    <p className="m-2 text-left text-lg font-semibold">
                                        HEX: {selectedColor.hex}
                                    </p>
                                    <FiCopy
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleCopy(
                                                ` ${selectedColor.hex}`
                                            )
                                        }
                                    />
                                </div>
                                {/* <p className="mt-4 font-bold text-xl">HEX: {selectedColor.hex}</p> */}
                                <div className="flex justify-between items-center p-2 m-2 border rounded-lg">
                                    <p className="m-2 text-left text-lg font-semibold">
                                        RGB: {selectedColor.r}, {selectedColor.g}, {selectedColor.b}
                                    </p>
                                    <FiCopy
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleCopy(
                                                `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`
                                            )
                                        }
                                    />
                                </div>
                                {/* <p className="text-lg text-gray-600">
                                    RGB: {selectedColor.r}, {selectedColor.g}, {selectedColor.b}
                                </p> */}

                                {hoverColor && (
                                    <div className="p-4 text-center mt-6">
                                        <div
                                            className="w-96 h-14 mx-auto rounded-lg border-2 border-gray-500"
                                            style={{ backgroundColor: hoverColor.hex }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageColorPicker;
