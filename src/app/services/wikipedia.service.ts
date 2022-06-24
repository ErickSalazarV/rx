import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { map, Observable, pipe, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  private channel: string;
  private messages$ = new Subject<Article>();
  private subscribeKey = environment.pubnubWikipediaKey; 
  
  constructor(private pubnub: PubNubAngular) {
    this.channel = 'pubnub-wikipedia';
  }
  
  getWikipediaMessages(): Observable<Article> {

    this.pubnub.init({
      subscribeKey: this.subscribeKey,
      uuid: this.subscribeKey
    });

    this.pubnub.getMessage(this.channel, msg => {
      this.messages$.next(msg['message']);
    });

    this.pubnub.subscribe({
      channels: [this.channel],
      triggerEvents: ['message']
    });

    return this.messages$.asObservable();
  }
}