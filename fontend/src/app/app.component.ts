import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  checkbox: boolean = false;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    // console.log(this.checkbox);
    this.auth.logout(true).subscribe((res) => {
      console.log(res);
      localStorage.removeItem('user');

      this.auth.toggleLogin(false);
      // Redirect
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err)
    })
  }
  loginLoad() {
    const localData: any = localStorage.getItem('user');

    if (!localData) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['books']);
    }
  }
  chklogin() {
    const localData: any = localStorage.getItem('user');

    if (!localData) {
      this.router.navigate(['login']);
    } else {
   
    }
  }
  profileLoad() {
    const localData: any = localStorage.getItem('user');
    const userObj = JSON.parse(localData);
    if (userObj.user_type=='1') {
      this.router.navigate(['profile']);
    } else {    
      this.router.navigate(['login']);
    }
  }
}
