 import { Component, OnInit } from '@angular/core';
 import { Subscription } from 'rxjs';
 import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { BehaviorSubject } from 'rxjs';
 
 import { MatDialog } from '@angular/material/dialog';
 import { MatDialogRef } from "@angular/material/dialog";
 import { UserserviceService } from 'src/app/services/userservice.service';
 import { DataserviceService } from 'src/app/services/dataservice.service';
 //import { ProfilepictureComponent } from 'src/app/components/profilepicture/profilepicture.component';
 

 @Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss']
 })
 export class DashboardComponent implements OnInit {

  email: string;
  token: string;
  firstName: string;
  lastName: string;
  message: any;
  fileUrl: File;
  profile: string;
  private sub: any;
  private param: any;
  subscription: Subscription;
  mySubscription: Subscription;
  private obtainNotes = new BehaviorSubject([]);
  currentMessage = this.obtainNotes.asObservable();
  
  constructor(private router: Router, private route: ActivatedRoute, private matSnackBar: MatSnackBar,
              private matDialog: MatDialog, private dataService: DataserviceService, private userService: UserserviceService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
   }

   ngOnInit() {
    this.dataService.recentMessage.subscribe(
      (response: any) => {
        this.message = response;
      }
    );
    this.token = localStorage.getItem('token')    
    this.email = localStorage.getItem('emailId')
    this.firstName = localStorage.getItem('firstname');
    this.lastName = localStorage.getItem('lastname');
    this.profile = localStorage.getItem('fileUrl');
   }

   refresh(): void {
    window.location.reload();
  }

  onSubmit(file: File) {
    console.log(file);
    
    this.userService.uploadProfilePic(file).subscribe(response => {
      console.log("login true");
      localStorage.setItem('fileUrl', response.fileUrl);
      this.matSnackBar.open("Successfully Uploaded", "Ok", { duration: 2000 })
      window.location.reload();
    }, error => {
      this.matSnackBar.open("error in uploading", "please upload again", { duration: 2000 })
    });
  }
  
  public logout() {
     localStorage.removeItem('token')
     this.matSnackBar.open('Logout successfull', 'ok', { duration: 3000 });
     this.router.navigate(['/login']);
   }
 }
