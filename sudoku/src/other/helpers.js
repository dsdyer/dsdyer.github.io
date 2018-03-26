export const helpers = {
  shallowCopy(array) {  // Returns a shallow copy of a multi-dimensional array
    const a = array.map(c => {
      if (Array.isArray(c)) return helpers.shallowCopy(c);
      return c;
    });
    return a;
  }
}