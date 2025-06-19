import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

// Não precisamos do addIcons aqui, pois já fizemos isso de forma global no app.component.ts

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  // AQUI ESTÁ A SOLUÇÃO FINAL, A LINHA QUE FALTAVA:
  standalone: true,
  // A sua lista de imports já está correta e será usada agora:
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // A lógica de ícones já foi centralizada no app.component.ts
  }
}