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
    this.apiAuthService.login();
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '500px',
    });
  }
}
