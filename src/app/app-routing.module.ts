import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'churches', loadChildren: './churches/churches.module#ChurchesPageModule' },
  { path: 'add-church', loadChildren: './add-church/add-church.module#AddChurchPageModule' },
  { path: 'manage-churches', loadChildren: './manage-churches/manage-churches.module#ManageChurchesPageModule' },
  { path: 'languages', loadChildren: './languages/languages.module#LanguagesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
