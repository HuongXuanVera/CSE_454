import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCheckComponent } from './post-check/post-check.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: PostCheckComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostCheckRoutingModule { }
