import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsPage } from './pokemon-details.page';
// Importe o ActivatedRoute para criar o mock
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Usado no mock
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('PokemonDetailsPage', () => {
  let component: PokemonDetailsPage;
  let fixture: ComponentFixture<PokemonDetailsPage>;

  // Criamos um "dublê" para o ActivatedRoute
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1', // Simula que sempre pegamos o ID '1'
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot()],
      providers: [
        // Dizemos ao Angular: "Quando alguém pedir o ActivatedRoute, entregue nosso dublê"
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});