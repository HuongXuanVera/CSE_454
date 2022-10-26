import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { FullContentComponent } from './shared/components/layouts/full-content/full-content.component';
import { full_content } from './shared/routes/full-content-router';
import { AuthGuard } from './shared/shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginPageComponent },
  {
    path: '',
    component: FullContentComponent,
    children: full_content,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
