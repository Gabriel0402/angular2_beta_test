import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


class CredentialsModel {
  username: string;
  password: string;
}

@Component({
    selector:'http-test',
    template:`
    <header>
        <h1 class="title">Angular 2 HTTP</h1>
    </header>
    <section>
        <h2>Register</h2>
        <form #g="ngForm" (ngSubmit)="register(g.value)">
        <div>
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                ngControl="username"
                required>
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                ngControl="password"
                required>
        </div>
        <button type="submit" class="btn btn-default">Register!</button>

        </form>

    </section>

    <section>
        <h2>Login</h2>
        <form #f="ngForm" (ngSubmit)="authenticate(f.value)">
        <div>
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                ngControl="username"
                required>
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                ngControl="password"
                required>
        </div>
        <button type="submit" class="btn btn-default">Login!</button>

        </form>

    </section>
    
    <section>
        <h2>Random Quote</h2>
        <hr>
        <h3>{{randomQuote}}</h3>
        <button (click)="getRandomQuote()" class="btn btn-default">Get Random Quote!</button>       
    <section>

    <section>
        <h2>Secret Quote</h2>
        <hr>
        <h3>{{secretQuote}}</h3>
        <button (click)="getSecretQuote()" class="btn btn-default">Get Secret Quote!</button>
    <section>
    `
})

export class HttpTestComponent{
    http: Http;
    randomQuote: string;
    secretQuote: string;
    
    constructor(http:Http){
        this.http=http;
    }
    
    getRandomQuote() {
        this.http.get('http://localhost:3001/api/random-quote')
            .map(res => res.text())
            .subscribe(
            data => this.randomQuote = data,
            err => this.logError(err),
            () => console.log('Random Quote Complete')
            );
    }
    
    register(data){
       var username = data.username;
       var password = data.password; 
       var creds = "username=" + username + "&password=" + password + "&extra=color";
       var headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       this.http.post('http://localhost:3001/users', creds, {
            headers: headers
            })
            .map(res => res.json())
            .subscribe(
             data => console.log(data),
             err => this.logError(err),
            () => console.log('Register Complete')
       );
    }
    
    logError(err) {
        console.error('There was an error: ' + err);
    }

    
    authenticate(data) {
        var username = data.username;
        var password = data.password;

        var creds = "username=" + username + "&password=" + password;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post('http://localhost:3001/sessions/create', creds, {
            headers: headers
            })
            .map(res => res.json())
            .subscribe(
            data => this.saveJwt(data.id_token),
            err => this.logError(err),
            () => console.log('Authentication Complete')
            );
     }
     
     saveJwt(jwt) {
        if(jwt) {
            localStorage.setItem('id_token', jwt)
        }
    }
    
    getSecretQuote() {

        var jwt = localStorage.getItem('id_token');
        var authHeader = new Headers();
        if(jwt) {
            authHeader.append('Authorization', 'Bearer ' + jwt);      
        }

        this.http.get('http://localhost:3001/api/protected/random-quote', {
            headers: authHeader
        })
        .map(res => res.text())
        .subscribe(
            data => this.secretQuote = data,
            err => this.logError(err),
            () => console.log('Secret Quote Complete')
        );

     }

}