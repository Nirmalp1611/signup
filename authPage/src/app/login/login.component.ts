import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear()
  }

  userData: any;
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getByCode(this.loginForm.value.username).subscribe((res) => {
        this.userData = res;
        console.log(this.userData);
        if (this.userData.password == this.loginForm.value.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('role', this.userData.role);
            this.toastr.success('login successfully');
            this.router.navigate(['']);
          }
          else{
            this.toastr.error('please contact admin','user is Inactive')
          }
        } else {
          this.toastr.error('wrong password');
        }
      });
    } else {
      this.toastr.warning('Please enter vaild data');
    }
  }
}
