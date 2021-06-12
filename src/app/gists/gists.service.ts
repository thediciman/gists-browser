import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistsService {

  constructor(private httpClient: HttpClient) {
  }

  GET_GISTS_API_ENDPOINT = (
    username: string,
    itemsPerPage: number,
    currentPage: number
  ) => `https://api.github.com/users/${username}/gists?per_page=${itemsPerPage}&page=${currentPage}`;

  getGistsForUsername(username: any, itemsPerPage: number, currentPage: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic'
      })
    };

    return this.httpClient.get(this.GET_GISTS_API_ENDPOINT(username, itemsPerPage, currentPage), httpOptions);
  }

}
