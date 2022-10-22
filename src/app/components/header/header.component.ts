import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  collapsed = true;
  @Output()componentActive = new EventEmitter<string>();
  onstructor() { }


  ngOnInit(): void {
  }

  onClick(componentName: string) {
    this.componentActive.emit(componentName)
  }

}
