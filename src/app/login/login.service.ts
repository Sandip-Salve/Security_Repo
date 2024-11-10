import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment.dev';
import { API_ENDPOINTS } from "../../environments/api.constants";
import { HttpClient } from "@angular/common/http";
import { UserDTO } from "../DTOs/userDTO";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoginService{
    protected loginURL = environment.apiURL.concat(API_ENDPOINTS.login);

    constructor(private http:HttpClient){

    }

    login(userCredentials:UserDTO):Observable<string>{
        return this.http.post<string>(this.loginURL,userCredentials,{responseType:'text' as 'json'});
    }

    isLoggedIn():boolean{
        const jwtToken = sessionStorage.getItem('JWT_Token');
        return jwtToken?true:false;
    }
}