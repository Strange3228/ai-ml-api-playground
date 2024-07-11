import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ChatStore } from "./services/chat.store";
import { MessageInterface, MessageRoleEnum } from "./types/chat.types";
import { Observable } from "rxjs";
import { ChatService } from "./services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatForm = this.formBuilder.group({
    newMessage: ['', [Validators.required]],
    role: [MessageRoleEnum.User],
  })

  messages$: Observable<MessageInterface[]>;

  constructor(
    private formBuilder: FormBuilder,
    private chatStore: ChatStore,
    private chatService: ChatService,
  ) {
  }

  ngOnInit() {
    this.messages$ = this.chatStore.messages$;
  }

  sendMessage() {
    this.chatService.sendMessage({
      role: this.chatForm.get('role')?.value as MessageRoleEnum,
      content: this.chatForm.get('newMessage')?.value as string,
    });
    this.chatForm.get('newMessage')?.setValue('');
  }

  public get senderRole() {
    return MessageRoleEnum;
  }
}
