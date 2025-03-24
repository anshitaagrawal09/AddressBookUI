import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent {
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.personForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      phoneNumber: [data?.phoneNumber || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      address: [data?.address || '', Validators.required],
    });
  }

  submit() {
    if (this.personForm.valid) {
      this.dialogRef.close(this.personForm.value);
    }
  }
}
