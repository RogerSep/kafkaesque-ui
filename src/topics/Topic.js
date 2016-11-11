import R from 'ramda';
import Rx from 'rx';
import store from '../storage/Storage';

class Topic {
  constructor(name) {
    this.name = name;

    this.subject = Rx.Subject();
    this.observable = subject
      .asObservable()
      .map(message => {
        message
      });
  }

  send = message => {
    return store(this.name, message).fold(
      message => {
        this.subject.onNext(message);
        new Left(message)
      },
      error => new Right(error)
    );
  };

}

const topic = R.memoize(name => {
  return new Topic(name);
});

export default topic;
