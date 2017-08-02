const fs = require(`fs`);
const {CriteriaType, INDEX_HEADER} = require(`./constant`);
const {indent} = require(`./util`);
const fileUtil = require(`./file-util`);
const path = require(`path`);

let criteriaNumber = 0;
const printCriteria = (criteria, dir) => {
  const number = ++criteriaNumber;
  const filePath = path.join(dir, `${number}.yaml`);
  fileUtil.writeFile(filePath, criteria.print());
  return `${number}: @include: ${path.relative(`${dir}/..`, filePath)}`;
};

let sectionNumber = 0;
const printSection = (section, dir) => {
  const title = section.title;
  return `\
${indent(1)}${sectionNumber++}:
${indent(2)}title: ${title}
${indent(2)}criteries:
${indent(3)}${section.criteries.map((it) => printCriteria(it, dir)).join(`\n${indent(3)}`)}`;
};

const printType = (criteriaType, typeMap, dir) => {
  criteriaNumber = 0;
  const contents = [];
  const type = criteriaType.type;
  const sectionPath = path.join(dir, type);
  fileUtil.mkDir(sectionPath);
  contents.push(`${type}:`);
  for (const sectionKey of Object.keys(typeMap)) {
    contents.push(printSection({title: sectionKey, criteries: typeMap[sectionKey]}, sectionPath));
  }
  return contents.join(`\n`);
};

const printAll = (map, dir = `./`) => {
  const contents = [INDEX_HEADER];
  for (const key of Object.keys(CriteriaType)) {
    const criteriaType = CriteriaType[key];
    const criteriaTypeMap = map[criteriaType.name];
    if (criteriaTypeMap) {
      contents.push(printType(criteriaType, criteriaTypeMap, dir));
    }
  }
  contents.push(``);
  fileUtil.writeFile(path.join(dir, `index.yaml`), contents.join(`\n`));
};


module.exports = {printSection, printCriteria, printAll};
