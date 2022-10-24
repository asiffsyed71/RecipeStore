import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Output() propagateChildEvent = new EventEmitter();

  @Input() recipeItem!: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onClickItem() {
    this.recipeService.selectedRecipe.emit(this.recipeItem);
  }
}
