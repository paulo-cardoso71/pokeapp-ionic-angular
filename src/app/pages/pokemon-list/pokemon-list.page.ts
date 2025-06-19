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
  pokemonsParaExibir: PokemonListItem[] = []; // Declaração da variável que faltava
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
        this.pokemonsParaExibir = this.pokemons;
        this.offset += 25;

        // O 'complete' só precisa ser chamado uma vez
        if (event) {
          event.target.complete();
        }

        // Correção para o erro do TypeScript
        if (newPokemons.length < 25) {
          if (event) {
            event.target.disabled = true;
          }
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao carregar Pokémons:', error);
      }
    );
  }

  toggleFavorite(pokemon: PokemonListItem, event: MouseEvent) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(pokemon);
  }

  // Declaração do método que faltava
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.pokemonsParaExibir = this.pokemons.filter((p) => {
      return p.name.toLowerCase().indexOf(query) > -1;
    });
  }
}