import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GistsService} from '../gists.service';

@Component({
  selector: 'app-view-file-content-dialog',
  templateUrl: './view-file-content-dialog.component.html',
  styleUrls: ['./view-file-content-dialog.component.css']
})
export class ViewFileContentDialogComponent {

  fileContent: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public file: any,
    private gistsService: GistsService
  ) {
    this.gistsService
      .getFileContent(file.raw_url)
      .subscribe(
        content => {
          this.fileContent = content;
          console.log(content);
        }
      );
  }

}
