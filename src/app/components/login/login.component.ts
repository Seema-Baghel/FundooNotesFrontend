import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModule } from 'src/app/model/user/user.module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  user: UserModule  = new UserModule();
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserserviceService,
    private httpUtil: HttpserviceService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(user) {

    if (this.loginForm.invalid) {
      console.log("form validation failed");
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(response => {
      console.log("login true");
      localStorage.setItem('token', response.token);
      /**this.router.navigate(['/dashboard']);*/
      this.snackBar.open("Successfully logged In", "Ok", { duration: 2000 })
    }, error => {
      this.snackBar.open("error in login", "please enter valid data", { duration: 2000 })
    });
  }
}