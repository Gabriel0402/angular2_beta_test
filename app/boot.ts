import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HeroesService} from './hero-list/heroes.service'

bootstrap(AppComponent,[HeroesService]);