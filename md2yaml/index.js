const CommonMark = require(`commonmark`);
const fs = require(`fs`);

const Type = {
  HEADING: `heading`
};

const Level = {
  TYPE: 1,
  SECTION: 2,
  CRITERIA: 3
};

const mdFilePath = process.argv[2];
if (!mdFilePath) {
  throw new Error(`*.md file path is not passed`);
}

const mdFile = fs.readFileSync(mdFilePath, `utf-8`);
if (!mdFile) {
  throw new Error(`Unable to find *.md file: ${mdFilePath}`);
}

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

const writer = new CommonMark.HtmlRenderer({sourcepos: true});
const html = () => {
  const nodes = [];
  return {
    build() {
      const doc = reader.parse(``);
      for (node of nodes) {
        doc.appendChild(node);
      }
      return writer.render(doc);
    },
    append(node) {
      nodes.push(node);
    }
  }
};

const readName = (node) => node.firstChild.literal;

const readCriteria = (node, iterator) => {
  const name = readName(node);
  const myHtml = html();

  for (const it of proceed(iterator)) {
    myHtml.append(it);

    const next = it.next;
    if (next && next.type === Type.HEADING) {
      break;
    }
  }

  return {name, html: myHtml};
};

const walk = (iterator) => {
  let currentType;
  let currentSection;

  const map = {};
  for (const node of proceed(iterator)) {
    console.log(`${node.type}/${node.level}:${node.literal}`);

    if (node.type === Type.HEADING) {
      switch (node.level) {
        case Level.TYPE:
          currentType = readName(node);
          map[currentType] = {};
          break;
        case Level.SECTION:
          currentSection = readName(node);
          map[currentType][currentSection] = [];
          break;
        case Level.CRITERIA:
          const criterias = map[currentType][currentSection];
          criterias.push(readCriteria(node, iterator));
          break;
        default:
          throw new Error(`Unknown level: ${node.level}`);
      }
    }
  }

  return map;
};
const reader = new CommonMark.Parser();

const parsed = reader.parse(mdFile);

const iter = iterator(parsed);
for (const it of proceed(iter)) {
  const {
    next: {
      firstChild: {
        literal
      }
    }
  } = it;
  console.log(typeof literal);
  if (literal && literal.indexOf(`Базовые`) === 0) {
    break;
  }
}

const result = walk(iter);

console.log(result);


