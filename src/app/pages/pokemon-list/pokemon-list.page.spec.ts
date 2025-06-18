// Em: src/app/pages/pokemon-list/pokemon-list.page.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListPage } from './pokemon-list.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// 1. IMPORTE O MÓDULO DE STORAGE AQUI
import { IonicStorageModule } from '@ionic/storage-angular';

describe('PokemonListPage', () => {
  let component: PokemonListPage;
  let fixture: ComponentFixture<PokemonListPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // 2. ADICIONE O MÓDULO FALTANTE AO ARRAY DE IMPORTS
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot()],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});