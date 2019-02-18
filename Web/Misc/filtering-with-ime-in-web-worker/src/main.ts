import Worker from "worker-loader!./worker";
import { Content } from "./models";

const worker = new Worker();

const state = { contents: [] as Content[], remaining: [] as number[] };

const root = document.createElement("div");

root.innerHTML = `
<div style="float: left;">
<input id="input" type="text" /><br />
<input id="checkbox" type="checkbox" /><label for="checkbox">See all</label>
</div>
<ul id="list" style="float: left"></ul>
<template id="item">
<li><span class="name"></span><br /><span class="city" style="font-size: 0.8em"></span></li>
</template>
`;

document.body.append(root);
const input: HTMLInputElement = document.querySelector("#input") as any;
const checkbox: HTMLInputElement = document.querySelector("#checkbox") as any;
const list: HTMLUListElement = document.querySelector("#list") as any;
const template: HTMLTemplateElement = document.querySelector("#item") as any;

input.addEventListener("keyup", () => {
  worker.postMessage({
    type: "search",
    payload: { query: input.value }
  });
});

checkbox.addEventListener("change", () => {
  render();
});

function render() {
  const itemToRender: DocumentFragment[] = [];

  let filteredContents = state.contents.filter(
    (c, i) => state.remaining.includes(i) // naive
  );

  if (!checkbox.checked) {
    filteredContents = filteredContents.slice(0, 20);
  }

  for (const c of filteredContents) {
    const clone = document.importNode(template.content, true);
    const name = clone.querySelector(".name")!;
    name.textContent = c.name;
    const city = clone.querySelector(".city")!;
    city.textContent = c.city;
    itemToRender.push(clone);
  }

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for (const i of itemToRender) {
    list.appendChild(i);
  }
}

worker.addEventListener("message", event => {
  if (event.data.type === "result") {
    const {
      remainingIndices
    }: { remainingIndices: number[] } = event.data.payload;

    state.remaining = remainingIndices;

    render();
  }
});

(async function() {
  let res = await fetch("kanko.json");
  if (!res.ok) {
    alert("Execute `npm run generate` before you start.");
    root.innerHTML = `Execute \`npm run generate\` before you start.`;
    return;
  }
  const payload = await res.json();
  state.contents = payload.data;
  state.remaining = [...Array(state.contents.length).keys()];

  worker.postMessage({
    type: "initialize",
    payload: { contents: state.contents }
  });

  // initial render
  render();
})();
