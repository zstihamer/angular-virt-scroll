import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GridModule, SharedModule} from '@progress/kendo-angular-grid';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ComponentsModule} from '../components/components.module';
import {GridReaderComponent} from './grid-reader/grid-reader.component';
import {HomeComponent} from './home/home.component';
import {ReaderComponent} from './reader/reader.component';

@NgModule({
  declarations: [ReaderComponent, HomeComponent, GridReaderComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    GridModule,
    SharedModule
  ]
})
export class RoutesModule {
}
