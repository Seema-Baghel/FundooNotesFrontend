import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetpasswordModule } from 'src/app/model/resetpassword/resetpassword.module';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  resetPassword: ResetpasswordModule = new ResetpasswordModule();
  resetForm: FormGroup;
  token: string;
  loading = false;
  submitted = false;
  hide=true;
  public id = this.route.snapshot.params.id;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserserviceService,
    private httpUtil: HttpserviceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      newPassword: new FormControl(this.resetPassword.newPassword, [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      confirmPassword:new FormControl(this.resetPassword.confirmPassword, [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")])
    });

    this.token=this.route.snapshot.paramMap.get('token');
  }

  get f() { return this.resetForm.controls; }

  onSubmit(resetUser) {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }
    console.log(this.token+""+this.resetPassword.newPassword+""+this.resetPassword.confirmPassword);
    if (this.resetForm.value.password != this.resetForm.value.confirmpassword) {
      this.snackBar.open("failed", "both password should be same", {duration: 2000});
      return;
    }
    console.log(this.token);
    //this.token=this.route.snapshot.paramMap.get("token");
    this.userService.resetPassword(this.resetPassword, this.token).subscribe(
      (response: any) => {
        // if (response.statusCode === 200) {
          console.log(response);
          this.router.navigate(['/login']);
          this.snackBar.open("sucess", "password reset successfully", {duration: 2000});
    },
      error => {
        this.snackBar.open("error", "error to reset", { duration: 2000 });
        console.log("error to reset", error);
      }
    );
  }

}
