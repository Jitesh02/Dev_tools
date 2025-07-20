import React, { useEffect, useRef, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import ReactJson from 'react-json-view';


const JsonFormatter = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const preRef = useRef(null);
    const matchRefs = useRef([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);


    const handleFormat = () => {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setError("");
        } catch (err) {
            setError("Invalid JSON");
            setOutput("");
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError("");
        setSearchQuery("");
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Scroll to first match when search query updates
    useEffect(() => {
        if (!searchQuery || !preRef.current) return;

        const highlighted = preRef.current.querySelector(".highlight");
        if (highlighted) {
            highlighted.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [searchQuery]);

    const highlightText = (text) => {
        if (!searchQuery) return text;

        matchRefs.current = []; // Reset refs

        const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
        let matchCount = 0;

        return parts.map((part, index) => {
            const isMatch = part.toLowerCase() === searchQuery.toLowerCase();
            if (isMatch) {
                const refCallback = (el) => {
                    if (el) matchRefs.current[matchCount++] = el;
                };
                return (
                    <span
                        key={index}
                        ref={refCallback}
                        className="bg-yellow-300 highlight"
                    >
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && matchRefs.current.length > 0) {
            const nextIndex = (currentMatchIndex + 1) % matchRefs.current.length;
            setCurrentMatchIndex(nextIndex);

            const el = matchRefs.current[nextIndex];
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    };



    return (
        <div className="p-6 h-auto bg-gradient-to-br from-gray-100 to-white">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">✨ JSON Formatter</h1>

            <div className="flex items-center flex-col md:flex-row gap-">
                {/* Left Side: Input */}
                <div className="w-full md:w-1/2 space-y-4">
                    <label className="block text-gray-700 font-semibold">Unformatted JSON</label>
                    <textarea
                        className="w-full h-[450px] p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none font-mono text-sm"
                        placeholder="Paste or write your raw JSON here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {error && <div className="text-red-600 font-semibold">{error}</div>}

                </div>
                <div className="text-center gap-">
                    <button
                        className="bg-blue-600 mb-1 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        onClick={handleFormat}
                    >
                        Format
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>

                {/* Right Side: Output */}
                <div className="w-full md:w-1/2 space-y-2">
                    <label className="block text-gray-700 font-semibold">Formatted JSON</label>

                    {/* Search and Copy */}
                    <div className="flex justify-self-center justify-between w-full text-center items-center gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Search in JSON"
                            className="flex-1 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {output && (
                            <button
                                onClick={() => navigator.clipboard.writeText(output)}
                                className="bg-blue-200 text-white p-2 rounded hover:bg-blue-600 shadow-lg"
                            >
                                <MdOutlineContentCopy size={20} color="black" />
                            </button>
                        )}
                    </div>

                    <pre
                        ref={preRef}
                        className="w-full h-[400px] overflow-auto p-4 rounded-lg bg-gray-900 text-green-200 font-mono text-sm shadow-inner"
                    >
                        {highlightText(output)}
                    </pre>
                    {/* {output && (
                        <ReactJson
                            src={JSON.parse(output)}
                            collapsed={1} // You can control how deep to auto-collapse
                            enableClipboard={true}
                            theme="monokai"
                            displayDataTypes={false}
                            name={null}
                            className="w-full h-[400px] overflow-auto p-4 rounded-lg bg-gray-900 text-green-200 font-mono text-sm shadow-inner"
                        />
                    )} */}
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">📘 About This Tool</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    This JSON Formatter helps you:
                    <ul className="list-disc list-inside mt-1">
                        <li>Quickly format and beautify raw JSON</li>
                        <li>Validate JSON structure and highlight errors</li>
                        <li>Search specific keywords inside your formatted code</li>
                        <li>Copy clean and readable JSON with a single click</li>
                    </ul>
                    <br />
                    Simply paste your JSON on the left and hit <strong>"Format"</strong> — the right panel gives you a clear and nicely indented version. Great for debugging, API testing, or learning!
                </p>
            </div>
        </div>
    );
};

export default JsonFormatter;
