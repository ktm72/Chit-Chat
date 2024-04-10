"use client";
import useConversation from "@/hooks/useConservation";
import { FullMessageType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import _ from "lodash";
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

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (msg: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      messagesSet((current) => {
        if (
          _.find(current, {
            id: msg.id,
          })
        ) {
          return current;
        }
        return [...current, msg];
      });
      bottomRef?.current?.scrollIntoView();
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
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
