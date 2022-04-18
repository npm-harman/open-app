import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from './user.model';


// firebase response data
export interface AuthResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  user = new BehaviorSubject<UserModel>(null!);
  tokenExiryTimer: any = null;
  
  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(this.signUpUrl + environment,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError), 
      tap(this.handleAuthentication.bind(this))
    );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(this.loginUrl + environment, 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(this.handleAuthentication.bind(this))
    );
  }

  logout(){
    this.user.next(null!);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExiryTimer)
      clearTimeout(this.tokenExiryTimer)
  }

  autoLogin(){
    const loadedUserData: {email: string, id: string, _token: string, _tokenExpirationDate: string} =
    JSON.parse(localStorage.getItem('userData') || '[]');
    if(!loadedUserData)
      return;
    const userData = new UserModel(
      loadedUserData.email, 
      loadedUserData.id, 
      loadedUserData._token, 
      new Date(loadedUserData._tokenExpirationDate)
    );
    if(userData.token){
      this.user.next(userData);
      const expiresIn = new Date(loadedUserData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expiresIn);
    }
  }

  autoLogout(expiryTimeInMiliSec: number){
    this.tokenExiryTimer = setTimeout(
      ()=>{
        this.logout();
      }
      ,expiryTimeInMiliSec);
  }

  private handleError(errorRes: HttpErrorResponse){

    let errorMessage = 'An unknown error occured';

    if(!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage);
    switch(errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = 'Email already exists';
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = 'Email not found';
        break;
      case "INVALID_PASSWORD":
        errorMessage = 'Invalid Password';
        break;
      case "USER_DISABLED":
        errorMessage = 'User has been disabled';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(resData: AuthResponseData){
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
    const userData = new UserModel(resData.email, resData.localId, resData.idToken, expirationDate);
    this.user.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    this.autoLogout(+resData.expiresIn * 1000);
  }
}
