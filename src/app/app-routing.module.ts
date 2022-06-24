import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WikipediaComponent } from "./wikipedia/wikipedia.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'wikipedia'
    },
    {
        path: 'wikipedia',
        component: WikipediaComponent
    },
    {
        path: '**',
        redirectTo: 'wikipedia'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }