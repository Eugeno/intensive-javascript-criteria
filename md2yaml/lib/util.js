const iterator = function*(node) {
  for (let it = node.firstChild; (it = it.next) !== null;) {
    yield it;
  }
};


const proceed = function*(iterator) {
  //noinspection EqualityComparisonWithCoercionJS
  for (let it; !((it = iterator.next()).done);) {
    yield it.value;
  }
};

const readName = (node) => node.firstChild.literal;

const skipTo = (iter, sectionName) => {
  for (const it of proceed(iter)) {
    const {
      next: {
        firstChild: {
          literal
        }
      }
    } = it;

    if (literal && literal.trim() === sectionName) {
      break;
    }
  }
  return iter;
};

const STEP = `    `;
const indent = (ind) => new Array(ind + 1).join(STEP);

module.exports = {iterator, proceed, readName, skipTo, indent};
