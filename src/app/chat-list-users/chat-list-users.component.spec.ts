import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListUsersComponent } from './chat-list-users.component';

describe('ChatListUsersComponent', () => {
  let component: ChatListUsersComponent;
  let fixture: ComponentFixture<ChatListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatListUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
