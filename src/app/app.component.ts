import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertComponent } from './components/alert/alert.component';
import { AlertErrorsService } from './services/alert-errors.service';
import { AuthService } from './services/auth-service.service';
import { PlaceholderDirective } from './utils/placeholder.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private modalSub!: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  hostDirective!: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private alertErrorsService: AlertErrorsService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.alertErrorsService.errorSubscription.subscribe((errorMessage) => {
      const componentFacory =
        this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.hostDirective.viewContainerRef;
      hostViewContainerRef.clear();
      const componentRef =
        hostViewContainerRef.createComponent(componentFacory);
      componentRef.instance.errorMessage = errorMessage;
      this.modalSub = componentRef.instance.closeModal.subscribe(() => {
        hostViewContainerRef.clear();
        this.modalSub.unsubscribe();
      });
    });
  }
}
