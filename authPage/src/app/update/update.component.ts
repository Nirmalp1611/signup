import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  editData: any;
  ngOnInit(): void {
    this.service.getAllRole().subscribe((res) => {
      this.roleList = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getByCode(this.data.usercode).subscribe((res) => {
        this.editData = res;
        this.registerForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          email: this.editData.email,
          password: this.editData.password,
          role: this.editData.role,
          gender: this.editData.gender,
          isActive: this.editData.isActive,
        });
      });
    }
  }
  roleList: any;
  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
  });
  updateUser() {
    if (this.registerForm.valid) {
      this.service
        .updateUser(this.registerForm.value.id, this.registerForm.value)
        .subscribe((res) => {
          this.toastr.success('Updated Successfully');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please select Role');
    }
  }
}
