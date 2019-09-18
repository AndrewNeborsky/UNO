import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import { MarkdownModule } from 'ngx-markdown';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { InerseptorService } from './services/interseptor.service';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { CreaterComponent } from './company/creater/creater.component';
import { CompanyComponent } from './company/company.component';
import { ProfileChangeComponent } from './profile/profile-change/profile-change.component';
import { PledgeComponent } from './company/pledge/pledge.component';
import { CompanyFilterPipe } from './pipes/company-filter.pipe';
import { BonuceComponent } from './company/creater/bonuce-creater/bonuce-creater.component';
import { NewsCreaterComponent } from './company/creater/news-creater/news-creater.component';
import { NewsComponent } from './company/news/news.component';
import { CommentsComponent } from './company/comments/comments.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { SearchComponent } from './search/search.component';
import { NewsFilterPipe } from './pipes/news-filter.pipe';
import { HistoryFilterPipe } from './pipes/history-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    CreaterComponent,
    CompanyComponent,
    ProfileChangeComponent,
    PledgeComponent,
    CompanyFilterPipe,
    BonuceComponent,
    NewsCreaterComponent,
    NewsComponent,
    CommentsComponent,
    AdminPanelComponent,
    UsersFilterPipe,
    SearchComponent,
    NewsFilterPipe,
    HistoryFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSortModule,
    MarkdownModule.forRoot(),
    FileUploadModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard, CookieService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InerseptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
