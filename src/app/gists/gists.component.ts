import {Component, OnInit, ViewChild} from '@angular/core';
import {GistsService} from './gists.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {ViewAvailableFilesDialogComponent} from './view-available-files-dialog/view-available-files-dialog.component';
import {ViewForksDialogComponent} from './view-forks-dialog/view-forks-dialog.component';

@Component({
  selector: 'app-gists',
  templateUrl: './gists.component.html',
  styleUrls: ['./gists.component.css']
})
export class GistsComponent implements OnInit {

  displayedColumns: string[] = ['description', 'filesTags', 'creationDate', 'viewFilesButton', 'viewForksButton'];

  itemsPerPageOptions: number[] = [10, 5];

  dataSource: MatTableDataSource<any> = null;

  itemsPerPage = this.itemsPerPageOptions[0];

  currentPage = 1;

  username = 'afeld';

  @ViewChild(MatSort) sort: MatSort;

  constructor(private gistsService: GistsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getFirstPageOfGistsForUsername();
  }

  preprocessGists(gists: any[]): void {
    this.processFilesToTagsForGists(gists);
    this.fetchForksForGists(gists);
  }

  updateDataSource(gists: any[]): void {
    this.preprocessGists(gists);
    console.log(gists);

    this.dataSource = new MatTableDataSource<any>(gists);
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
    return description === null || description.length === 0 ? 'No description available.' : description;
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

  transformFilesObjectToFilenamesList(gist: any): Set<any> {
    const filesLanguagesList = [];

    for (const filePropertyName in gist.files) {
      const file = gist.files[filePropertyName];
      if (file.language) {
        filesLanguagesList.push(file.language);
      }
    }

    return new Set(filesLanguagesList);
  }

  displayGist(gist: any): void {
    window.open(gist.html_url, '_blank');
  }

  viewFilesForGist(gist: any): void {
    this.dialog.open(ViewAvailableFilesDialogComponent, {
      data: gist.files,
      width: '50%'
    });
  }

  fetchForksForGists(gists: any[]) {
    for (const gist of gists) {
      this.gistsService
        .getForksForGist(gist.forks_url)
        .subscribe(
          forks => {
            gist.forks = forks;
          }
        );
    }
  }

  viewForksForGist(gist: any): void {
    this.dialog.open(ViewForksDialogComponent, {
      data: gist.forks,
      width: '50%'
    });
  }

  private processFilesToTagsForGists(gists: any[]) {
    for (const gist of gists) {
      gist.tags = this.transformFilesObjectToFilenamesList(gist);
    }
  }

}
