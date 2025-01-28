"use client";

import { useConversation } from "@11labs/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";

interface Message {
  source: string;
  message: string;
}

export function Conversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentStatus, setAgentStatus] = useState<string>("");

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message: Message) => {
      console.log("Message:", message);
      setMessages((prev) => [
        ...prev,
        { source: message.source, message: message.message },
      ]);
    },
    onError: (error: Error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID, // Replace with your agent ID
      });

      setAgentStatus("Listening");
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setAgentStatus(""); // Reset agent status when conversation ends
  }, [conversation]);

  useEffect(() => {
    // Update the agent's status dynamically
    if (conversation.status === "connected") {
      setAgentStatus(conversation.isSpeaking ? "Speaking" : "Listening");
    }
  }, [conversation.isSpeaking, conversation.status]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === "connected"}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== "connected"}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {agentStatus}</p>
        <div className="w-full flex flex-col gap-4 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-white w-full flex gap-4 items-start ${
                msg.source === "ai"
                  ? "bg-gray-700 self-start"
                  : "bg-blue-500 self-end"
              }`}
            >
              {/* Image/Icon Section */}
              <div className="flex-shrink-0">
                {msg.source === "ai" ? (
                  <Image
                    src="/prabupada.jpeg" // Replace with your image path
                    alt="AI Avatar"
                    className="w-12 h-12 rounded-full border-2 border-blue-400"
                    width={48}
                    height={48}
                  />
                ) : (
                  <FaRegUser className="w-8 h-8 text-white" />
                )}
              </div>

              {/* Message Section */}
              <div className="flex-grow max-w-[75%] break-words">
                <span>{msg.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
Prabhupada
 */