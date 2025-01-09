import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { user: true, text: inputValue }]);
      setInputValue("");
    }
  };

  // Automatically send the default message after loading animation when chatbot opens
  useEffect(() => {
    if (isOpen) {
      // Show loading animation for 2 seconds
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMessages([
          ...messages,
          { user: false, text: "I'm GenAI bot, how can I help you?" },
        ]);
      }, 2000); // Adjust the time (2000ms = 2 seconds) for the loading animation
    }
  }, [isOpen]); // This effect runs when the chat opens

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <div
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-50"
          onClick={() => setIsOpen(true)}
        >
          💬
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-[400px] bg-white shadow-lg rounded-lg overflow-hidden z-50">
          {/* Header with Close Button */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl font-bold"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.user ? "text-right" : "text-left"}`}
              >
                <p
                  className={`inline-block p-2 rounded-lg ${
                    message.user
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {/* Loading Spinner */}
            {loading && (
              <div className="mb-2 text-left">
                <div className="inline-block p-2 bg-gray-200 text-black rounded-lg">
                  <div className="animate-spin border-t-2 border-blue-600 w-4 h-4 rounded-full mx-auto"></div>
                  <span className="ml-2 text-gray-500">Typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-100 flex items-center gap-2">
            <input
              type="file"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-gray-300 p-2 rounded cursor-pointer hover:bg-gray-400"
            >
              📂
            </label>
            <input
              type="text"
              placeholder="Type a message"
              className="flex-grow p-2 border rounded"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
