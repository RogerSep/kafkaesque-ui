import { Observable } from 'rx';
import * as R from "ramda";

const topics: Observable<any> = Observable.fromEvent(window, 'storage');

class Topic {
  constructor(public name: string) {
    this.observable = topics.filter( e => {
      return !R.isNil(e.key) &&
        e.key.indexOf(`kafkaesque-ui.${this.name}`) == 0;
    } );
  }

  send(message: any) {
    localStorage.setItem(`kafkaesque-ui.${this.name}.${Date.now().toString()}`, JSON.stringify(message))
  }

  observable: Observable<any>
}

function topic(name: string): Topic {
  return new Topic(name);
}

export { topic };
