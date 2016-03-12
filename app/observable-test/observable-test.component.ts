import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
    selector:'observable-test',
    template:`
    <header>
        <h1 class="title">Angular 2 Observable</h1>
    </header>
    <button  class="btn btn-default" id="start">start</button>
    <button  class="btn btn-default" id="stop">stop</button>
    <button  class="btn btn-default" id="reset">reset</button>
    <button  class="btn btn-default" id="half">half</button>
    <button  class="btn btn-default" id="quarter">quarter</button>
    `
})

export class ObservableTestComponent{
    
    constructor(){
    }
    
    ngOnInit() {
        const startButton = document.querySelector('#start');
        const stopButton = document.querySelector('#stop');
        const resetButton = document.querySelector('#reset');
        const halfButton = document.querySelector('#reset');
        const quarterButton = document.querySelector('#reset');
      
        const start$ = Observable.fromEvent(startButton,'click')
        const interval$ = Observable.interval(1000);
        const stop$ = Observable.fromEvent(stopButton,'click');
        const reset$ = Observable.fromEvent(resetButton,'click');
        const half$ = Observable.fromEvent(halfButton,'click');
        const quarter$ = Observable.fromEvent(quarterButton,'click');
        const intervalThatStops$ = interval$
                     .takeUntil(stop$);
       // const startInterval$ = start$.switchMap((event) => interval$);
        const data = {count:0};
        const inc = (acc: any) => ({count: acc.count+1});
        const reset = (acc)=> data;
        const incOrReset$ = Observable.merge(
                      intervalThatStops$.mapTo(inc), //use different function
                      reset$.mapTo(reset));
        const starters$ = Observable.merge(
            start$.mapTo(1000),
            half$.mapTo(500),
            quarter$.mapTo(250)
        )
        const intervalActions = (time)=> Observable.merge(
            Observable.interval(time).takeUntil(stop$).mapTo(inc),
            reset$.mapTo(reset)
        );
        const startInterval$ = start$.switchMapTo(incOrReset$) 
        // const startInterval$ = starters$.switchMapTo(intervalActions$)      
                               .startWith(data)
                               .scan((acc,curr)=> curr(acc));
        startInterval$.subscribe((x)=> console.log(x));
        
    }

}