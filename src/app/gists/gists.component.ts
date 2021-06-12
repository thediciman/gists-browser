import {Component, OnInit, ViewChild} from '@angular/core';
import {GistsService} from './gists.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gists',
  templateUrl: './gists.component.html',
  styleUrls: ['./gists.component.css']
})
export class GistsComponent implements OnInit {

  displayedColumns: string[] = ['description', 'creationDate'];

  itemsPerPageOptions: number[] = [10, 5];

  dataSource: MatTableDataSource<any> = null;

  itemsPerPage = this.itemsPerPageOptions[0];

  currentPage = 1;

  username: string = null;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private gistsService: GistsService) {
  }

  ngOnInit(): void {
  }

  updateDataSource(items: any[]): void {
    console.log(items);
    this.dataSource = new MatTableDataSource<any>(items);
    this.dataSource.sort = this.sort;
  }

  getFirstPageOfGistsForUsername(): void {
    if (this.username === null || this.username.length === 0) {
      swal.fire(
        {
          title: 'The username should not be empty.',
          icon: 'error'
        }
      ).then();
      return;
    }

    this.currentPage = 1;

    this.gistsService
      .getGistsForUsername(this.username, this.itemsPerPage, this.currentPage)
      .subscribe(
        gists => {
          swal.fire(
            {
              title: 'The GISTs were fetched successfully!',
              text: '🙂',
              icon: 'success'
            }
          ).then();
          this.updateDataSource(gists);
        },
        error => {
          swal.fire(
            {
              title: 'The GISTs could not be fetched! 🙁',
              text: `Error status ${error.status}: ${error.error.message}`,
              icon: 'error'
            }
          ).then();
        }
      );
  }

  getGistsForUsernameFromCurrentPage(): void {
    if (this.username === null || this.username.length === 0) {
      swal.fire(
        {
          title: 'The username should not be empty.',
          icon: 'error'
        }
      ).then();
      return;
    }

    this.gistsService
      .getGistsForUsername(this.username, this.itemsPerPage, this.currentPage)
      .subscribe(
        gists => {
          this.updateDataSource(gists);
        },
        error => {
          swal.fire(
            {
              title: 'The GISTs could not be fetched! 🙁',
              text: `Error status ${error.status}: ${error.error.message}`,
              icon: 'error'
            }
          ).then();
        }
      );
  }

  formatDescription(description: string): string {
    return description.length === 0 ? 'No description available.' : description;
  }

  formatDate(date: string): string {
    return new Date(date).toDateString();
  }

  updateItemsPerPageAndFetchGists(event): void {
    this.itemsPerPage = event;
    this.getGistsForUsernameFromCurrentPage();
  }

  getNextPage(): void {
    this.currentPage++;
    this.getGistsForUsernameFromCurrentPage();
  }

  getPreviousPage(): void {
    this.currentPage--;
    this.getGistsForUsernameFromCurrentPage();
  }

  usernameIsValid(): boolean {
    return this.username !== null && this.username.length > 0;
  }

  moreItemsExist(): boolean {
    return this.dataSource !== null && this.dataSource.filteredData.length === this.itemsPerPage;
  }

  alreadyFetchedData(): boolean {
    return this.dataSource !== null;
  }

}