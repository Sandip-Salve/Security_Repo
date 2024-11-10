import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserDTO } from '../DTOs/userDTO';
import { Router } from '@angular/router';
import { UserService } from '../user-mst/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  userDTO:UserDTO = new UserDTO();

  roleSet:any[] = [
    {
      name : 'Admin',
      value: false
    },
    {
      name : 'User',
      value: false
    }
  ];
  isFormSubmitted!:boolean;

  constructor(private router:Router, private userService:UserService){

  }

  ngOnInit():void{

  }

  onSubmit(regiForm:NgForm):void{
    this.isFormSubmitted = true;
    if(regiForm.valid){
      this.userDTO.roles = this.getSelectedRoles();
      this.userService.createUser(this.userDTO).subscribe({
        next: (data)=>{
          console.log(data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registered successfully.",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
        },
        error: (error)=>{console.log(error.message);}
      });
    }
  }

  getSelectedRoles():string[]{
    return this.roleSet.filter(role=>role.value===true).map(role=>role.name);
  }

  onCancel():void{
    this.router.navigate(['/login']);
  }

  checkForRoleSelection():boolean{
    return this.roleSet.some(role=>role.value===true);
  }
}
