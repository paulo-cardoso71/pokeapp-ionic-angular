import { TestBed } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';
import { Storage } from '@ionic/storage-angular';
// Importamos o IonicStorageModule e o StorageMock para criar um ambiente de teste
import { IonicStorageModule } from '@ionic/storage-angular';

// Descrevemos a suíte de testes para o FavoriteService
describe('FavoriteService', () => {
  let service: FavoriteService;
  let storage: Storage;

  // Mock de um Pokémon para usar nos testes
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    image: 'url/para/imagem.png'
  };

  // beforeEach é executado antes de cada teste ('it')
  beforeEach(async () => {
    // Configuramos um módulo de teste que fornece nosso serviço e o Storage do Ionic
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()], // Importamos o módulo real para obter os providers
      providers: [FavoriteService]
    });

    // Injetamos as instâncias do serviço e do storage
    service = TestBed.inject(FavoriteService);
    storage = TestBed.inject(Storage);

    // O init do serviço é assíncrono, então esperamos ele completar
    await service.init();
    // Limpamos o storage antes de cada teste para garantir que um não interfira no outro
    await storage.clear();
    await service.loadFavorites(); // Recarregamos a lista vazia
  });

  // Teste 1: Verifica se o serviço foi criado corretamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Teste 2: Verifica se a função de favoritar está funcionando
  it('should add a pokemon to favorites when toggled for the first time', async () => {
    // Ação: chama o toggleFavorite
    const result = await service.toggleFavorite(mockPokemon);

    // Verificação:
    expect(result).toBe(true); // Esperamos que o resultado seja 'true' (agora é favorito)
    expect(service.isFavorite(1)).toBe(true); // Esperamos que isFavorite confirme
    expect(service.getFavorites().length).toBe(1); // Esperamos que a lista tenha 1 item
    expect(service.getFavorites()[0].name).toBe('bulbasaur'); // E que o item seja o correto
  });

  // Teste 3: Verifica se a função de desfavoritar está funcionando
  it('should remove a pokemon from favorites when toggled for the second time', async () => {
    // Preparação: primeiro, adicionamos o pokémon
    await service.toggleFavorite(mockPokemon);
    expect(service.isFavorite(1)).toBe(true); // Garante que foi adicionado

    // Ação: chamamos o toggleFavorite de novo no mesmo pokémon
    const result = await service.toggleFavorite(mockPokemon);

    // Verificação:
    expect(result).toBe(false); // Esperamos que o resultado seja 'false' (agora não é mais favorito)
    expect(service.isFavorite(1)).toBe(false); // Esperamos que isFavorite confirme a remoção
    expect(service.getFavorites().length).toBe(0); // Esperamos que a lista esteja vazia
  });
});