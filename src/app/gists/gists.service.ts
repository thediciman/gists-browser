import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistsService {

  OAUTH_TOKEN = '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';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `token ${this.OAUTH_TOKEN}`
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  GET_GISTS_API_ENDPOINT = (
    username: string,
    itemsPerPage: number,
    currentPage: number
  ) => `https://api.github.com/users/${username}/gists?per_page=${itemsPerPage}&page=${currentPage}`;

  getGistsForUsername(username: any, itemsPerPage: number, currentPage: number): Observable<any> {
    return this.httpClient.get(this.GET_GISTS_API_ENDPOINT(username, itemsPerPage, currentPage), this.httpOptions);
  }

  getForksForGist(forksUrl: string): Observable<any> {
    return this.httpClient.get(forksUrl + '?per_page=100', this.httpOptions);
  }

  getFileContent(fileUrl: string) {
    return this.httpClient.get(fileUrl, {responseType: 'text'});
  }

}
