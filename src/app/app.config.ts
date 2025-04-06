import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    {
      provide: APOLLO_OPTIONS,
      useFactory() {
        const httpLink = inject(HttpLink);
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'http://localhost:4000/graphql' })
        };
      }
    },
    Apollo // Explicitly provide Apollo service
  ]
};