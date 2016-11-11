import { Left, Right } from '../data/Xor';
import Rx from 'rx';
import R from 'ramda';

const LibraryNamespace = 'kfque.';

const store = (name, value) => {
  try {
    const v = JSON.stringify(value);
    localStorage.setItem(name, v);
    return new Left(v);
  } catch (e) {
    return new Right(e);
  }
};

const topicIndex = topicName => {

};

const topicValues = topicName => {
  Rx.Observable.range(0, localStorage.length)
    .flatMap(index => {
      const key = localStorage.key(index);
      if (
        key === null ||
        key.indexOf(topicName) === -1 ||
        key.indexOf(LibraryNamespace) === -1
      ) {
        return Rx.Observable.empty();
      } else {
        const [,, stamp,] = key.split('.');

        return Rx.Observable.just({
          id: index,
          timestamp: new Date(parseInt(stamp)),
          event: JSON.parse(localStorage.getItem(key))
        });
      }
    })
    .toArray()
    .flatMap(events => Rx.Observable.fromArray(R.sortBy(R.prop('id'))(events)));
};

export { store, topicIndex, topicValues };
