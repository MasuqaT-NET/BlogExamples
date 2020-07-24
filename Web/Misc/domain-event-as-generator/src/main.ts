import {
  EventQueueDispatcher,
  getControllerRegistry,
  getEventListenerRegistry,
} from "./infrastructure.ts";

const {
  user: userController,
  serviceInfo: serviceInfoController,
} = getControllerRegistry();
const eventListeners = getEventListenerRegistry();

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const dispatcher = new EventQueueDispatcher(200);

for (const listener of eventListeners) {
  dispatcher.addListener(listener);
}

dispatcher.start();

console.log("Start");

await sleep(500);

const info0 = await serviceInfoController.getInfo();
console.log("Response");
console.log(info0);
console.log();

await sleep(500);

const firstName = "John";
const lastName = "Smith";
const user = await userController.postUsers(undefined, { firstName, lastName });
console.log("Response");
console.log(user);
console.log();

await sleep(500);

const putRes1 = await userController.putUser(
  { id: user.id },
  { activated: false }
);
console.log("Response");
console.log(putRes1);
console.log();

await sleep(500);

const putRes2 = await userController.putUser(
  { id: user.id },
  { activated: true }
);
console.log("Response");
console.log(putRes2);
console.log();

await sleep(500);

const info1 = await serviceInfoController.getInfo();
console.log("Response");
console.log(info1);
console.log();

await sleep(1000);

console.log("Finish");

dispatcher.stop();
