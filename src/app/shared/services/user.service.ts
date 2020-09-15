import { LocalStorageService } from './local-storage.service';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from './../../../environments/environment.prod';
  import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>
  private userApi: string
  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: LocalStorageService
    ){
      this.userApi = '${environment.apiUrl}api/v1/users'
      this.currentUserSubject = new BehaviorSubject<User>(this.storage.getItem('currentUser'))
      this.currentUser = this.currentUserSubject.asObservable()
      }

    public get currentUserValue(): User {
      return this.currentUserSubject.value // returns the currentUser value to a component
    }

    setCurrentUser(user: User){
      this.currentUserSubject.next(user) //sets the currentUserSubject
    }


  login(params) {
    return this.http.post<any>('${this.userApi}/login', params)
    .pipe(
      catchError(this.handleError),
      map(res => {
        if (res && res.token) {
          const newUser = new User (res)
          this.storage.setItem('accessTokeen', res.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
          return { success: true, user: newUser }
        } else {
          return { success: false, msg: 'Invalid Credentials!'}
        }
      })
    )
  }

  signup(params) {
    return this.http.post<any>('${this.userApi}/create', params)
    .pipe(
      catchError(this.handleError),
      map(res => {
        debugger
        if (res && res.token) {
          const newUser = new User (res)
          this.storage.setItem('accessTokeen', res.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
          return { success: true, user: newUser }
        }
      })
    )
  }

logoutUser() {
  this.logout().subscribe( data => {
    //logout was successful
    if (data) {
      this.removeCurrentUserAndRoute()
    }
  }, error => {
    if (error) {
      this.removeCurrentUserAndRoute()
    }
  })
}

  logout() {
    return this.http.delete<any>('${this.userApi}/logout', {})
  }

  removeCurrentUserAndRoute() {
    // set local storage vars as undefined, remove, and then route back
    this.storage.setItem('currentUser', undefined)
    this.storage.setItem('accessToken', undefined)
    this.currentUserSubject.next(null)
    this.storage.removeItem('currentUser')
    this.storage.removeItem('accessToken')
    this.router.navigate(['/login'])
  }

  handleError(error) {
     let returnError
     if (error.error instanceof ErrorEvent) {
       // client-side error
       returnError = { statusCode: error.error.statusCode, message: 'Error ${error.error.message}'}
      }
      else {
      // servier-side error
      returnError = { statusCode: error.error.statusCode, message: 'Error Code: ${error.status}\nMessage: ${error.message}'}
      }
      return throwError(returnError)
   }
  }
