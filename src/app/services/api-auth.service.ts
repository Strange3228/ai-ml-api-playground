import { Injectable } from "@angular/core";
import { AuthDialogComponent } from "../shared/components/auth-dialog/auth-dialog.component";
import { Dialog } from "@angular/cdk/dialog";

export const API_KEY = 'api_key';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(
    private dialog: Dialog,
  ) {
  }

  login() {
    if(!this.isAuthenticated()) {
      this.openAuthDialog();
    }
  }

  openAuthDialog(wasClosedBefore = false) {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '500px',
      data: {
        wasClosedBefore
      }
    });

    dialogRef.closed.subscribe(result => {
      if (result !== 'success') {
        this.openAuthDialog(true);
      }
    });
  }

  isAuthenticated() {
    return localStorage.getItem(API_KEY) !== null;
  }

  setApiToken(token: string) {
    localStorage.setItem(API_KEY, token);
  }
}
