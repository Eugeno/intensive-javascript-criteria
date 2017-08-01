const CommonMark = require(`commonmark`);
const fs = require(`fs`);
const {Type, Level} = require(`./lib/constant`);
const Criteria = require(`./lib/criteria`);
const {iterator, proceed, readName} = require(`./lib/util`);

const mdFilePath = process.argv[2];
let errorMessage;
if (!mdFilePath) {
  errorMessage = `*.md file path is not passed`;
}

const mdFile = fs.readFileSync(mdFilePath, `utf-8`);
if (!mdFile) {
  errorMessage = `Unable to find *.md file: ${mdFilePath}`;
}

if (errorMessage) {
  console.error(errorMessage);
  console.log(`Usage: md2yaml <path to *.md file>`);
}

const walk = (iterator) => {
  let currentType;
  let currentSection;

  const map = {};
  for (const node of proceed(iterator)) {

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
          criterias.push(Criteria.read(node, iterator));
          break;
        default:
          throw new Error(`Unknown level: ${node.level}`);
      }
    }
  }

  return map;
};

const {printAll} = require(`./lib/printer`);

const reader = new CommonMark.Parser();
const parsed = reader.parse(mdFile);

const result = walk(iterator(parsed));

printAll(result);



