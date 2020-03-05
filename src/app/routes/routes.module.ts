import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GridModule, SharedModule} from '@progress/kendo-angular-grid';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {VirtualScrollerModule} from 'primeng';
import {ComponentsModule} from '../components/components.module';
import {GridReaderComponent} from './grid-reader/grid-reader.component';
import {HomeComponent} from './home/home.component';
import {PrimeScrollComponent} from './prime-scroll/prime-scroll.component';
import {ReaderComponent} from './reader/reader.component';

@NgModule({
  declarations: [ReaderComponent, HomeComponent, GridReaderComponent, PrimeScrollComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    GridModule,
    SharedModule,
    VirtualScrollerModule
  ]
})
export class RoutesModule {
}
