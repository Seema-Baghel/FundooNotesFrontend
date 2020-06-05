 import { Component, OnInit } from '@angular/core';
 import { Subscription } from 'rxjs';
 import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
 import { MatSnackBar } from '@angular/material/snack-bar';

 @Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss']
 })
 export class DashboardComponent implements OnInit {

  private sub: any;
  private param: any;
  subscription: Subscription;
  mySubscription: Subscription;

   constructor(private router: Router, private route: ActivatedRoute, private matSnackBar: MatSnackBar) { 
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

   ngOnInit(): void {
   }

   refresh(): void {
    window.location.reload();
  }
  
   public logout() {
     localStorage.removeItem('token')
     this.matSnackBar.open('Logout successfull', 'ok', { duration: 3000 });
     this.router.navigate(['/login']);
   }
 }
