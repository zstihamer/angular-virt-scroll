import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {ParagraphComponent} from './paragraph/paragraph.component';
import {DecodeHtmlPipe} from './pipes/decode-html.pipe';
import {SanitizeHtmlPipe} from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [ParagraphComponent, SanitizeHtmlPipe, NavigationComponent, DecodeHtmlPipe],
  exports: [
    ParagraphComponent, SanitizeHtmlPipe, NavigationComponent, DecodeHtmlPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule {
}
