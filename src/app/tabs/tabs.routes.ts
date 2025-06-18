import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('../pages/pokemon-list/pokemon-list.page').then((m) => m.PokemonListPage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('../pages/pokemon-favorites/pokemon-favorites.page').then((m) => m.PokemonFavoritesPage),
      },
      {
        // Rota vazia dentro de 'tabs' redireciona para a lista
        path: '',
        redirectTo: '/tabs/list',
        pathMatch: 'full',
      },
    ],
  },
  {
    // Rota vazia na raiz do app redireciona para a lista
    path: '',
    redirectTo: '/tabs/list',
    pathMatch: 'full',
  },
];