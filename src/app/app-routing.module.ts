import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {GridReaderComponent} from './routes/grid-reader/grid-reader.component';
import {PrimeScrollComponent} from './routes/prime-scroll/prime-scroll.component';
import {ReaderComponent} from './routes/reader/reader.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'kendo',
    // component: HomeComponent,
    pathMatch: 'full',

  },
  {
    path: 'read',
    component: ReaderComponent,
    pathMatch: 'full',

  },
  {
    path: 'kendo',
    component: GridReaderComponent,
    pathMatch: 'full',

  },
  {
    path: 'prime',
    component: PrimeScrollComponent,
    pathMatch: 'full',

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      APP_ROUTES,
      {enableTracing: !environment.production}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
