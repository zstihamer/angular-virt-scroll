import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GridModule} from '@progress/kendo-angular-grid';
import {NotificationModule} from '@progress/kendo-angular-notification';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {RoutesModule} from './routes/routes.module';
import {HttpErrorInterceptor} from './services/interceptors/http-error.interceptor';
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
    VirtualScrollerModule,
    NotificationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
