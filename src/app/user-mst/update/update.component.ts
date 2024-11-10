import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../UserDTO';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {

  userForm!:FormGroup;
  user:UserDTO = new UserDTO();
  isFormSubmitted!:boolean;

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService,private fb:FormBuilder){

  }

  ngOnInit(){
    //Initiliazing user form.
    this.userForm = this.fb.group({
      userId: [this.user.userId],
      firstName: [this.user.firstName, [Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      lastName: [this.user.firstName,[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      email: [this.user.email,[Validators.required,Validators.email]]
    });
  }

  saveUserDetails(){
    this.isFormSubmitted = true;
    if(this.userForm.valid){
      Swal.fire('Saved!','User details Saved successfuly','success')
    }
  }

  hasFieldError(fieldName:string,errorType:string):boolean{
    let fieldErrorStatus:any;
    if(this.userForm.get(fieldName)){
      fieldErrorStatus = (this.isFormSubmitted && this.userForm.get(fieldName)?.hasError(errorType));
    }
    return fieldErrorStatus;
  }
}
