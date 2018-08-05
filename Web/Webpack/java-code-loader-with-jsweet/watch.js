const fs = require('fs-extra');
const {spawn} = require('child_process');

const JSWEET_OUTPUT_DIR = "tmp/jsweet";
fs.removeSync(JSWEET_OUTPUT_DIR);
fs.mkdirpSync(JSWEET_OUTPUT_DIR);

// This is for Windows
const jsweetProcess = spawn('java', ['-cp', 'dev/jsweet-core-5-20170726.jar;dev/jsweet-transpiler-2.0.1-jar-with-dependencies.jar',
    'org.jsweet.JSweetCommandLineLauncher', '--input', './src/java/main',
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
