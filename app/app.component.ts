import {Component} from 'angular2/core';
import {HeroComponent} from './hero/hero.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {HeroesListComponent} from './hero-list/heroes-list.component';
import {HttpTestComponent} from './http-test/http-test.component';
import {ObservableTestComponent} from './observable-test/observable-test.component';


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
    <http-test></http-test>
    <observable-test></observable-test>
    `,
    directives:[HeroComponent, HeroFormComponent,HeroesListComponent,HttpTestComponent,ObservableTestComponent]
})


export class AppComponent {}    
