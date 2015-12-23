import {Component} from 'angular2/core';
import {HeroComponent} from './hero/hero.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {HeroesListComponent} from './hero-list/heroes-list.component';


interface Hero {
    id: number;
    name: string;
}


@Component({
    selector: 'my-app',
    template:`
    <hero></hero>
    <hero-form></hero-form>
    <heroes-list></heroes-list>
    `,
    directives:[HeroComponent, HeroFormComponent,HeroesListComponent]
})


export class AppComponent {}    
