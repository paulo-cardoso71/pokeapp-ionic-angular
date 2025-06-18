import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { PokemonListItem } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController; // Controlador chamadas HTTP

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    // Injetamos o serviço e o controlador
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Teste 1: Garante que o serviço é criado
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Teste 2: Testa a lógica real do método getPokemonList
  it('should fetch pokemon list and process the data correctly', () => {
    // 1. Preparamos uma resposta falsa da API
    const dummyResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    // 2. Chamamos o método do nosso serviço
    service.getPokemonList(0, 1).subscribe((pokemons: PokemonListItem[]) => {
      // 5. Quando a resposta chegar, verificamos se nosso serviço processou os dados corretamente
      expect(pokemons.length).toBe(1);
      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[0].id).toBe(1);
      expect(pokemons[0].image).toContain('/1.png'); // Verifica se a URL da imagem foi montada
    });

    // 3. Comunica o controlador
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1');
    // Verificamos se o método da requisição foi um GET
    expect(req.request.method).toBe('GET');

    // 4. Responde a chamada!
    req.flush(dummyResponse);
  });
});