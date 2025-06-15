"use client";

import { useState, useRef, useEffect } from "react";
import Talk from "@libs/bot.js";
import MarkdownRenderer from "@components/Markdown.jsx";

export default function Chatbox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const SpeechRecognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const speakText = (text) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages(prev => [...prev, { text: input, sender: "user" }]);
        setInput("");

        try {
            const response = await Talk(input);
            setMessages(prev => [...prev, { text: response, sender: "bot" }]);
            speakText(response);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setMessages(prev => [...prev, { text: "Error getting response", sender: "bot" }]);
        }

        setIsLoading(false);
        inputRef.current.focus();
    };

    const sendMessageFromVoice = async (voiceInput) => {
        if (!voiceInput.trim()) return;

        setMessages(prev => [...prev, { text: voiceInput, sender: "user" }]);

        try {
            const response = await Talk(voiceInput);
            setMessages(prev => [...prev, { text: response, sender: "bot" }]);
            speakText(response);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setMessages(prev => [...prev, { text: "Error getting response", sender: "bot" }]);
        }

        setIsLoading(false);
    };

    const handleVoiceInput = () => {
        if (!recognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            setInput(speechResult); // Optional: show in input
            setIsLoading(true);
            sendMessageFromVoice(speechResult);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
        };
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setIsLoading(true);
            sendMessage();
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#FCFCFC] dark:bg-[#111111] p-4">
            <main className="w-full max-w-3xl flex flex-col h-full p-4">
                {/* Chat Messages */}
                <article className="flex-1 w-full overflow-y-auto p-4 space-y-3 flex flex-col items-start">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg max-w-xs md:max-w-sm flex ${
                                msg.sender === "user"
                                    ? "bg-blue-500 text-white self-end justify-end"
                                    : "bg-gray-200 text-black self-start justify-start"
                            }`}
                        >
                            <div className="prose prose-sm sm:prose-base overflow-x-auto md:prose-lg dark:prose-invert break-words">
                                <MarkdownRenderer content={msg.text} />
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </article>

                {/* Thinking Text */}
                {isLoading && (
                    <div className="text-sm text-gray-400 mb-2 px-1 animate-pulse">
                        Thinking...
                    </div>
                )}

                {/* Chat Input Box */}
                <div className="w-full bg-[#111111] p-4 rounded-2xl shadow-lg flex items-center">
                    <input
                        ref={inputRef}
                        disabled={isLoading}
                        type="text"
                        placeholder="Message AI..."
                        className="w-full text-white text-sm p-3 rounded-xl outline-none border focus:outline-none border-transparent placeholder-gray-300"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="ml-2 p-2 bg-[#19C37D] rounded-lg text-white hover:bg-[#17a370] transition"
                        onClick={sendMessage}
                        disabled={isLoading}
                    >
                        🚋
                    </button>
                    <button
                        className="ml-2 p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
                        onClick={handleVoiceInput}
                        disabled={isLoading}
                    >
                        🎙️
                    </button>
                </div>
            </main>
        </div>
    );
}
