import { Component, OnInit } from '@angular/core';
import { DialogRef } from "@angular/cdk/dialog";
import { ChatSettingsService } from "../../../services/chat-settings.service";
import { ChatSettingsInterface } from "../../../types/chat-settings.type";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { take } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  currentSettings: ChatSettingsInterface;
  modelNames: string[];
  isLoading = true;

  settingsForm = this.formBuilder.group({
    modelName: new FormControl('', [Validators.required]),
    maxResponseLength: new FormControl(0, [Validators.required])
  });

  constructor(
    public dialogRef: DialogRef<string>,
    private chatSettings: ChatSettingsService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.chatSettings.getModelNames()
      .pipe(take(1))
      .subscribe(names => {
        this.modelNames = names;
        this.currentSettings = this.chatSettings.getCurrentSettings();
        this.settingsForm.get('modelName')?.setValue(this.currentSettings.modelName);
        this.settingsForm.get('maxResponseLength')?.setValue(this.currentSettings.maxTokens);
        this.isLoading = false;
      });
  }

  onSubmit() {
    this.chatSettings.updateSettings({
      modelName: this.settingsForm.get('modelName')?.value!,
      maxTokens: this.settingsForm.get('maxResponseLength')?.value!
    });
    this._snackBar.open('Settings updated successfully!', 'Close')
    this.dialogRef.close();
  }
}
