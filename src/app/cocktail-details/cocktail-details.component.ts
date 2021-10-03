import { Component, Inject, OnInit } from '@angular/core';
import { Cocktail } from '../cocktail';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  cocktail: Cocktail;
}

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.css'],
})
export class CocktailDetailsComponent implements OnInit {
  cocktail: Cocktail;
  ingredientsIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.cocktail = this.data.cocktail;
  }
}
