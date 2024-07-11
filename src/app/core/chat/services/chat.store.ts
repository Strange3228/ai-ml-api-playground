import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MessageInterface, MessageRoleEnum } from "../types/chat.types";

const defaultMessages: MessageInterface[] = [
  {
    role: MessageRoleEnum.System,
    content: 'You are an AI assistant who knows everything.'
  },
  {
    role: MessageRoleEnum.User,
    content: "Write something and remember it."
  },
  {
    role: MessageRoleEnum.Assistant,
    content: "Hello world!"
  },
  {
    role: MessageRoleEnum.User,
    content: "Repeat you last answer please."
  }
]

@Injectable({
  providedIn: 'root',
})
export class ChatStore {
  private subject: BehaviorSubject<MessageInterface[]> = new BehaviorSubject<MessageInterface[]>([]);
  readonly messages$ = this.subject.asObservable();

  addMessage(message: MessageInterface) {
    const messages = this.subject.value;
    this.subject.next([...messages, message]);
    console.log(this.subject.value);
  }
}
