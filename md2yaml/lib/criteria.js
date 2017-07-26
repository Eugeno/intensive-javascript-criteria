const CommonMark = require(`commonmark`);
const {readName, proceed} = require(`./util`);
const {Type} = require(`./constant`);

const reader = new CommonMark.Parser();
const writer = new CommonMark.HtmlRenderer({sourcepos: true});

module.exports = class Criteria {
  constructor(name) {
    this.name = name;
    this.description = [];
    this.instruction = [];
  }

  addDescription(node) {
    this.description.push(node);
  }

  addInstruction(node) {
    this.instruction.push(node);
  }


  print() {
    return `title: |
${this.name}
description: |
${Criteria.toHTML(this.description)}
instruction: |
${Criteria.toHTML(this.instruction)}
`;
  }

  static toHTML(nodes) {
    const doc = reader.parse(``);
    for (const node of nodes) {
      doc.appendChild(node);
    }
    return writer.render(doc);
  }

  static read(node, iterator) {
    const criteria = new Criteria(readName(node));

    for (const it of proceed(iterator)) {
      criteria.addDescription(it);

      const next = it.next;
      if (next && next.type === Type.HEADING) {
        break;
      }
    }

    return criteria;
  };

};
