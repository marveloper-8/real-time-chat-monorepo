import ChatRoom from "@/components/ChatRoom";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Real-time Chat App</title>
        <meta name="description" content="A real-time chat application buit with Next.js and Socket.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ChatRoom />
    </div>
  )
}