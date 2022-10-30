import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Recipes';

  private _displayComponent = 'recipes';

  constructor(private authService: AuthService) {}

  set displayComponent(componentName: string) {
    this._displayComponent = componentName;
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  get displayComponent() {
    return this._displayComponent;
  }
}
