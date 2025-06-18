import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Carrega o "sub-mapa" de rotas que está no arquivo das tabs
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    // A ROTA DE DETALHES FICA AQUI, com o parâmetro :id
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/pokemon-details/pokemon-details.page').then((m) => m.PokemonDetailsPage),
  },
];