import React, { useRef, useState } from "react";

const ImageColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
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
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
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

    const drawToCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = imageRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">🖼️ Image Color Picker</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
            />

            {imageURL && (
                <>
                    <canvas
                        ref={canvasRef}
                        onClick={handleImageClick}
                        className="cursor-crosshair border rounded-lg"
                    ></canvas>
                    <img
                        ref={imageRef}
                        src={imageURL}
                        alt="Uploaded"
                        className="hidden"
                        onLoad={drawToCanvas}
                    />
                </>
            )}

            {selectedColor && (
                <div className="mt-6 text-center">
                    <div
                        className="w-16 h-16 mx-auto rounded-full border"
                        style={{ backgroundColor: selectedColor.hex }}
                    ></div>
                    <p className="mt-2 font-semibold text-lg">HEX: {selectedColor.hex}</p>
                    <p className="text-sm text-gray-600">
                        RGB: {selectedColor.r}, {selectedColor.g}, {selectedColor.b}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ImageColorPicker;
