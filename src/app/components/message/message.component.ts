import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from 'src/app/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessagesService
  ) {}

  message: any;

  ngOnInit(): void {
    this.messageService._message$.subscribe((message) => {
      this.message = message;
    });
  }
}
