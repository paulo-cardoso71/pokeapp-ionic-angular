import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PokemonListItem } from '../models/pokemon.model';

const FAVORITES_KEY = 'my-favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _storage: Storage | null = null;
  // Cache local para acesso rápido, evita múltiplas leituras do storage.
  private _favorites: PokemonListItem[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  // A inicialização do Storage é assíncrona.
  async init() {
    this._storage = await this.storage.create();
    await this.loadFavorites();
  }

  // Carrega os favoritos do storage para a memória do serviço.
  async loadFavorites() {
    const favorites = await this._storage?.get(FAVORITES_KEY);
    this._favorites = favorites || [];
  }

  /**
   * Retorna a lista de favoritos do cache local.
   */
  getFavorites(): PokemonListItem[] {
    return this._favorites;
  }

  /**
   * Verifica se um Pokémon é favorito (baseado no cache local).
   */
  isFavorite(pokemonId: number): boolean {
    return this._favorites.some(p => p.id === pokemonId);
  }

  /**
   * Adiciona ou remove um Pokémon da lista de favoritos.
   * Retorna o novo status de favorito (true se virou favorito, false se foi removido).
   */
  async toggleFavorite(pokemon: PokemonListItem): Promise<boolean> {
    const isFav = this.isFavorite(pokemon.id);

    if (isFav) {
      // Remove da lista de favoritos
      this._favorites = this._favorites.filter(p => p.id !== pokemon.id);
    } else {
      // Adiciona na lista de favoritos
      this._favorites = [...this._favorites, pokemon];
    }

    // Salva a lista atualizada no storage e retorna o novo status.
    await this._storage?.set(FAVORITES_KEY, this._favorites);
    return !isFav;
  }
}