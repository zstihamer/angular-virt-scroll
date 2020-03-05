import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {ParagraphComponent} from './paragraph/paragraph.component';
import {SanitizeHtmlPipe} from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [ParagraphComponent, SanitizeHtmlPipe, NavigationComponent],
  exports: [
    ParagraphComponent, SanitizeHtmlPipe, NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule {
}
