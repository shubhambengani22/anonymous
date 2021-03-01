import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-list-users',
  templateUrl: './chat-list-users.component.html',
  styleUrls: ['./chat-list-users.component.css']
})
export class ChatListUsersComponent implements OnInit {

  @Input() userList: any;
  usersPresent: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.userList)
    if(this.userList.length == 0){
      this.usersPresent = false;
    }
  }

}
