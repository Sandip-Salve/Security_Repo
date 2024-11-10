import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../environments/api.constants';
import { environment } from '../../environments/environment.dev';
import { UserDTO } from '../user-mst/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL:string = environment.apiURL;

    constructor(private http:HttpClient){

    }

    createUser(user:UserDTO):Observable<UserDTO>{
        const createUserURL = this.baseURL.concat(API_ENDPOINTS.saveUserDetails);
        return this.http.post<UserDTO> (createUserURL,user);
    }

    // updateUser(userId:number,user:UserDTO):Observable<UserDTO>{
    //     const updateUserURL = this.baseURL.concat(API_ENDPOINTS.saveUserDetails.concat(userId.toString()));
    //     return this.http.post<UserDTO> (updateUserURL,user);
    // }

    getPaginationData():Observable<UserDTO[]>{
      const userPaginatedDataURL = environment.apiURL.concat(API_ENDPOINTS.pagination);
      return this.http.get<UserDTO[]> (userPaginatedDataURL);
    }

    // fetchUser(userId:number):Observable<UserDTO>{
    //     const fetchUserURL = this.baseURL.concat(API_ENDPOINTS.saveUserDetails.concat(userId.toString()));
    //     return this.http.get<UserDTO> (fetchUserURL);
    // }

    // deleteUser(userId:number):Observable<{}>{
    //     const updateUserURL = this.baseURL.concat(API_ENDPOINTS.deleteUserDetails.concat(userId.toString()));
    //     return this.http.delete(updateUserURL);
    // }
}
