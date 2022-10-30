import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor() {}
  @Input() errorMessage!: string;
  @Output() closeModal = new EventEmitter<void>();
  ngOnInit(): void {}

  onClose() {
    this.closeModal.emit();
  }
}
