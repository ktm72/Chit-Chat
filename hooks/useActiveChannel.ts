import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/libs/pusher";

const useActiveChannel = () => {
  const { setAll, add, remove } = useActiveList();

  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const channelName = "presence-messenger";
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe(channelName);
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      // console.log("Subscription succeeded:", members);
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      setAll(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      // console.log("Member added:", member);
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      // console.log("Member removed:", member);
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe(channelName);
        pusherClient.unbind_all();
        setActiveChannel(null);
      }
    };
  }, [activeChannel, setAll, add, remove]);
};

export default useActiveChannel;
