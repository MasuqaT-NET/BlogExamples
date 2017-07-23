requirejs.config({
    baseUrl: 'out',
    paths: {
        kotlin: 'lib/kotlin',
        'kotlin-webgl_main': 'kotlin-webgl_main'
    }
});

requirejs(['kotlin-webgl_main'], function (webgl_main) {
    if (document.readyState === "complete" || document.readyState === "loaded") {
        webgl_main.run();
    } else {
        document.onload = webgl_main.run;
    }
});