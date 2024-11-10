import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  let clonedReq = req;
  if(jwtToken){
    clonedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${jwtToken}`
      }
    });
  }
  return next(clonedReq);
};

function getJwtToken():string|null{
  const accessToken = sessionStorage.getItem('JWT_Token');
  if(accessToken){
    return JSON.parse(accessToken);
  }else{
    return null;
  }
}
