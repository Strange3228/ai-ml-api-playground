import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageInterface, MessageRoleEnum } from "../types/chat.types";
import { ChatStore } from "./chat.store";
import { switchMap, take } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ChatSettingsService } from "../../../services/chat-settings.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,
    private chatStore: ChatStore,
    private chatSettings: ChatSettingsService
  ) {
  }

  sendMessage(message: MessageInterface) {
    this.chatStore.addMessage(message)

    const settings = this.chatSettings.getCurrentSettings();
    const settingsMessage: MessageInterface = {
      role: MessageRoleEnum.User,
      content: `You are an AI assistant who knows everything. In your responses you should not use more than ${settings.maxTokens} characters.`
    }

    this.chatStore.messages$.pipe(
      take(1),
      switchMap((currentMessages) => {
        const payload = {
          model: settings.modelName,
          messages: [settingsMessage, ...currentMessages]
        };
        return this.http.post(`${environment.baseUrl}/chat/completions`, payload);
      })
    ).subscribe((response: any) => {
      this.chatStore.addMessage(response.choices[0].message)
    })
  }
}
