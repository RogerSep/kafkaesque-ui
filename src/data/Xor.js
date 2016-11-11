import R from 'ramda';

class Xor {
  constructor(value) {
    this.value = value;
  }

  fold = (fa, fb) => {
    if (this.isLeft) return fa(this.value);
    else return fb(this.value);
  };

  map = f => {
    return this;
  };

  forEach = () => {};

  flatMap = f => {
    return this;
  };
}

class Left extends Xor {
  isLeft = true;

  map = f => {
    return new Left(f(this.value));
  };

  forEach = f => {
    f(this.value);
  };

  flatMap = f => {
    return f(this.value);
  };

  toString() {
    return `Left(${this.value})`;
  }
}

class Right extends Xor {
  isLeft = false;

  toString() {
    return `Right(${this.value})`;
  }
}

export { Left, Right };
