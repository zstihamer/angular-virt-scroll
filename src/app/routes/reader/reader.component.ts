import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {DataResult} from '../../model/data-result';
import {PAGE_SIZE, PageState} from '../../model/page-state';
import {ParagraphService, toRestFilter, urlToState} from '../../services/paragraph.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public state: PageState = new PageState();
  public pageData: DataResult = new DataResult();
  private noScroll = true;
  private hasMoreDown: boolean;
  private scroll = 'down';

  constructor(private service: ParagraphService,
              private router: Router,
              private location: Location,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.setState();
    this.getData(true);
  }

  public onUpScroll() {
    if (this.noScroll && this.state.skip > 0) {
      this.scroll = 'up';
      this.state.up();
      this.getData();
    }
  }

  public onDownScroll() {
    if (this.noScroll && this.hasMoreDown) {
      this.scroll = 'down';
      this.state.down(this.pageData.total, this.pageData.data.length);
      this.getData();
    }
  }

  private getData(isInit = false) {
    this.spinner.show();
    this.noScroll = false;

    this.service.getParagraphs(this.state)
      .toPromise()
      .then(res => {
        this.dataAppend(res);
        // this.dataAdd(res);
        this.hasMoreDown = (this.state.skip + this.state.take) < res.total;
        this.pageData.total = res.total;
        this.spinner.hide();
        this.noScroll = true;
        if (!isInit) {
          this.stateToUrl();
        }
      });
  }

  private dataAppend(res: DataResult) {
    const size = this.pageData.data.length + res.data.length;
    if (this.scroll === 'down') {
      if (size > PAGE_SIZE) {
        this.pageData.data = this.pageData.data.slice(this.state.take, this.pageData.data.length - this.state.take).concat(res.data);
      } else {
        this.pageData.data = this.pageData.data.concat(res.data);
      }
    } else {
      if (size > PAGE_SIZE) {
        this.pageData.data = res.data.concat(this.pageData.data.slice(0, this.pageData.data.length - this.state.take));
      } else {
        this.pageData.data = res.data.concat(this.pageData.data);
      }
    }
  }

  private dataAdd(res: DataResult) {
    this.pageData.data = this.pageData.data.concat(res.data);
  }

  private stateToUrl() {
    this.location.replaceState(`${this.router.url.split('?')[0]}${toRestFilter(this.state)}`);
  }

  private setState() {
    if (this.router.url.includes('?')) {
      const url = this.router.url.split('?')[1];
      if (url) {
        this.state = urlToState(url);
      }
    }
  }

}
