import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from "./chat.component";
import { SharedModule } from "../../shared/shared.module";
import { ChatMessageComponent } from './components/chat-message/chat-message.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatMessageComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ChatModule { }
