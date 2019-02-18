/**
 * Please download the data from
 * https://www.chiikinogennki.soumu.go.jp/k-cloud-api/search/download/
 * to "./kanko_all.csv"
 */

const fs = require("fs").promises;

const regexCsvMatch = /,,,,,,"(.+)(\r)?"/;
const regexKanji = /[\u4E00-\u9FFF]/;

function getContent(line) {
  return regexCsvMatch.exec(line)[1];
}

function isValidKana(kana) {
  return (
    !kana.startsWith("-") &&
    !kana.startsWith("PHONETIC") &&
    !regexKanji.test(kana)
  );
}

(async function() {
  const buffer = await fs.readFile("./kanko_all.csv").catch(() => {
    console.error(
      "Please download original file from https://www.chiikinogennki.soumu.go.jp/k-cloud-api/search/download/"
    );
    process.exit(1);
  });
  const fileContent = buffer.toString("utf-8");
  const lines = fileContent.replace(/\r\n/g, "").split("\n");
  const filtered = lines.filter(
    l =>
      l.includes(`"name","name1"`) ||
      l.includes(`"place","pref"`) ||
      l.includes(`"place","city"`)
  );

  const data = [];

  // naive
  for (let i = 0; i < filtered.length; i++) {
    const nameLine = filtered[i];
    if (!nameLine.includes(`"name","name1","written"`)) {
      continue;
    }
    const name = getContent(nameLine);

    const kanaLine = filtered[++i];
    if (!kanaLine.includes(`"name","name1","spoken"`)) {
      continue;
    }
    const nameKana = getContent(kanaLine);
    if (!isValidKana(nameKana)) {
      continue;
    }

    const prefLine = filtered[++i];
    if (!prefLine.includes(`"place","pref","written"`)) {
      continue;
    }
    const pref = getContent(prefLine);

    const prefKanaLine = filtered[++i];
    if (!prefKanaLine.includes(`"place","pref","spoken"`)) {
      continue;
    }
    const prefKana = getContent(prefKanaLine);
    if (!isValidKana(nameKana)) {
      continue;
    }

    const cityLine = filtered[++i];
    if (!cityLine.includes(`"place","city","written"`)) {
      continue;
    }
    const city = getContent(cityLine);

    const cityKanaLine = filtered[++i];
    if (!cityKanaLine.includes(`"place","city","spoken"`)) {
      continue;
    }
    const cityKana = getContent(cityKanaLine);
    if (!isValidKana(cityKanaLine)) {
      continue;
    }

    data.push({
      name,
      nameKana,
      city: pref + city,
      cityKana: prefKana + cityKana
    });
  }

  const sorted = data.sort((a, b) => a.nameKana.localeCompare(b.nameKana));

  await fs.writeFile("./src/kanko.json", JSON.stringify({ data: sorted }));
})();
