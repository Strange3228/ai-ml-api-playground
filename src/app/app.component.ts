import { Component } from '@angular/core';
import { Dialog } from "@angular/cdk/dialog";
import { SettingsDialogComponent } from "./shared/components/settings-dialog/settings-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private dialog: Dialog
  ) {
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '500px',
    });
  }
}
