"use client";
import useConversation from "@/hooks/useConservation";
import { FullMessageType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

type Props = {
  initialMessages: FullMessageType[];
};

const Body: React.FC<Props> = ({ initialMessages }) => {
  const [messages, messagesSet] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    try {
      axios.post(`/api/conversations/${conversationId}/seen`);
    } catch (e) {
      console.log(e);
    }
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          data={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
