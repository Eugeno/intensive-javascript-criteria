const commonmark = require(`commonmark`);

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer({sourcepos: true});
const parsed = reader.parse("Hello *world*"); // parsed is a 'Node' tree
// transform parsed if you like...
const result = writer.render(parsed); // result is a String

console.log(result);
