import Worker from "worker-loader!./worker";
import { paid, shipping } from "./actions";
import { isType } from "typescript-fsa";

const worker = new Worker();

const root = document.createElement("div");
root.innerHTML = `<input type="number" min="0" step="100" value="500" /><button>Send</button><ul></ul>`;
document.body.appendChild(root);

const input = root.getElementsByTagName("input")[0];
const button = root.getElementsByTagName("button")[0];
const list = root.getElementsByTagName("ul")[0];
function print(message: string) {
  const li = document.createElement("li");
  li.textContent = message;
  list.appendChild(li);
}

button.addEventListener("click", () => {
  const amount = Number(input.value);
  print(`Paid ¥${amount}`);
  worker.postMessage(paid({ amount }));
});

worker.addEventListener("message", event => {
  if (isType(event.data, shipping.started)) {
    const { id, message, received } = event.data.payload;
    print(`${message} No.${id} Received: ${received}`);
    return;
  }
  if (isType(event.data, shipping.done)) {
    const { id } = event.data.payload.params;
    const { items, change } = event.data.payload.result;
    if (items.length > 0) {
      print(
        `No.${id} Change: ¥${change}` +
          ` ${items.map(r => `"${r.title}" x ${r.quantity}`).join(" ")}`
      );
    } else {
      print(`Not delivered!`);
    }
    return;
  }
  if (isType(event.data, shipping.failed)) {
    const { id } = event.data.payload.params;
    const { reason } = event.data.payload.error;
    print(`No.${id} Reason: ${reason}`);
  }
});
