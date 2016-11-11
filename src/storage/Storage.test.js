import { store, topicIndex, topicValues } from './Storage';

describe('Storage', () => {
  beforeEach(() => {
    var store = {};

    spyOn(localStorage, 'getItem').andCallFake(key => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').andCallFake((key, value) => {
      if (key === 'error') {
        throw new Error('Mocked error when localStorage is full');
      }

      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').andCallFake(() => {
      store = {};
    });
  });

  describe('TopicValues function', () => {
    beforeEach(() => {
      ['TopicA', 'TopicA', 'TopicA', 'TopicB'].forEach((t, i) => {
        localStorage.setItem(`kfque.${i}.${t}.${Date.now()}`, `${i}`)
      });
    });

    it('a', () => {

    });
  });

});
