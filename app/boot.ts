import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HeroesService} from './hero-list/heroes.service'
import {HTTP_PROVIDERS} from 'angular2/http'

bootstrap(AppComponent,[HeroesService,HTTP_PROVIDERS]);