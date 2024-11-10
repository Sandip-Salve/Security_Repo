import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserDTO } from '../DTOs/userDTO';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { BnNgIdleService } from 'bn-ng-idle';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isFormSubmitted!:boolean;
  userDTO:UserDTO = new UserDTO();
  isLoginSuccess!:boolean;
  loginFailMessage!:string;

  constructor(private loginService:LoginService, private router:Router,private bnIdle: BnNgIdleService){

  }

  ngOnInit():void{
    
  }

  onLogin(loginForm:NgForm){
    this.isFormSubmitted = true;
    if(loginForm.valid){
      const userCredentials = loginForm.value as UserDTO;
      this.loginService.login(userCredentials).subscribe({
        next: (data)=>{
          if(data){
            sessionStorage.setItem('JWT_Token',JSON.stringify(data));
            sessionStorage.setItem('idle_time','5');
            this.bnIdle.startWatching(5).subscribe((isTimedOut: boolean) => {
              if (isTimedOut) {
                Swal.fire({
                  title: "Are you sure?",
                  text: "Session is going to expire, want to stay!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Stay"
                }).then((result) => {
                  if (result.isConfirmed) {
                    const retrivedIdelTime = sessionStorage.getItem('idle_time');
                    if(retrivedIdelTime){
                      let extendedIdelTime = +retrivedIdelTime + 5;
                      sessionStorage.setItem('idle_time',extendedIdelTime.toString());
                      this.bnIdle.stopTimer();
                      this.bnIdle.startWatching(extendedIdelTime);
                    }
                  }else if(result.dismiss === Swal.DismissReason.cancel){
                    sessionStorage.clear();
                    this.bnIdle.stopTimer();
                    this.router.navigate(['/login']);
                  }
                });
              }
            });
            this.router.navigate(['/user/list']);
          }
        },
        error:(error)=>{
          switch(error.status){
            case 400 :
              this.isLoginSuccess = false;
              this.loginFailMessage = 'Username or password is incorrect!'
              console.log(`Error occured in login : ${error.message}`)
              break;
            case 500 :
              this.isLoginSuccess = false;
              this.loginFailMessage = 'Error occured!';
              console.log(`Error occured in login : ${error.message}`)
              break;
            case 200 :
              this.isLoginSuccess = true;
              this.router.navigate(['/login']);
          }
        }
      });
    }
  }
}
