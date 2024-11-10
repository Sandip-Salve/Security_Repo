import { Component } from '@angular/core';
import { UserDTO } from '../UserDTO';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  currentPage = 1;
  pageSize = 2;
  paginatedData:UserDTO[] = [];
  errorMsg!:string;

  paginationId:string = 'user-pagination';

  constructor(private userService:UserService, private router:Router){

  }

  ngOnInit(){
    this.fetchPaginationData();
  }

  fetchPaginationData(){
    this.userService.getPaginationData().subscribe({
      next: (data)=> {this.paginatedData = data},
      error: (err)=> {this.errorMsg = 'Error occurd during fetching data : '+ err.message}
    });
  }

  addNewUser(){
    this.router.navigate(['/user/new']);
  }

  updateUser(userId:number){
    this.router.navigate(['/user'],{state:{ID:userId}});
  }

  deleteUser(userId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting user with ID: '+userId,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.value){
        Swal.fire('Deleted!',`User with ID: ${userId} deleted successfully.`,'success')
      }
    });
  }
}
