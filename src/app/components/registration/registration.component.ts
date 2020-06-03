import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserserviceService, private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[A-Z][a-z\\s]{3,}")]],
      lastName: ['', [Validators.required, Validators.pattern("^[A-Z][a-z\\s]{3,}")]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]]
    });
  }
  get f() { return this.registerForm.controls; }
  public onSubmit(user) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(user);
    this.userService.registration(user).subscribe(response => {
      console.log("registartion successful");
      this.snackBar.open("Registration Successfully", "Ok", { duration: 2000 })
      this.router.navigate(['/login']);
    }, error => {
      this.snackBar.open("error", "cannot register", { duration: 2000 })
    });

  }
}