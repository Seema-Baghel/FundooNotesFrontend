import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree>  {
       if ( localStorage.getItem('token') != null ){
         return true
       } 
        else  {
         alert("You are not logged in, please Login!")
         this.router.navigate( ["/login"] );
         return false

       }

  }
}
