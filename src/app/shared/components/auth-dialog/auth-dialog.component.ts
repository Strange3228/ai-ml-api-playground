import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { ApiAuthService } from "../../../services/api-auth.service";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
  authForm = this.formBuilder.group({
    apiKey: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private apiAuthService: ApiAuthService,
  ) {
  }

  onSubmit() {
    this.apiAuthService.setApiToken(this.authForm.get('apiKey')?.value!);
    this._snackBar.open('ApiKey passed successfully!', 'Close');
    this.dialogRef.close('success');
  }
}
