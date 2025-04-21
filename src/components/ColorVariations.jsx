import React, { useRef, useState } from "react";
import ColorThief from "colorthief";

const ColorVariations = ({ baseColor }) => {
    const [palette, setPalette] = useState([]);
    const imgRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const colorThief = new ColorThief();
            const colors = colorThief.getPalette(img, 6); // get 6 dominant colors
            setPalette(colors);
        };

        imgRef.current.src = imageUrl;
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 Extract Colors from Image</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
            />
            <img ref={imgRef} alt="Uploaded" style={{ display: "none" }} />

            <div className="flex flex-wrap gap-4">
                {palette.map((color, index) => {
                    const rgbStr = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    return (
                        <div key={index} className="p-4 rounded shadow" style={{ backgroundColor: rgbStr }}>
                            <p className="text-white font-semibold">{rgbStr}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ColorVariations;
