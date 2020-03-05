import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {DataResult} from '../model/data-result';
import {PageState} from '../model/page-state';

@Injectable({
  providedIn: 'root'
})
export class ParagraphService {

  protected BASE_URL = environment.serverBaseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Service to get data from server
   * @param state
   */
  public getParagraphs(state = new PageState()): Observable<DataResult> {
    const queryString = toRestFilter(state);
    return this.http
      .get(`${this.BASE_URL}/paragraphs${queryString}`, {
        observe: 'response',
        responseType: 'json'
      })
      .pipe(
        map((response: HttpResponse<any>) => (
          new DataResult({
            data: response.body.data,
            total: response.body.total,
          })),
        ));
  }
}

/**
 * PageState to rest api query string
 * @param state
 */
export function toRestFilter(state = new PageState()): string {
  const arrayStr: string[] = [];
  const skip = state ? (state.skip) : 0;
  arrayStr.push(`_s=${skip}`);
  if (state && state.take) {
    const take = state.take;
    arrayStr.push(`_t=${take}`);
  }

  let returnStr = '';
  if (arrayStr.length > 0) {
    returnStr = '?' + arrayStr.join('&');
  }
  return returnStr;
}

/**
 *  rest query string transform to PageState
 *  @param url
 * @return State
 */
export function urlToState(url: string): PageState {
  const state: PageState = new PageState();

  if (url) {
    const stateA: string[] = url.split('&');
    const take = stateA.find(s => s.startsWith('_t='));
    if (take) {
      const takeA = decodeURIComponent(take).split('_t=');
      state.take = takeA.length > 0 ? Number(takeA.pop()) : state.take;
    }

    const skip = stateA.find(s => s.startsWith('_s='));
    if (skip) {
      const skipA = decodeURIComponent(skip).split('_s=');
      state.skip = skipA.length > 0 ? Number(skipA.pop()) : state.skip;
    }

  }
  return state;
}

