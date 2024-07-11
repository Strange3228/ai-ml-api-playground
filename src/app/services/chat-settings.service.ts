import { Injectable } from "@angular/core";
import { ChatSettingsInterface } from "../types/chat-settings.type";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatSettingsService {
  private settings: ChatSettingsInterface = {
    maxTokens: 50,
    stopSequence: ['\n'],
    temperature: 0.5,
    modelName: 'mistralai/Mistral-7B-Instruct-v0.2'
  }

  constructor(
    private http: HttpClient,
  ) {
  }

  updateSettings(newSettings: Partial<ChatSettingsInterface>): void {
    this.settings = {
      ...this.settings,
      ...newSettings
    }
  }

  getCurrentSettings() {
    return this.settings;
  }

  getModelNames() {
    return this.http.get('https://api.aimlapi.com/models').pipe(
      map((models) => Object.keys(models)),
    )
  }
}
