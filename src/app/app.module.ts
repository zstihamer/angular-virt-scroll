import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GridModule} from '@progress/kendo-angular-grid';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {RoutesModule} from './routes/routes.module';
import {ServicesModule} from './services/services.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutesModule,
    ServicesModule.forRoot(),
    InfiniteScrollModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ComponentsModule,
    GridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
