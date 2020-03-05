import {Location} from '@angular/common';
import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GridComponent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {debounceTime} from 'rxjs/operators';
import {PageState} from '../../model';
import {ParagraphService, toRestFilter, urlToState} from '../../services';

@Component({
  selector: 'app-grid-reader',
  templateUrl: './grid-reader.component.html',
  styleUrls: ['./grid-reader.component.scss']
})
export class GridReaderComponent implements OnInit, AfterViewInit {

  public gridView: GridDataResult = {data: [], total: 0};
  public data: any[];
  public state: PageState = new PageState({skip: 0, take: 50});
  public gridHeight = 500;
  public loading: boolean;
  @ViewChild(GridComponent, {static: false}) grid: GridComponent;

  constructor(private service: ParagraphService,
              private router: Router,
              private location: Location) {
    this.gridHeight = window.innerHeight - 220;
    this.setState();
    this.loadData(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.gridHeight = window.innerHeight - 220;
  }

  public pageChange(event: PageChangeEvent): void {
    this.state.skip = event.skip;
    this.loading = true;
    this.loadData();
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.grid.pageChange.pipe(debounceTime((200))).subscribe((e) => this.pageChange(e));
  }

  private loadData(isInit = false): void {
    this.service.getParagraphs(this.state).toPromise()
      .then(res => {
          this.gridView = {
            data: res.data,
            total: res.total
          };
          this.loading = false;
          if (!isInit) {
            this.stateToUrl();
          }
        },
        (error) => {
          this.state.skip = 0;
          this.loadData();
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
