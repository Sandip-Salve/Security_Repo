import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable, interval, throttle } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private idleSubject = new Subject<boolean>();
  private timeout = 10; // seconds after which user considered as idle.
  private lastActivityDate!:Date; // To track the last time the user is active.
  private idleCheckInterval = 10; // seconds To check if user is idle or not
  private idleSubscription!:Subscription; // for checking idleness.


  constructor() { 
    this.resetTimer();
    this.startWatching();
  }

  get idleState():Observable<boolean>{
    return this.idleSubject.asObservable();
  }

  private startWatching(){
    this.idleSubscription = interval(this.idleCheckInterval*1000).pipe(
      throttle(()=>interval(1000))
    ).subscribe(()=>{
      const now = new Date();
      if(now.getTime()-this.lastActivityDate.getTime() > this.timeout * 1000){
        this.idleSubject.next(true);
      }
    });
  }

  resetTimer(){
    this.lastActivityDate = new Date();
    this.idleSubject.next(false); // user is active
  }

  stopWatching(){
    if(this.idleSubscription){
      this.idleSubscription.unsubscribe();
    }
  }
}
