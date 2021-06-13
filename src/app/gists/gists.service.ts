import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistsService {

  OAUTH_TOKEN_ENCODED = 'Z2hwXzdZMmh4dmN3NDJEQnZaekp1RDVBZG1acU5URXAycDF0dkhUUA==';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `token ${atob(this.OAUTH_TOKEN_ENCODED)}`
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  GET_GISTS_API_ENDPOINT = (
    username: string,
    itemsPerPage: number,
    currentPage: number
  ) => `https://api.github.com/users/${username}/gists?per_page=${itemsPerPage}&page=${currentPage}`;

  getGistsForUsername(username: string, itemsPerPage: number, currentPage: number): Observable<any> {
    return this.httpClient.get(this.GET_GISTS_API_ENDPOINT(username, itemsPerPage, currentPage), this.httpOptions);
  }

  getForksForGist(forksUrl: string): Observable<any> {
    return this.httpClient.get(forksUrl + '?per_page=100', this.httpOptions);
  }

  getFileContent(fileUrl: string) {
    return this.httpClient.get(fileUrl, {responseType: 'text'});
  }

}
