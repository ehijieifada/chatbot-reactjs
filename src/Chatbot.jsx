import { useState, useEffect, useRef } from "react";
import { fetchGeminiResponse } from "./api";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const topRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsLoading(true);

    const response = await fetchGeminiResponse(input);
    setMessages((prev) => [...prev, { text: response, isUser: false }]);
    setIsLoading(false);
  };

  // Scroll to top of AI message when new message is added
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28"> {/* add pb-28 to prevent overlap */}
        {messages.map((msg, idx) => {
          if (msg.isUser) {
            return (
              <div key={idx} className="flex justify-end">
                <div className="p-3 rounded-lg max-w-xs bg-blue-500 text-white">
                  {msg.text}
                </div>
              </div>
            );
          } else {
            return (
              <div key={idx} className="flex justify-center">
                <div className="w-[85%] md:w-[50%] px-2">
                  <div ref={topRef} className="p-3 rounded-lg whitespace-pre-wrap text-justify">
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          }
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center mt-2">
            <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Sticky Input */}
      <div className="fixed bottom-6 left-0 right-0 bg-gray-100 px-4">
  <div className="flex justify-center items-center space-x-2 w-full">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSend();
      }}
      className="w-[70%] md:w-[50%] p-3 border rounded"
      placeholder="Ask me anything!"
    />
    <button
      onClick={handleSend}
      className="p-3 bg-red-500 text-white rounded hover:bg-green-500"
    >
      Send
    </button>
  </div>
</div>
    </div>
  );
};

export default Chatbot;
