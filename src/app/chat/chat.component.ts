import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {io} from "socket.io-client";
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  constructor(private router: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  userData: any;
  usersList: any;
  public currentUser: any
  public messages: any
  public selectedUser: any
  gotUsersList: boolean = false

  socket = io('http://localhost:3000');

  ngOnInit(): void {
    this.router.queryParams.subscribe(data => {
      if(data){
        this.userData = data;
        console.log(data)
      }
    });

    this.initSocketListener();
  }

  private getUserNameById(userId: number) {
    // @ts-ignore
    //const user = this.usersList.find(u => u.id === userId);
    const user = this.usersList.find(function(user){
      if(user.id == userId) return true;
    })
    console.log(user)
    return user ? user.name : "anonymous";
  }

  private initSocketListener() {
    this.socket.on("get users list", (users: string) => {
      this.usersList = [...JSON.parse(users)];
      console.log(this.usersList)
      this.gotUsersList = true;
      this.cdr.markForCheck();
    });

    this.socket.on("get messages history", (messages: string) => {
      const historyMessages = [...JSON.parse(messages)];
      this.messages = historyMessages.map(message => {
        return {
          ...message,
          userName: this.getUserNameById(message.userId)
        };
      });
      this.cdr.markForCheck();
    });

    this.socket.on("message", (message: string) => {
      const msg = JSON.parse(message);
      console.log(msg)
      this.messages = [
        ...this.messages,
        {
          ...msg,
          userName: this.getUserNameById(msg.userId)
        }
      ];
      this.cdr.markForCheck();
    });

    this.socket.on("user name added", (user: string) => {
      const newUser = JSON.parse(user);
      this.usersList = [
        ...this.usersList,
        {
          ...newUser,
          isCurrent: this.currentUser
            ? newUser.id === this.currentUser.id
            : false
        }
      ];
      this.cdr.markForCheck();
    });

    this.socket.on("my user added", (user: string) => {
      const createdUser = JSON.parse(user);
      this.currentUser = {
        ...createdUser,
        isCurrent: true
      };
    });
  }

  sendMessage($event: any, message: string){
    if($event.key == "Enter"){
      this.socket.emit('message', {userId: this.userData.id, text: message})
    }
  }

}
