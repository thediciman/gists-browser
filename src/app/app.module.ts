import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GistsComponent} from './gists/gists.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {ViewFileContentDialogComponent} from './gists/view-file-content-dialog/view-file-content-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ViewAvailableFilesDialogComponent} from './gists/view-available-files-dialog/view-available-files-dialog.component';
import {ViewForksDialogComponent} from './gists/view-forks-dialog/view-forks-dialog.component';
import { EasterEggDialogComponent } from './gists/easter-egg-dialog/easter-egg-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GistsComponent,
    ViewFileContentDialogComponent,
    ViewAvailableFilesDialogComponent,
    ViewForksDialogComponent,
    EasterEggDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
