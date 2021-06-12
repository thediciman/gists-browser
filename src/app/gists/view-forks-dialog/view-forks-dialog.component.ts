import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-forks-dialog',
  templateUrl: './view-forks-dialog.component.html',
  styleUrls: ['./view-forks-dialog.component.css']
})
export class ViewForksDialogComponent {

  FORKS_COUNT_LIMIT = 3;

  constructor(
    @Inject(MAT_DIALOG_DATA) public forks: any[],
  ) {
    for (const fork of this.forks) {
      fork.creation_date = new Date(fork.created_at);
    }
    this.forks.sort((a, b) => b.creation_date - a.creation_date);
    this.forks = this.forks.slice(0, this.FORKS_COUNT_LIMIT);
  }

  navigateToFork(fork: any) {
    window.open(fork.html_url, '_blank');
  }

}
