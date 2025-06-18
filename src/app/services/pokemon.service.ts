import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonListResponse, PokemonDetails, PokemonListItem } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 25): Observable<PokemonListItem[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(
        map(response => {
          const pokemonList = response.results.map(pokemon => {
            // A CORREÇÃO ESTÁ AQUI: Nós verificamos se a URL existe
            if (pokemon.url) {
              const id = pokemon.url.split('/').filter(Boolean).pop();
              if (id) {
                return {
                  ...pokemon,
                  id: +id,
                  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                };
              }
            }
            // Se não houver URL, retornamos null
            return null;
          });
          // Filtramos quaisquer resultados nulos e garantimos o tipo correto
          return pokemonList.filter(p => p !== null) as PokemonListItem[];
        })
      );
  }

  getPokemonDetails(idOrName: string | number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${idOrName}`);
  }
}