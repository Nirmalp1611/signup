import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}
  isLinear = true;
  currentStep: number = 0;
  combinedForm = {};

  ngOnChanges() {
    this.confirmPassword();
  }
  firstFormGroup = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false),
  });

  secondFormGroup = this.builder.group({
    password: this.builder.control(''),
  });

  thirdFormGroup = this.builder.group({
    address: this.builder.control(''),
  });
  reEnteredPassword = '';
  confirmPassword() {
    return this.secondFormGroup.value.password == this.reEnteredPassword;
  }

  proceedRegister() {
    this.combinedForm = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };
    if (this.firstFormGroup.valid) {
      console.log(this.combinedForm);

      this.service.proceedRegister(this.combinedForm).subscribe((res) => {
        this.toastr.success(
          'Contact Admin for approval',
          'Registered Successfully'
        );
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please enter vaild data');
    }
  }
}
