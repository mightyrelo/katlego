import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MListComponent } from './m-list/m-list.component';
import { AppendSPipe } from './append-s.pipe';
import { FrameworkComponent } from './framework/framework.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MPageComponent } from './m-page/m-page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { MDetailsPageComponent } from './m-details-page/m-details-page.component';
import { MDetailsContentComponent } from './m-details-content/m-details-content.component';
import { MostRecentFirstPipe } from './most-recent-first.pipe';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PersonalsPageComponent } from './personals-page/personals-page.component';
import { PersonalsListComponent } from './personals-list/personals-list.component';
import { PersonalsDetailsPageComponent } from './personals-details-page/personals-details-page.component';
import { PersonalsDetailsContentComponent } from './personals-details-content/personals-details-content.component';
import { EduListPageComponent } from './edu-list-page/edu-list-page.component';
import { EduListContentComponent } from './edu-list-content/edu-list-content.component';
import { EduDetailsPageComponent } from './edu-details-page/edu-details-page.component';
import { EduDetailsContentComponent } from './edu-details-content/edu-details-content.component';
import { WorkListPageComponent } from './work-list-page/work-list-page.component';
import { WorkListContentComponent } from './work-list-content/work-list-content.component';
import { WorkDetailsContentComponent } from './work-details-content/work-details-content.component';
import { WorkDetailsPageComponent } from './work-details-page/work-details-page.component';
import { ProjectListPageComponent } from './project-list-page/project-list-page.component';
import { ProjectListContentComponent } from './project-list-content/project-list-content.component';
import { ProjectDetailsContentComponent } from './project-details-content/project-details-content.component';
import { ProjectDetailsPageComponent } from './project-details-page/project-details-page.component';
import { ContactListPageComponent } from './contact-list-page/contact-list-page.component';
import { ContactListContentComponent } from './contact-list-content/contact-list-content.component';
import { ContactDetailsPageComponent } from './contact-details-page/contact-details-page.component';
import { ContactDetailsContentComponent } from './contact-details-content/contact-details-content.component';
import { AboutPageComponent } from './about-page/about-page.component';


@NgModule({
  declarations: [
    MListComponent,
    AppendSPipe,
    FrameworkComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    MPageComponent,
    PageHeaderComponent,
    SideBarComponent,
    HomeContentComponent,
    MDetailsPageComponent,
    MDetailsContentComponent,
    MostRecentFirstPipe,
    RegisterPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PersonalsPageComponent,
    PersonalsListComponent,
    PersonalsDetailsPageComponent,
    PersonalsDetailsContentComponent,
    EduListPageComponent,
    EduListContentComponent,
    EduDetailsPageComponent,
    EduDetailsContentComponent,
    WorkListPageComponent,
    WorkListContentComponent,
    WorkDetailsContentComponent,
    WorkDetailsPageComponent,
    ProjectListPageComponent,
    ProjectListContentComponent,
    ProjectDetailsContentComponent,
    ProjectDetailsPageComponent,
    ContactListPageComponent,
    ContactListContentComponent,
    ContactDetailsPageComponent,
    ContactDetailsContentComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
