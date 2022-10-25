import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  message!: string;
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.message = this.activeRoute.snapshot.data['message']
  }

}
