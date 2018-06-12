const cheerio = require('cheerio');

const IDENTIFIER = '$_$';

function preprocess(str) {
    return str.replace(/\${/g, "\\${").replace(/`/g, "\\`");
}

function generateInterpolateFunc(str) {
    return new Function(IDENTIFIER, `return \`${str}\`;`);
}

function thymeleafSubset() {
    if ($(this).is('[th\\:each]')) {
        let str = $(this).attr('th:each');
        const match = /^(\w+):\s*?\\\${(\w.*?)}$/.exec(str);
        const varName = match[1];
        const iterName = match[2];
        const arrayName = `${IDENTIFIER}_array`;
        const bufName = `${IDENTIFIER}_buf`;
        const codeBefore = `\${
        (function(){
            const ${arrayName} = [];
            for (const ${varName} of ${IDENTIFIER}.${iterName}) {
                const ${bufName} = ${IDENTIFIER};
                ${IDENTIFIER} = { ${varName}, ...${IDENTIFIER}};
                ${arrayName}.push(\``;
        const codeAfter = `\`);
                 ${IDENTIFIER} = ${bufName};
             }
             return ${arrayName}.join(\`\`);
        })()
        }`;
        $(this).before(codeBefore);
        $(this).after(codeAfter);
        $(this).removeAttr('th:each');
    }
    if ($(this).is('[th\\:text]')) {
        let str = $(this).attr('th:text');
        str = str.replace(/\\\${/g, `\${${IDENTIFIER}.`);
        $(this).text(str);
        $(this).removeAttr('th:text');
    }
    $(this).children().each(thymeleafSubset);
}

// language=HTML
const source = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<body>
<div th:each="ta: \${greetings}">
    <span th:text="\${ta}"></span>
</div>
<div th:text="\${hoge}">b</div>
<div th:each="t: \${greetings}" th:text="\${t}">a</div>
<div th:each="t: \${aa}">
    <div th:each="tv: \${t}" th:text="\${tv}">a</div>
</div>
</body>
</html>`;

const str = preprocess(source);
const $ = cheerio.load(str, {xmlMode: true});
$.root().children().each(thymeleafSubset);
const output = $.html({xmlMode: false});
const template = generateInterpolateFunc(output);

console.log(template({hoge: 2, greetings: ['bonjour', 'hello'], aa: [['!', '?'], ['@', '#']]}));
