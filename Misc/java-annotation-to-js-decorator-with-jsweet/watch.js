const chokidar = require('chokidar');
const fs = require('fs-extra');
const {spawn} = require('child_process');
const path = require('path');
const ts = require("typescript");

const JSWEET_OUTPUT_DIR = "tmp/jsweet";
fs.removeSync(JSWEET_OUTPUT_DIR);
fs.mkdirpSync(JSWEET_OUTPUT_DIR);

// This is for Windows
const jsweetProcess = spawn('java', ['-cp', 'dev/jsweet-core-5-20170726.jar;dev/jsweet-transpiler-2.0.1-jar-with-dependencies.jar',
    'org.jsweet.JSweetCommandLineLauncher', '--input', './src/java/main:./dev/java-annotations',
    '--module', 'commonjs', '--tsOnly', '--tsout', JSWEET_OUTPUT_DIR, '--watch'], {
    shell: true
});

jsweetProcess.stdout.on('data', (data) => {
    console.log(data.toString().trim());
});

jsweetProcess.stderr.on('data', (data) => {
    console.warn(data.toString().trim());
});

jsweetProcess.on('close', (code) => {
    if (code !== 0) {
        process.exit(1);
    }
    process.exit(0);
});


const MERGED_DIR = "target/generated/ts";
fs.removeSync(MERGED_DIR);
fs.mkdirpSync(MERGED_DIR);

const jsweetOutputWatcher = chokidar.watch("./**/*.ts", {
    cwd: path.resolve(JSWEET_OUTPUT_DIR)
});
const jsweetEventHandler = filePath => {
    if (!filePath.startsWith("bar")) {
        return;
    }
    const srcPath = path.resolve(JSWEET_OUTPUT_DIR, filePath);
    const destPath = path.resolve(MERGED_DIR, filePath);
    const destDirPath = path.dirname(destPath);
    fs.mkdirpSync(destDirPath);
    fs.copyFileSync(srcPath, destPath);
};
jsweetOutputWatcher.on('add', jsweetEventHandler);
jsweetOutputWatcher.on('change', jsweetEventHandler);

const DECORATORS_DIR = "dev/ts-decorators";
const decoratorsWatcher = chokidar.watch("./**/*.ts", {
    cwd: path.resolve(DECORATORS_DIR)
});
const decoratorsEventHandler = filePath => {
    const srcPath = path.resolve(DECORATORS_DIR, filePath);
    const destPath = path.resolve(MERGED_DIR, filePath);
    const destDirPath = path.dirname(destPath);
    fs.mkdirpSync(destDirPath);
    fs.copyFileSync(srcPath, destPath);

};
decoratorsWatcher.on('add', decoratorsEventHandler);
decoratorsWatcher.on('change', decoratorsEventHandler);

// copied from https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#writing-an-incremental-program-watcher
function tsWatchMain() {
    const configPath = ts.findConfigFile(/*searchPath*/ "./", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        throw new Error("Could not find a valid 'tsconfig.json'.");
    }

    const formatHost = {
        getCanonicalFileName: path => path,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine
    };

    function reportDiagnostic(diagnostic) {
        console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
    }

    function reportWatchStatusChanged(diagnostic) {
        console.info(ts.formatDiagnostic(diagnostic, formatHost));
    }

    const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

    const host = ts.createWatchCompilerHost(configPath, {}, ts.sys, createProgram, reportDiagnostic, reportWatchStatusChanged);

    const origCreateProgram = host.createProgram;
    host.createProgram = (rootNames, options, host, oldProgram) => {
        console.log("** We're about to create the program! **");
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    const origPostProgramCreate = host.afterProgramCreate;

    host.afterProgramCreate = program => {
        console.log("** We finished making the program! **");
        origPostProgramCreate(program);
    };

    ts.createWatchProgram(host);
}

tsWatchMain();