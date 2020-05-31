import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;
  loading = false;
  submitted = false;
  hide=true;
  public id = this.route.snapshot.params.id;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserserviceService,
    private httpUtil: HttpserviceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() { return this.resetForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }
    if (this.resetForm.value.password != this.resetForm.value.confirmpassword) {
      this.snackBar.open("failed", "both password should be same", {
        duration: 2000
      });
      return;
    }
    console.log(user);
    this.userService.resetPassword(user).subscribe(response => {
      this.router.navigate(['/login']);
      this.snackBar.open("sucess", "password reset successfully", {
        duration: 2000
      });
      console.log("reset successful", response);
    },
      error => {
        this.snackBar.open("error", "error to reset", { duration: 2000 });
        console.log("error to reset", error);
      }
    );
  }

}
