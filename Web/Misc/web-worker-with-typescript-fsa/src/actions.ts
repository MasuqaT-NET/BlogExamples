import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const paid = actionCreator<{ amount: number }>("PAID");

export const shipping = actionCreator.async<
  { id: string; message: string; received: number },
  { items: Array<{ title: string; quantity: number }>; change: number },
  { reason: string }
>("SHIPPING");
