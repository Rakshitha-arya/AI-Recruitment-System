import { useState, useRef, useEffect } from "react";
import api from "../services/api";

function Chatbot() {

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text:
                "👋 Hello! I am your AI Placement Coach.\n\nAsk me anything about Resume, ATS, Python, React, Flask, SQL, Interview Preparation, or Placement."
        }
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const sendMessage = async () => {

        if (!input.trim()) return;

        const userMessage = {
            sender: "user",
            text: input
        };

        setMessages(prev => [...prev, userMessage]);

        const question = input;

        setInput("");

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const analysis = JSON.parse(
                localStorage.getItem("analysis")
            );

            const response = await api.post(

                "/chatbot/chat",

                {
                    message: question,
                    analysis: analysis
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            console.log(response.data);

            setMessages(prev => [

                ...prev,

                {
                    sender: "bot",
                    text:
                        response.data.reply ||
                        "No response received."
                }

            ]);

        }

        catch (error) {

    console.log("Full Error:", error);

    console.log("Response:", error.response);

    console.log("Data:", error.response?.data);

    console.log("Status:", error.response?.status);

    setMessages(prev => [

        ...prev,

        {
            sender: "bot",
            text:
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Something went wrong."
        }

    ]);

}

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="container mt-4"
            style={{ maxWidth: "900px" }}
        >

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">
                        🤖 AI Placement Coach
                    </h3>

                </div>

                <div
                    className="card-body"
                    style={{
                        height: "500px",
                        overflowY: "auto",
                        background: "#f8f9fa"
                    }}
                >

                    {

                        messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`d-flex mb-3 ${
                                    msg.sender === "user"
                                        ? "justify-content-end"
                                        : "justify-content-start"
                                }`}
                            >

                                <div
                                    className={`p-3 rounded shadow-sm ${
                                        msg.sender === "user"
                                            ? "bg-primary text-white"
                                            : "bg-white"
                                    }`}
                                    style={{
                                        maxWidth: "75%",
                                        whiteSpace: "pre-line"
                                    }}
                                >

                                    <strong>

                                        {

                                            msg.sender === "user"

                                                ? "You"

                                                : "🤖 AI Coach"

                                        }

                                    </strong>

                                    <br />

                                    {msg.text}

                                </div>

                            </div>

                        ))

                    }

                    {

                        loading &&

                        <div className="mb-3">

                            <div
                                className="bg-white rounded shadow-sm p-3 d-inline-block"
                            >

                                🤖 Typing...

                            </div>

                        </div>

                    }

                    <div ref={bottomRef}></div>

                </div>

                <div className="card-footer">

                    <div className="mb-3">

                        <button
                            className="btn btn-outline-primary btn-sm me-2 mb-2"
                            onClick={() => setInput("Explain Python")}
                        >
                            Python
                        </button>

                        <button
                            className="btn btn-outline-success btn-sm me-2 mb-2"
                            onClick={() => setInput("Explain React")}
                        >
                            React
                        </button>

                        <button
                            className="btn btn-outline-warning btn-sm me-2 mb-2"
                            onClick={() => setInput("Resume Tips")}
                        >
                            Resume Tips
                        </button>

                        <button
                            className="btn btn-outline-danger btn-sm me-2 mb-2"
                            onClick={() => setInput("ATS Score")}
                        >
                            ATS Score
                        </button>

                        <button
                            className="btn btn-outline-info btn-sm me-2 mb-2"
                            onClick={() => setInput("Interview Preparation")}
                        >
                            Interview
                        </button>

                        <button
                            className="btn btn-outline-dark btn-sm mb-2"
                            onClick={() => setInput("Missing Skills")}
                        >
                            Missing Skills
                        </button>

                    </div>

                    <div className="input-group">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ask anything about placements..."
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    sendMessage();

                                }

                            }}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={sendMessage}
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Sending..."

                                    : "Send"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Chatbot;