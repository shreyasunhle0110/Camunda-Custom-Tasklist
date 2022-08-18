import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl : './login.component.html'})
export class LoginComponent  implements OnInit {
   
    constructor(private http: HttpClient, private router: Router,) {}
    ngOnInit(): void {
        if(localStorage.getItem('currentUser')){
            this.router.navigate(['/tasklist'])
        }
       console.log("hehehehhehe");
       
    }
    
    onSubmit(){
        let username = (<HTMLInputElement>document.getElementById("username")).value;
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        const data = {
            username : username,
            password : password
        }
        this.http.post<any>('http://localhost:3000/login',data).subscribe((item :any ) => {
            if(item.username == data.username) {  
                localStorage.setItem('currentUser', item.username);  
                alert ("login successfull");
                this.router.navigate(['/tasklist'])
            } else if (item.username == "Not A User") {
                alert("Check details again");
            }
            
        });
        //console.log(result);
        
        
    }
  
}
