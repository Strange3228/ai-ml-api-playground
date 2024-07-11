import { Injectable } from "@angular/core";

export const API_KEY = 'api_key';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  isAuthenticated() {
    return localStorage.getItem(API_KEY) !== null;
  }

  setApiToken(token: string) {
    localStorage.setItem(API_KEY, token);
  }
}
