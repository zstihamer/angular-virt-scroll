import {Location} from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {VirtualScroller} from 'primeng';
import {debounceTime} from 'rxjs/operators';
import {PageState} from '../../model';
import {ParagraphService, toRestFilter, urlToState} from '../../services';

@Component({
  selector: 'app-prime-scroll',
  templateUrl: './prime-scroll.component.html',
  styleUrls: ['./prime-scroll.component.scss']
})
export class PrimeScrollComponent implements OnInit, AfterViewInit {
  public gridView: GridDataResult = {data: [], total: 0};
  public state: PageState = new PageState({skip: 0, take: 50});
  @ViewChild(VirtualScroller, {static: false}) scroller: VirtualScroller;


  constructor(private service: ParagraphService,
              private router: Router,
              private location: Location) {

  }

  ngOnInit() {
    this.setState();
    this.loadData(true);
  }

  scroll(event) {
    // this.state.take = event.rows;
    this.state.skip = event.first;
    this.loadData();
  }


  public ngAfterViewInit(): void {
    this.scroller.onLazyLoad.pipe(debounceTime((500))).subscribe((e) => this.scroll(e));
  }

  private loadData(isInit = false): void {
    this.service.getParagraphs(this.state).toPromise()
      .then(res => {
        this.gridView = {
          data: res.data,
          total: res.total
        };
        if (!isInit) {
          this.stateToUrl();
        }
      }).catch(e => {
      console.error(e);
      // this.state.skip = 0;
      // this.loadData();
    });
  }

  private setState() {
    if (this.router.url.includes('?')) {
      const url = this.router.url.split('?')[1];
      if (url) {
        this.state = urlToState(url);
      }
    }
  }

  private stateToUrl() {
    this.location.replaceState(`${this.router.url.split('?')[0]}${toRestFilter(this.state)}`);
  }

}
