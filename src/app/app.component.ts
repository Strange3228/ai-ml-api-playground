import { Component, OnInit } from '@angular/core';
import { Dialog } from "@angular/cdk/dialog";
import { SettingsDialogComponent } from "./shared/components/settings-dialog/settings-dialog.component";
import { ApiAuthService } from "./services/api-auth.service";
import { AuthDialogComponent } from "./shared/components/auth-dialog/auth-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private dialog: Dialog,
    private apiAuthService: ApiAuthService
  ) {
  }

  ngOnInit() {
    if(!this.apiAuthService.isAuthenticated()) {
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
      console.log(result)
      if (result !== 'success') {
        this.openAuthDialog(true);
      }
    });
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '500px',
    });
  }
}
