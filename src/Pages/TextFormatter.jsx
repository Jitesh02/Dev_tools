import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const TextFormatter = () => {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const toUpperCase = () => {
        setText(text.toUpperCase());
    };

    const toLowerCase = () => {
        setText(text.toLowerCase());
    };

    const toTitleCase = () => {
        const titleCased = text
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        setText(titleCased);
    };

    const handleClear = () => {
        setText("");
        setCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-100 to-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Text Formatter</h1>

            <textarea
                className="w-full h-60 p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none font-mono text-base"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={toUpperCase} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    UPPERCASE
                </button>
                <button onClick={toLowerCase} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    lowercase
                </button>
                <button onClick={toTitleCase} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                    Title Case
                </button>
                <button onClick={handleClear} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                    Clear
                </button>
                <button onClick={handleCopy} className="bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-400 flex items-center gap-2">
                    <MdOutlineContentCopy size={20} />
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
        </div>
    );
};

export default TextFormatter;
