import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonListItem } from 'src/app/models/pokemon.model';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class PokemonListPage implements OnInit {
  pokemons: PokemonListItem[] = [];
  private offset = 0;
  isLoading = true;

  constructor(
    private pokemonService: PokemonService,
    public favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: InfiniteScrollCustomEvent) {
    this.pokemonService.getPokemonList(this.offset).subscribe(
      (newPokemons) => {
        this.isLoading = false;
        this.pokemons = [...this.pokemons, ...newPokemons];
        this.offset += 25;

        // Se o evento do scroll infinito existir, complete-o
        event?.target.complete();

        // Opcional: desabilitar o scroll se não houver mais pokémons a carregar
        if (newPokemons.length < 25) {
          event?.target.complete();
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao carregar Pokémons:', error);
      }
    );
  }

  toggleFavorite(pokemon: PokemonListItem, event: MouseEvent) {
    event.stopPropagation(); // Impede que o clique no botão navegue para os detalhes
    this.favoriteService.toggleFavorite(pokemon);
  }
}