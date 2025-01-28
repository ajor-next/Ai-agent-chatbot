'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";

interface Message{
  source:string;
  message:string;
}

export function Conversation() {
  const [messages, setMessages] = useState<Message[]>([]);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message: Message) => {
      console.log('Message:', message);
      setMessages((prev) => [...prev, { source: message.source, message: message.message }]);
    },
    onError: (error:Error) => console.error('Error:', error),
  });


  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID, // Replace with your agent ID
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
        <div className="w-full flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-white max-w-xs flex items-center gap-2 ${
                msg.source === 'ai' ? 'bg-gray-700 self-start' : 'bg-blue-500 self-end'
              }`}
            >
              {msg.source === 'ai' ? (
                <RiRobot2Line className="w-6 h-6 text-white" />
              ) : (
                <FaRegUser className="w-6 h-6 text-white" />
              )}
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
