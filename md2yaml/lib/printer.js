const fs = require(`fs`);
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

module.exports = {printSection, printCriteria};
