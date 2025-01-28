import type { Metadata } from "next";
import {  Lexend } from "next/font/google";
import "./globals.css";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

const lexend = Lexend({
  subsets: ['latin'],
})

const url = "https://ai-agent-chatbot-ecru.vercel.app/";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  title: "Prabhupada Conversational AI",
  description: "Prabhupada Conversational AI is an advanced assistant that provides insights into Mahabharata, Hindu religion, Vedic knowledge, and related teachings. Engage in meaningful conversations about history, spirituality, and culture with this AI-powered agent.",
  keywords: ["Prabhupada AI"],
  openGraph: {
    title: "Prabhupada Conversational AI",
    description:
      "Discover the wisdom of Mahabharata, Hindu religion, and Vedic teachings with Prabhupada Conversational AI. Your personal guide to spirituality, history, and culture.",
    url,
    type: "website",
    images: [
      {
        url: `${url}/prabupada.jpeg`,
        width: 1200,
        height: 630,
        alt: "Prabhupada Conversational AI banner",
      },
    ],
    siteName: "Prabhupada AI",
  },
  alternates: {
    canonical: url,
  },
  twitter: {
    card: "summary_large_image",
    site: "@PrabhupadaAI", // Replace with your Twitter handle
    title: "Prabhupada Conversational AI",
    description:
      "Discover Mahabharata, Hindu teachings, and Vedic wisdom with Prabhupada Conversational AI. Your guide to spirituality and ancient knowledge.",
    images: [`${url}/prabupada.jpeg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body
        className={`${lexend.className}`}
      >
        {children}
      </body>
    </html>
  );
}
