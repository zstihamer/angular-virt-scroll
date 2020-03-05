import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {PageState} from '../../model';
import {ParagraphService, toRestFilter, urlToState} from '../../services';

@Component({
  selector: 'app-prime-scroll',
  templateUrl: './prime-scroll.component.html',
  styleUrls: ['./prime-scroll.component.scss']
})
export class PrimeScrollComponent implements OnInit {
  public gridView: GridDataResult = {data: [], total: 0};
  public state: PageState = new PageState({skip: 0, take: 50});

  constructor(private service: ParagraphService,
              private router: Router,
              private location: Location) {

  }

  ngOnInit() {
    this.setState();
    this.loadData();
  }

  scroll(event) {
    this.state.take = event.rows;
    this.state.skip = event.first;
    this.loadData();
  }

  private loadData(): void {
    this.service.getParagraphs(this.state).toPromise()
      .then(res => {
        this.gridView = {
          data: res.data,
          total: res.total
        };
        this.stateToUrl();
      }).catch(e => {
      console.log(e);
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
