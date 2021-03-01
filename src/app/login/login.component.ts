import { Component, OnInit } from '@angular/core';
import {io} from "socket.io-client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submitHandler(name: string){
    //TODO - Get the logged in user via cookies and get that user's conversation history
    var socket =  io('http://localhost:3000');
    socket.emit('user name added', name);
    socket.on('my user added', (userData: any) => {
      if(userData){
        this.router.navigate(['chat'], {queryParams: JSON.parse(userData)})
      }
    })
  }

}
