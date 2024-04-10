import getSession from "@/actions/getSession";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.text();

  const [socketId, channel] = body.split("&").map((str) => str.split("=")[1]);

  const data = { user_id: session.user.email };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return NextResponse.json(authResponse);
}
