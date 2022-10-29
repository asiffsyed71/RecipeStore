import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipes';
 
  private _displayComponent = "recipes";

  set displayComponent(componentName: string){
    this._displayComponent = componentName;
  }

  get displayComponent() {
    return this._displayComponent;
  }
}
