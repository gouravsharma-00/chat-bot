"use client";

import { useState, useRef, useEffect } from "react";
import Talk from "@libs/bot";
import MarkdownRenderer from "@components/Markdown"

export default function Chatbox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return; // Prevent empty messages

        // Add user message
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");

        try {
            const response = await Talk(input); // Await the AI response
            setMessages((prev) => [...prev, { text: response, sender: "bot" }]); // Add AI response
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setMessages((prev) => [...prev, { text: "Error getting response", sender: "bot" }]);
        }
        setIsLoading(false);
        inputRef.current.focus();

    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setIsLoading(true)
            sendMessage()
        };
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#FCFCFC] dark:bg-[#111111] p-4">
            <main className="w-full max-w-3xl flex flex-col h-full p-4">

                {/* Chat Messages */}
                <article className="flex-1 w-full overflow-y-auto p-4 space-y-3 flex flex-col items-start">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg max-w-xs md:max-w-sm flex ${msg.sender === "user"
                                ? "bg-blue-500 text-white self-end justify-end" // Right-align user messages
                                : "bg-gray-200 text-black self-start justify-start" // Left-align AI messages
                                }`}>
                                <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert break-words">
                                    <MarkdownRenderer content={msg.text} />
                                </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Auto-scroll reference */}
                </article>


                {/* Chat Input Box */}
                <div className="w-full bg-[#111111] p-4 rounded-2xl shadow-lg flex items-center">
                    <input
                        ref={inputRef}
                        disabled={isLoading}
                        type="text"
                        placeholder="Message AI..."
                        className="w-full  text-white text-sm p-3 rounded-xl outline-none border focus:outline-none border-transparent placeholder-gray-300"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="ml-2 p-2 bg-[#19C37D] rounded-lg text-white hover:bg-[#17a370] transition"
                        onClick={sendMessage}
                    >
                        🚋
                    </button>
                </div>

            </main>
        </div>
    );
}
