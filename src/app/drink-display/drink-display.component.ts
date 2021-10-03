import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cocktail } from '../cocktail';
import { MatDialog } from '@angular/material/dialog';
import { QRCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { RemoteServiceService } from '../remote-service.service';
import { SearchChoice } from '../search-choice';
import { CocktailDetailsComponent } from '../cocktail-details/cocktail-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoResultAlertComponent } from '../no-result-alert/no-result-alert.component';

@Component({
  selector: 'app-drink-display',
  templateUrl: './drink-display.component.html',
  styleUrls: ['./drink-display.component.css'],
})
export class DrinkDisplayComponent implements OnInit {
  @Input() cocktails: Cocktail[];
  @Input() choice: string;
  showTable = false;
  icon = 'favorite_border';
  favourites: Cocktail[] = [];
  categories: string[] = ['Tutte'];
  alcoholicTypes: string[] = ['Tutti', 'Alcolici', 'Analcolici'];
  isFavourites: string[] = [
    'Tutti',
    'Preferiti',
    'Mai provati (o non piaciuti)',
  ];
  searchedByIngredient = SearchChoice.byIngredient;

  alcoholicTranslation = {
    Tutti: 'Tutti',
    Alcolici: 'Alcoholic',
    Analcolici: 'Non alcoholic',
  };
  selectedCategory: string = 'Tutte';
  alcoholicChoice: string = 'Tutti';
  selectedIsFavourite: string = 'Tutti';

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private remoteService: RemoteServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const cocktailId = params['cocktailId'];
      this.remoteService.getDrinkById(cocktailId).subscribe((res) => {
        this.cocktails = res != null ? res.drinks : [];
        this.showTable = cocktailId != null && cocktailId !== undefined;
      });
    });
  }

  ngOnChanges(changes: any) {
    if (changes.cocktails && changes.cocktails.currentValue) {
      if (changes.cocktails.currentValue.drinks != null) {
        this.showTable = true;
        this.cocktails = changes.cocktails.currentValue.drinks;
        this.categories = ['Tutte'].concat(
          changes.cocktails.currentValue.drinks
            .map((drink) => drink.strCategory)
            .filter((value, index, self) => self.indexOf(value) === index));
        this.cocktails.forEach((cocktail) => {
          if (this.favourites
              .map((favourite) => favourite.idDrink)
              .includes(cocktail.idDrink))
            cocktail.isFavourite = this.isFavourites[1];
        });
      } else {
        this.showTable = false;
        this.openSnackBar();
      }
    }
  }

  handleChoice(): boolean {
    if (this.choice == SearchChoice.byIngredient) {
      this.alcoholicChoice = 'Tutti';
      this.selectedCategory = 'Tutte';
      return true;
    }
    return false;
  }

  getIcon(cocktail: Cocktail) {
    if (
      this.favourites.filter(
        (favourite) => favourite.idDrink === cocktail.idDrink
      ).length > 0
    )
      return 'favorite';
    else return 'favorite_border';
  }

  getAlcoholiIcon(cocktail: Cocktail) {
    if (cocktail.strAlcoholic) {
      if (cocktail.strAlcoholic === 'Alcoholic') return 'local_bar';
      return 'no_drinks';
    }
    return '';
  }

  switchFavourite(event, cocktail: Cocktail) {
    if (event.innerHTML.trim() === 'favorite') {
      event.innerHTML = 'favorite_border';
      this.favourites = this.favourites.filter(
        (favourite) => favourite.idDrink !== cocktail.idDrink);
      let cocktailToRemove = this.cocktails.filter(
        (ck) => ck.idDrink === cocktail.idDrink)[0];
      cocktailToRemove.isFavourite = this.isFavourites[2];
    } else {
      if (this.favourites.filter((ck) => ck.idDrink === cocktail.idDrink).length === 0) {
        let cocktailToAdd = this.cocktails.filter(
          (ck) => ck.idDrink === cocktail.idDrink
        )[0];
        cocktailToAdd.isFavourite = this.isFavourites[1];
        this.favourites.push(cocktail);
        event.innerHTML = 'favorite';
      }
    }
  }

  filteredCocktails(): Cocktail[] {
    let translatedAlcoholicType =
      this.alcoholicTranslation[this.alcoholicChoice];
    if (this.cocktails == null || this.cocktails === undefined) return [];
    return this.cocktails
      .filter(
        (cocktail) =>
          this.selectedCategory === this.categories[0] ||
          cocktail.strCategory === this.selectedCategory
      )
      .filter(
        (cocktail) =>
          this.alcoholicChoice === this.alcoholicTypes[0] ||
          cocktail.strAlcoholic === translatedAlcoholicType
      )
      .filter((cocktail) => {
        if (this.selectedIsFavourite === this.isFavourites[1]) {
          return cocktail.isFavourite === this.isFavourites[1];
        }
        if (this.selectedIsFavourite === this.isFavourites[2]) {
          return (
            cocktail.isFavourite === this.isFavourites[2] ||
            cocktail.isFavourite === undefined
          );
        }
        return true;
      });
  }

  openQRCode(cocktail: Cocktail) {
    this.dialog.open(QRCodeDialogComponent, {
      data: {
        url: window.location.origin + '?cocktailId=' + cocktail.idDrink,
      },
    });
  }

  openDetails(cocktail: Cocktail) {
    this.dialog.open(CocktailDetailsComponent, {
      data: {
        cocktail: cocktail,
      },
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(NoResultAlertComponent, {
      duration: 5000,
    });
  }
}
