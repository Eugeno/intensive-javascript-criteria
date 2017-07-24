const CommonMark = require(`commonmark`);
const fs = require(`fs`);

const Type = {
  HEADING: `heading`
};

const mdFilePath = process.argv[2];
if (!mdFilePath) {
  throw new Error(`*.md file path is not passed`);
}

const mdFile = fs.readFileSync(mdFilePath, `utf-8`);
if (!mdFile) {
  throw new Error(`Unable to find *.md file: ${mdFilePath}`);
}

const iterator = function* (node) {
  for (let it = node.firstChild; (it = it.next) !== null;) {
    yield it;
  }
};


const proceed = function*(iterator) {
  //noinspection EqualityComparisonWithCoercionJS
  for (let it; !((it = iterator.next()).done); ) {
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

const readCriteria = (node, iterator) => {
  const name = node.firstChild.literal;
  const myHtml = html();
  for (const it of proceed(iterator)) {
    const next = it.next;
    if (next && next.type === Type.HEADING) {
      break;
    }

    myHtml.append(it);
  }
  return {name, html: myHtml};
};

const walk = (iterator) => {
  for (const node of proceed(iterator)) {
    console.log(`${node.type}/${node.level}:${node.literal}`);

    if (node.type === Type.HEADING && node.level === 3) {
      const criteria = readCriteria(node, iterator);
      console.dir(criteria);
    }
  }
};
const reader = new CommonMark.Parser();

const parsed = reader.parse(mdFile);

walk(iterator(parsed));
writer.render(parsed);
