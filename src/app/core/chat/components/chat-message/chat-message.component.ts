import { Component, Input, OnInit } from '@angular/core';
import { MessageInterface, MessageRoleEnum } from "../../types/chat.types";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: MessageInterface;

  constructor() { }

  ngOnInit(): void {
  }

  public get senderRole() {
    return MessageRoleEnum;
  }
}
