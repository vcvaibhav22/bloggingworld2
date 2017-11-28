import {Component} from '@angular/core';
import {UserService} from '../adminShared/user.service';
import {Router} from '@angular/router';
import {User} from "../adminShared/user";
import {isNullOrUndefined} from "util";


@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})

export class SignUpComponent {
  email: string;
  username: string;
  password1: string;
  password2: string;
  user: User = new User();
  users: User[] = [];
  signupSucces: boolean;
  constructor(private userSVC: UserService, private router: Router) {
  }

  signUp() {

    this.email = this.email + "@bloggingworld.com";
     this.signupSucces=true;
    if (isNullOrUndefined(this.email) || isNullOrUndefined(this.username) || isNullOrUndefined(this.password1) || isNullOrUndefined(this.password2)) {
      alert("One or more Fields is empty");
    }
    else if (!this.email.trim() && !this.username.trim() || !this.password1.trim() || !this.password2.trim()) {
      alert("One or more Fields is empty");
    }
    else if (this.password1 !== this.password2) {
      alert("Passwords do not match.");
    }
    else {

      this.userSVC.getUsers().subscribe(res => {
        this.users = res as User[];
        for(let singleUser of this.users)
        {
          if(this.email===singleUser.email||this.username===singleUser.username)
          {
            alert("This Email and Username is already taken. Please change Email and Username");
            this.email="";
            this.username="";
            this.password1="";
            this.password2="";
            this.signupSucces = false;
            break;

          }
        }

        if(this.signupSucces==true){
          this.validSignup();

        }

      }, err =>{
        console.log(err);

      } );


    }

  }


  validSignup(){

    this.user.username = this.username;
    this.user.email = this.email;
    this.user.password = this.password1;
    this.userSVC.register(this.user).subscribe(res => {
      this.verify(res.id, this.user.email, this.username);
    }, err => {
      console.log(err);
    });

  }



  verify(id: number, email: string, username: string) {

    this.userSVC.verifyUser(id, email, username);
  }


  cancel() {
    this.router.navigate(['/admin/login']);
  }
}
