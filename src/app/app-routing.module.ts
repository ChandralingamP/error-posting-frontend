import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TagsComponent } from './components/tags/tags.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { HttpClientModule } from '@angular/common/http';
import { AnswerComponent } from './components/answer/answer.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamAnswerComponent } from './components/teams/team-answer/team-answer.component';
import { TeamPostQuestionComponent } from './components/teams/team-post-question/team-post-question.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'questions/tagged/:tag', component: QuestionsComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'post-questions', component: PostQuestionComponent, canActivate: [AuthGuard] },
  { path: 'register-user', component: RegisterComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'answers/:id', component: AnswerComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'team/create' , component : CreateTeamComponent, canActivate: [AuthGuard] },
  { path: 'team/:id' , component : TeamsComponent, canActivate: [AuthGuard] },
  { path: 'team/question/:id' , component : TeamsComponent, canActivate: [AuthGuard] },
  { path: 'team/question/tag/:id/:tag' , component : TeamsComponent, canActivate: [AuthGuard] },
  { path: 'team/question/:id/:uid' , component : TeamsComponent, canActivate: [AuthGuard] },
  { path: 'team/post-questions/:id/:uid', component: TeamPostQuestionComponent, canActivate: [AuthGuard] },
  { path: 'team/answer/:id/:qid', component: TeamAnswerComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
