import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { APIService } from './shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  imports: [
    HttpClientModule()
  ],
  providers: [
    provideRouter(routes),
    APIService

  ]

};
