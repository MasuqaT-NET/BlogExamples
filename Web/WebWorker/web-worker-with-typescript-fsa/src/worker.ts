import { isType } from "typescript-fsa";
import { paid, shipping } from "./actions";

const ctx: Worker = self as any;

ctx.addEventListener("message", event => {
  if (isType(event.data, paid)) {
    const { amount } = event.data.payload;
    console.log(`Got paid ¥${amount}.`);

    ctx.postMessage(1);

    const id = (Math.random() * 10000).toFixed(0);
    const params = { id, message: "Thank you.", received: amount };
    ctx.postMessage(shipping.started(params));

    if (amount > 0) {
      const onionPrice = 80;
      const potatoPrice = 50;
      const onionAmount = Math.floor((Math.random() * amount) / onionPrice);
      const potatoAmount = Math.floor(
        (amount - onionPrice * onionAmount) / potatoPrice
      );
      const items = [
        { title: "Onion", quantity: onionAmount },
        { title: "Potato", quantity: potatoAmount }
      ];
      const change =
        amount - onionPrice * onionAmount - potatoPrice * potatoAmount;
      setTimeout(() => {
        ctx.postMessage(shipping.done({ result: { items, change }, params }));
      }, 2000);
    } else {
      setTimeout(() => {
        ctx.postMessage(
          shipping.failed({ error: { reason: "Not enough money!" }, params })
        );
      }, 500);
    }
  }
});
