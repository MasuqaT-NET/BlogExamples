const componentRouter = require('./component-router');
const {stringifyForStringInterpolation} = require('./utils');

function postOrderProcessForTag(node, func) {
    node.children.filter(n => n.type === 'tag').forEach(n => {
        postOrderProcessForTag(n, func);
    });
    func(node);
}

module.exports = function (context, $, options) {
    postOrderProcessForTag($.root().get(0), (n) => {
        if (options.prefixes.some(p => n.name.startsWith(p))) {
            const componentName = n.name;
            const passingOptions = {'name': componentName, ...options};

            const request = componentRouter(context, passingOptions);

            $(n).before(`\${require(\`${request.slice(1, -1)}\`)(${stringifyForStringInterpolation(n.attribs)},\`${$(n).contents() || "\\`\\`"}\`)}`);
            $(n).remove();
        }
    });
};