import { NgModule,CUSTOM_ELEMENTS_SCHEMA , OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { TagsComponent } from './components/tags/tags.component';
import { UsersComponent } from './components/users/users.component';
import { TeamsComponent } from './components/teams/teams.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { WorksComponent } from './components/works/works.component';
import { AuthService } from './services/auth.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/home/card/card.component';
import { QuestionCardComponent } from './components/questions/question-card/question-card.component';
import { HeaderComponent } from './components/header/header.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { TagComponent } from './components/tags/tag/tag.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TeamMembersComponent } from './components/teams/team-members/team-members.component';
import { TeamPostQuestionComponent } from './components/teams/team-post-question/team-post-question.component';
import { TeamAnswerComponent } from './components/teams/team-answer/team-answer.component';
import { FilterComponent } from './components/teams/filter/filter.component';
import { TeamQuestionCardComponent } from './components/teams/team-question-card/team-question-card.component';
import { TeamTagsComponent } from './components/teams/team-tags/team-tags.component';
import { ClipboardModule } from "@angular/cdk/clipboard";
import { TeamAddMembersComponent } from './components/teams/team-add-members/team-add-members.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionsComponent,
    TagsComponent,
    UsersComponent,
    TeamsComponent,
    RegisterComponent,
    LoginComponent,
    WorksComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    NavbarComponent,
    CardComponent,
    QuestionCardComponent,
    HeaderComponent,
    PostQuestionComponent,
    AnswerComponent,
    TagComponent,
    CreateTeamComponent,
    TeamMembersComponent,
    TeamPostQuestionComponent,
    TeamAnswerComponent,
    FilterComponent,
    TeamQuestionCardComponent,
    TeamTagsComponent,
    TeamAddMembersComponent
  ],
  imports: [
    AngularEditorModule,
    BrowserModule,
    FormsModule ,
    ReactiveFormsModule,
    AppRoutingModule,
    ClipboardModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDKXxMNdeaFLDihktHT6iJE5Zk3QZ52hE4",
      authDomain: "error-posting-application.firebaseapp.com",
      projectId: "error-posting-application",
      storageBucket: "error-posting-application.appspot.com",
      messagingSenderId: "781417821713",
      appId: "1:781417821713:web:dbb1987b5607991d12a3b0",
      measurementId: "G-Y2CYXHH2DE"
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule{

}
