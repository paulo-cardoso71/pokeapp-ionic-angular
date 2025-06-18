import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';

// 1. IMPORTE O provideHttpClient
import { provideHttpClient } from '@angular/common/http';
// 2. IMPORTE O IonicStorageModule (vamos usar um helper)
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // 3. ADICIONE OS PROVEDORES AQUI
    provideHttpClient(), // Substitui o HttpClientModule
    importProvidersFrom(IonicStorageModule.forRoot()), // Substitui a importação do IonicStorageModule
  ],
});