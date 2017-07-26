const CommonMark = require(`commonmark`);
const {proceed} = require(`./util`);
const {Type} = require(`./constant`);

const reader = new CommonMark.Parser();
const writer = new CommonMark.HtmlRenderer({sourcepos: true});

module.exports = class Criteria {
  constructor(titleNode) {
    this.titleNode = titleNode;
    this.description = [];
    this.instruction = [];
  }

  get name() {
    return Criteria.toHTML([this.titleNode]);
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
    const criteria = new Criteria(node);

    const next = node.next;
    if (next && next.type === Type.HEADING) {
      // in case there is no description
      return criteria;
    }

    let section = criteria.description;
    for (const it of proceed(iterator)) {
      if (it.type === Type.THEMATIC_BREAK) {
        section = criteria.instruction; // skip current node
      } else {
        section.push(it);
      }

      const next = it.next;
      if (next && next.type === Type.HEADING) {
        break;
      }
    }

    return criteria;
  };

};
