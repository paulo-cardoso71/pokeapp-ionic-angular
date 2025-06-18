import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/models/pokemon.model';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PokemonDetailsPage implements OnInit {
  pokemon: PokemonDetails | null = null;
  isLoading = true;
  isFavorite = false; // 2. Propriedade para controlar o ícone

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService // 3. INJETE O SERVIÇO
  ) { }

  async ngOnInit() { // 4. Transforme ngOnInit em async para usar await
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      // Garante que os favoritos foram carregados antes de verificar
      await this.favoriteService.loadFavorites();

      this.pokemonService.getPokemonDetails(pokemonId).subscribe(
        (details) => {
          this.pokemon = details;
          this.isLoading = false;
          // 5. VERIFIQUE SE O POKÉMON É FAVORITO
          this.isFavorite = this.favoriteService.isFavorite(this.pokemon.id);
        }
      );
    }
  }

  // 6. MÉTODO PARA O BOTÃO
  async toggleFavorite() {
    if (!this.pokemon) return;

    const pokemonListItem = {
      id: this.pokemon.id,
      name: this.pokemon.name,
      image: this.pokemon.sprites.other['official-artwork'].front_default
    };

    this.isFavorite = await this.favoriteService.toggleFavorite(pokemonListItem);
  }
}