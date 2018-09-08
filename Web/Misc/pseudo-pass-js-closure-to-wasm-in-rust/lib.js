const closureDict = {};

const imports = {
    env: {
        call_closure: function (closureId, ...args) {
            return closureDict[closureId](...args);
        }
    }
};

let counter = 0;

function generateId() {
    return counter++;
}

export default fetch('./target/wasm32-unknown-unknown/debug/pseudo_pass_js_closure_to_wasm_in_rust.wasm')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, imports))
    .then(results => ({
        withClosureExample: (closure, ...args) => {
            if (typeof closure === "function") {
                const id = generateId();
                closureDict[id] = closure;
                const result = results.instance.exports.with_closure_example(id, ...args);
                delete closureDict[id];
                return result;
            }
            else {
                throw new Error("`closure` is not a function!");
            }
        },
        initData: results.instance.exports.init_data,
        fold: (closure, init) => {
            if (typeof closure === "function") {
                const id = generateId();
                closureDict[id] = closure;
                const result = results.instance.exports.fold(id, init);
                delete closureDict[id];
                return result;
            }
            else {
                throw new Error("`closure` is not a function!");
            }
        },
        foldAsSumInRust: (init) => {
            return results.instance.exports.fold_as_sum_in_rust(init);
        }
    }));
