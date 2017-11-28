import { Injectable } from '@angular/core';
import { Http,Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User} from "./user";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';




@Injectable()
export class UserService implements CanActivate {
  userLoggedIn: boolean = false;
  loggedInUser: string;
 public authUser: any;
  public authUserEmail: any;
  public authUserUsername: any;
  serverUrl = "http://localhost:3002";


  constructor( private router: Router ,
               private http:Http) {

  }

  headers = new Headers({
    'Content-Type': 'application/json',
  });

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url: string): boolean {
    if (this.userLoggedIn) { return true; }

    this.router.navigate(['/admin/login']);
    return false;
  }

  getUsers(): Observable<User[]>{

    let url = this.serverUrl + "/users";

    return this.http.get(url).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

   register(user: User){
     let url = this.serverUrl + "/users";
    return this.http.post(url,user,{headers: this.headers}).map(res => res.json()).catch(err =>{
      return Observable.throw(err);
    })


   }

   verifyUser(id:number,email:string,username:string){

     this.authUser = id;
     this.authUserEmail = email;
     this.authUserUsername = username;
     console.log(this.authUserEmail);
     if (this.authUserEmail) {

       alert(`Welcome ${this.authUserEmail}`);
       this.loggedInUser = this.authUserEmail;
       this.userLoggedIn = true;
       this.router.navigate(['/admin']);
     }
   }

  login(loginEmail: string, loginPassword: string){

    let url = this.serverUrl + "/users?username="+loginEmail+"&password="+ loginPassword;

    return this.http.get(url).map(res => res.json()).catch(err => {

      return Observable.throw(err);
    });
  }

  logout(){

    this.userLoggedIn = false;
    alert(`Logged Out!`);
  }


  getPostsById(userId){
    let url = this.serverUrl + "/posts?userId_like=" + userId;

    return this.http.get(url).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  getPosts(){
    let url = this.serverUrl + "/posts";

    return this.http.get(url).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  getPostsTitle(title: string) {

    let url = this.serverUrl + "/posts?title_like=" + title;

    return this.http.get(url).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });

  }

}

