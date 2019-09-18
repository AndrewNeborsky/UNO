import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CreaterComponent } from './company/creater/creater.component';
import { CompanyComponent } from './company/company.component';
import { ProfileChangeComponent } from './profile/profile-change/profile-change.component';
import { PledgeComponent } from './company/pledge/pledge.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile/:id/newcompany', component: CreaterComponent, canActivate: [AuthGuard] },
  { path: 'company/:company_id', component: CompanyComponent },
  { path: 'company/:company_id/change', component: CreaterComponent, canActivate: [AuthGuard] },
  { path: 'company/:company_id/pledge', component: PledgeComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/change', component: ProfileChangeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
