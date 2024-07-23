import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
  createMessage(data: { room: string; user: string; message: string }) {
    return {
      room: data.room,
      user: data.user,
      message: data.message,
      timestamp: new Date().toISOString(),
    }
  }
}