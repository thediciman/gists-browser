import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ViewFileContentDialogComponent} from '../view-file-content-dialog/view-file-content-dialog.component';

@Component({
  selector: 'app-view-available-files-dialog',
  templateUrl: './view-available-files-dialog.component.html',
  styleUrls: ['./view-available-files-dialog.component.css']
})
export class ViewAvailableFilesDialogComponent {

  filesList: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public files: any,
    private dialog: MatDialog
  ) {
    this.filesList = [];
    for (const filePropertyName in files) {
      console.log(files[filePropertyName]);
      this.filesList.push(files[filePropertyName]);
    }
  }

  displayFileContent(file: any) {
    this.dialog.open(ViewFileContentDialogComponent, {
      data: file,
      width: '90%',
      height: '80%'
    });
  }

}
