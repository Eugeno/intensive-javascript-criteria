const CommonMark = require(`commonmark`);
const fs = require(`fs`);
const {Type, Level, CriteriaType} = require(`./lib/constant`);
const Criteria = require(`./lib/criteria`);
const {iterator, proceed, readName, indent} = require(`./lib/util`);

const mdFilePath = process.argv[2];
let errorMessage;
if (!mdFilePath) {
  errorMessage = `*.md file path is not passed`;
}

const mdFile = fs.readFileSync(mdFilePath, `utf-8`);
if (!mdFile) {
  errorMessage = `Unable to find *.md file: ${mdFilePath}`;
}

if(errorMessage) {
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

const INDEX_HEADER = `intro: |
    <link rel="stylesheet" href="/static/css/highlight.min.css" />
    <script src="/static/js/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <h2 class="m-b-2">Введение</h2>

    <p>Итоговая оценка разбита на две составляющие: базовая и дополнительная.</p>

    <p>Базовая оценка предполагает перепроверку некоторых важных критериев. При условии, что они выполнены, выставляется базовая оценка и наставник переходит к дополнительной оценке.</p>

    <p>Дополнительная оценка выставляется по дополнительным критериям. Дополнительные критерии оценивают проект с точки зрения шлифовки его качества и оптимизации, и выстроены по принципу перфекционизма. Мы не требуем сделать проект идеально, но набрать максимальное количество баллов возможно.</p>`;


const {printSection} = require(`./lib/printer`);

const write = (map) => {
  let indexContent = INDEX_HEADER;
  for (const key of Object.keys(CriteriaType)) {
    const criteriaType = CriteriaType[key];
    const type = map[criteriaType.name];
    if (type) {
      fs.mkdirSync(criteriaType.type);
      indexContent += `\n${criteriaType.type}:
${Object.keys(type).map((it) => printSection({title: it, criteries: type[it]}, criteriaType)).join(`\n`)}`;
    }
  }
  fs.writeFileSync(`index.yaml`, indexContent + '\n');
};

const reader = new CommonMark.Parser();
const parsed = reader.parse(mdFile);

const iter = iterator(parsed);

const result = walk(iter);

write(result);



