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

const printAll = (map, dir = `./`) => {
  let indexContent = INDEX_HEADER;
  for (const key of Object.keys(CriteriaType)) {
    const criteriaType = CriteriaType[key];
    const sectionMap = map[criteriaType.name];
    if (sectionMap) {
      const type = criteriaType.type;
      const sectionPath = path.join(dir, type);
      fileUtil.mkDir(sectionPath);
      indexContent += `\n${type}:
${Object.keys(sectionMap).
         map((it) => printSection({title: it, criteries: sectionMap[it]}, sectionPath)).
         join(`\n`)}`;
    }
  }
  fileUtil.writeFile(path.join(dir, `index.yaml`), `${indexContent}\n`);
};


module.exports = {printSection, printCriteria, printAll};
