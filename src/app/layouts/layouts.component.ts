import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  // providers: [MessageService]
})
export class LayoutsComponent implements OnInit {
  constructor( private msg: MessageService) { }

  ngOnInit(): void {
    this.msg.add({ severity: 'error', summary: `Статус ошибки: ${'err'}`, detail: 'err' });
  }


}
