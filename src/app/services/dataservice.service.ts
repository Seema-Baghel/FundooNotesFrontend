import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private message1 = new BehaviorSubject('default message');
  recentMessage = this.message1.asObservable();

  constructor() { }
  changeMessage(message: string) {
    this.message1.next(message)
  }
}
