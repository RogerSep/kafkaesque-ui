import { Observable } from 'rx';
import * as R from 'ramda';

export interface Topic {

  send(message: any): void

  observable: Observable<any>

}

function topic(globalContext: any): (name: string) => Topic {

  const topics: Observable<any> = Observable.empty()
    // Observable.fromEvent(globalContext, 'storage');

  class TopicImplementation implements Topic {
    constructor(public name: string) {
      this.observable = topics.filter( e =>
      !R.isNil(e.key) && e.key.indexOf(`kafkaesque-ui.${this.name}`) == 0);
    }

    send(message: any) {
      const key = `kafkaesque-ui.${this.name}.${Date.now().toString()}`;
      const value = JSON.stringify(message);
      localStorage.setItem(key, value);

      const event: StorageEvent = new StorageEvent('storage', {
        url: globalContext.location.href,
        key: key,
        newValue: value
      } );
      globalContext.dispatchEvent(event);
    }

    observable: Observable<any>
  }

  return function (name: string) {
    return new TopicImplementation(name)
  }
}

export { topic };
