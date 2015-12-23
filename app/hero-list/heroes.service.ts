import {Hero} from './hero';
import {Injectable} from 'angular2/core';

@Injectable()
export class HeroesService {
  heroes: Array<Hero> = [
    { name: "RubberMan", power: 'flexibility'},
    { name: "Tornado", power: 'Weather changer'}
  ];

  getHeroes () {
    return this.heroes;
  }
}
