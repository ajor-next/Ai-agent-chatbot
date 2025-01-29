import Image from "next/image";
import { Conversation } from "./components/conversation";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{
        backgroundImage: `url('/background.png')`, // Replace with your local image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm  bg-opacity-0 p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          Prabhupada Conversational AI
        </h1>
        <div className="flex justify-center mb-6">
          <Image
            src="/prabupat.png" // Replace with your avatar image path
            alt="AI Avatar"
            className="w-40 h-40 rounded-full border-4 border-[#D1B2A1]"
            width={100}
            height={100}
          />
        </div>
        <Conversation />
      </div>
    </main>
  );
}
