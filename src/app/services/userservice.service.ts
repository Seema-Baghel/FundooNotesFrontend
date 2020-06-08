import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private API_URL = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', '*')
  };
  constructor(private http: HttpClient) {

  }

  registration(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${environment.apiUrl}${environment.registerUrl}`, user, this.httpOptions);
  }

  login(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${environment.apiUrl}${environment.loginUrl}`, user, this.httpOptions);
  }

  forgotPassword(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${environment.apiUrl}${environment.forgotpasswordUrl}`, user, this.httpOptions);
  }

  resetPassword(user: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${environment.resetPaswordUrl}`, user);
  }

  //uploadPic
  public uploadProfilePic(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.apiUrl}${environment.userProfilePicUploadUrl}`,formData);
  }

}

