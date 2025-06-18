import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokemonListItem } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.page.html',
  styleUrls: ['./pokemon-favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class PokemonFavoritesPage {
  favorites: PokemonListItem[] = [];

  constructor(private favoriteService: FavoriteService) { }

  // ionViewWillEnter garante que a lista é atualizada toda vez que o usuário entra na aba
  ionViewWillEnter() {
    this.favorites = this.favoriteService.getFavorites();
  }
}