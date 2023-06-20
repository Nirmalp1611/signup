import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AsyncSubject, ReplaySubject, Subject } from 'rxjs';

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
    sessionStorage.clear();
  }

  userData: any;
  username: string = '';
  password: string = '';
  proceedLogin() {
    if (this.username && this.password) {
      this.service.getByCode(this.username).subscribe((res) => {
        this.userData = res;
        if (this.userData.password == this.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('role', this.userData.role);
            this.toastr.success('login successfully');
            this.router.navigate(['']);
          } else {
            this.toastr.error('please contact admin', 'user is Inactive');
          }
        } else {
          this.toastr.error('wrong password');
        }
      });
    } else {
      this.toastr.warning('Please enter vaild data');
    }
  }

  ngOnInit() {
    const subject = new Subject<void>(); // Shorthand for Subject<void>

    subject.subscribe({
      next: () => console.log('One second has passed'),
    });

    setTimeout(() => subject.next(), 1000);
  }
}
