import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, input } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router:Router,private bnIdle: BnNgIdleService){

  }

  navigateToLogin(){
    const jwtToken = sessionStorage.getItem('JWT_Token');
    if(jwtToken){
      sessionStorage.clear();
      this.bnIdle.stopTimer();
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn():boolean{
    const jwtToken = sessionStorage.getItem('JWT_Token');
    return jwtToken?true:false;
  }
}
