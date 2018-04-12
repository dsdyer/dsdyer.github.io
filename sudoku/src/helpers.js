export const helpers = {
  shallowCopy(array) {  // Returns a shallow copy of a multi-dimensional array
    const a = array.map(c => {
      if (Array.isArray(c)) return helpers.shallowCopy(c);
      return c;
    });
    return a;
  },

  unpack(array) {  // Returns a shallow copy of a multi-dimensional array
    let a = array.map(c => {
      if (Array.isArray(c)) return helpers.unpack(c);
      if (typeof c === 'object' && c.value) return c.value;
      return c;
    });
    return a;
  },

  shuffleArray(array) { // Fisher–Yates Shuffle
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }
}
