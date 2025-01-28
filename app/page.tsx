import Image from "next/image";
import { Conversation } from "./components/conversation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
         Prabhupada Conversational AI
        </h1>
        <div className="flex justify-center mb-6">
          <Image
            src="/prabupada.jpeg" // Replace with your image path
            alt="AI Avatar"
            className="w-40 h-40 rounded-full border-4 border-blue-500"
            width={100}
            height={100}
          />
        </div>
        <Conversation />
      </div>
    </main>
  );
}
