import { Observable } from 'rx';
import * as R from "ramda";

const topics: Observable<any> = Observable.fromEvent(window, 'storage');

class Topic {
  constructor(public name: string) {
    this.observable = topics.filter( e =>
      !R.isNil(e.key) && e.key.indexOf(`kafkaesque-ui.${this.name}.`) == 0);
  }

  send(message: any) {
    const key = `kafkaesque-ui.${this.name}.${Date.now().toString()}`;
    const value = JSON.stringify(message);
    localStorage.setItem(key, value);

    const event: StorageEvent = new StorageEvent('storage', {
      url: window.location.href,
      key: key,
      newValue: value
    });
    window.dispatchEvent(event);
  }

  observable: Observable<any>
}

function topic(name: string): Topic {
  return new Topic(name);
}

export { topic };
