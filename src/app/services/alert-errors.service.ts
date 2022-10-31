import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertErrorsService {
    errorSubscription = new Subject<string>();
    constructor(){}
}
