import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageInterface } from "../types/chat.types";
import { ChatStore } from "./chat.store";
import { switchMap, take } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _payloadBase = {
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    messages: []
  }

  constructor(
    private http: HttpClient,
    private chatStore: ChatStore,
  ) {
  }

  sendMessage(message: MessageInterface) {
    this.chatStore.addMessage(message)
    this.chatStore.messages$.pipe(
      take(1),
      switchMap((currentMessages) => {
        const payload = {
          ...this._payloadBase,
          messages: [...currentMessages, message]
        };
        return this.http.post(`${environment.baseUrl}/chat/completions`, payload);
      })
    ).subscribe((response: any) => {
      this.chatStore.addMessage(response.choices[0].message)
    })
  }
}
