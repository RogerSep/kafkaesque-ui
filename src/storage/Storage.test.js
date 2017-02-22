describe('Store', () => {
  beforeEach(() => {
    var store = {};

    spyOn(localStorage, 'getItem').andCallFake(key => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').andCallFake((key, value) => {
      if (key === 'error') {
        const err = Error('Mocked error when localStorage is full');
        err.name = '';
        throw err;
      }

      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').andCallFake(() => {
      store = {};
    });
  });
});
