import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import 'hammerjs';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { routing } from './app.routing';

import { LoginService } from './services/login.service';
import { AddItemService } from './services/add-item.service';
import { UploadImageService } from './services/upload-image.service';
import { GetItemListService } from './services/get-item-list.service';
import { GetItemService } from './services/get-item.service';
import { EditItemService } from './services/edit-item.service';
import { DeleteItemService } from './services/delete-item.service';
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { DeleteItemDialogComponent } from './components/delete-item-dialog/delete-item-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginPageComponent,
    UserPortalComponent,
    AddItemComponent,
    ViewItemsComponent,
    ViewItemComponent,
    EditItemComponent,
    DeleteItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    LoginService,
    AddItemService,
    EditItemService,
    UploadImageService,
    GetItemListService,
    GetItemService,
    DeleteItemService,
    HttpClientModule,
    HttpClient,
  ],
  entryComponents: [
    DeleteItemDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
