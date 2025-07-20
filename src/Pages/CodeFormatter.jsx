// src/components/CodeFormatter.tsx
import { useState } from "react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";
import parserJson from "prettier/parser-babel";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const supportedLanguages = ["javascript", "json", "html", "css"];

const getPrettierParser = (lang) => {
    switch (lang) {
        case "javascript":
            return parserBabel;
        case "json":
            return parserJson;
        case "html":
            return parserHtml;
        case "css":
            return parserCss;
        default:
            return null;
    }
};

export default function CodeFormatter() {
    const [code, setCode] = useState("// Paste your code here");
    const [language, setLanguage] = useState("javascript");
    const [formatted, setFormatted] = useState("");

    const formatCode = () => {
        const parser = getPrettierParser(language);
        if (!parser) {
            setFormatted(code); // fallback for non-supported
            return;
        }

        try {
            const result = prettier.format(code, {
                parser: language === "json" ? "json" : language,
                plugins: [parser],
            });
            setFormatted(result);
        } catch (e) {
            console.error("Format error", e);
            setFormatted(code);
        }
    };

    const highlighted = hljs.highlight(code, { language }).value;

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            <select
                className="border p-2 rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                {[
                    "javascript",
                    "json",
                    "html",
                    "css",
                    "python",
                    "java",
                    "cpp",
                    "c",
                ].map((lang) => (
                    <option key={lang} value={lang}>
                        {lang.toUpperCase()}
                    </option>
                ))}
            </select>

            <textarea
                rows={10}
                className="w-full border p-2 rounded font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button
                onClick={formatCode}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Format Code
            </button>

            <pre className="p-4 h-40 bg-gray-100 rounded overflow-auto">
                <code
                    dangerouslySetInnerHTML={{
                        __html: hljs.highlight(formatted || code, { language }).value,
                    }}
                />
            </pre>
        </div>
    );
}
