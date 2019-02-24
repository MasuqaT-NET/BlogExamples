import { Content, MessageType } from "./models";
// @ts-ignore
import { toRomaji } from "wanakana";

const ctx: Worker = self as any;

const store = {
  index: [] as string[][]
};

// something heavy process
function normalize(arg: string): string {
  return toRomaji(
    arg.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    )
  );
}

function match(data: string[], query: string): boolean {
  return data.some(d => d.includes(query));
}

ctx.addEventListener("message", event => {
  const type: MessageType = event.data.type;
  if (type === "initialize") {
    const { contents }: { contents: Content[] } = event.data.payload;
    store.index = contents.map(({ name, nameKana, city, cityKana }) => [
      normalize(name),
      normalize(nameKana),
      normalize(city),
      normalize(cityKana)
    ]);
  } else if (type === "search") {
    const { query }: { query: string } = event.data.payload;
    const normalizedQuery = normalize(query);

    // can this be Transferable object?
    const remainingIndices = [];
    for (let i = 0; i < store.index.length; i++) {
      if (match(store.index[i], normalizedQuery)) {
        remainingIndices.push(i);
      }
    }
    ctx.postMessage({ type: "result", payload: { remainingIndices } });
  }
});
