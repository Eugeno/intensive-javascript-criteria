const fs = require(`fs`);
const {CriteriaType, INDEX_HEADER} = require(`./constant`);
const {indent} = require(`./util`);

let criteriaNumber = 0;
const printCriteria = (criteria, type) => {
  const number = ++criteriaNumber;
  const filePath = `${type.type}/${number}.yaml`;
  fs.writeFileSync(filePath, criteria.print());
  return `${number}: @include: ${filePath}`;
};

let sectionNumber = 0;
const printSection = (section, type) => {
  const title = section.title;
  return `\
${indent(1)}${sectionNumber++}:
${indent(2)}title: ${title}
${indent(2)}criteries:
${indent(3)}${section.criteries.map((it) => printCriteria(it, type)).join(`\n${indent(3)}`)}`;
};

const printAll = (map) => {
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


module.exports = {printSection, printCriteria, printAll};
