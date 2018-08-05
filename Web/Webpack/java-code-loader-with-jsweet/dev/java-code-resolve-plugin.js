const path = require("path");

class JavaCodeResolvePlugin {
    constructor(options) {
        this.options = options || {};
        if (!("targetRoot" in this.options)) {
            throw new Error("`targetRoot` is required option.");
        }
    }

    apply(resolver) {
        const target = resolver.ensureHook("raw-file");
        resolver.getHook("described-resolve").tapAsync("JavaCodeResolvePlugin", (request, resolveContext, callback) => {
            if (request.request === "java-code-class") {
                const javaFqdn = request.query.substring(1);
                const filePath = resolver.join(this.options.targetRoot, javaFqdn.replace(/\./g, "/"));
                const newRequest = Object.assign({}, request, {
                    path: filePath,
                    relativePath: "./" + path.relative(request.descriptionFileRoot, filePath),
                    query: "",
                    request: filePath
                });
                resolver.doResolve(target, newRequest, `Java class with mapping: ${request.request}${request.query} to ${filePath}`, resolveContext, callback);
            } else {
                return callback();
            }
        });
    }
}

module.exports = JavaCodeResolvePlugin;