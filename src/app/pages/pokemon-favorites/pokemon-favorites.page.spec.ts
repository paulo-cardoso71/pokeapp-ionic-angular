import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFavoritesPage } from './pokemon-favorites.page';
// Importe o módulo de storage
import { IonicStorageModule } from '@ionic/storage-angular';

describe('PokemonFavoritesPage', () => {
  let component: PokemonFavoritesPage;
  let fixture: ComponentFixture<PokemonFavoritesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Adicione o módulo de storage aqui
      imports: [IonicStorageModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});