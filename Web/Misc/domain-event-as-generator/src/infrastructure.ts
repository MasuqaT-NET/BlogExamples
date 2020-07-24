import { DomainEvent, UserId, User } from "./domain.ts";
import {
  ServiceInfoRepository,
  ServiceInfoService,
  UserRepository,
  UserService,
} from "./application.ts";
import {
  AllEventListener,
  NewUserCreatedEventListener,
  EventListener,
  EventHandled,
  UserController,
  ServiceInfoController,
} from "./controller-listener.ts";

class MessageQueue {
  #queue = [] as string[];

  public produce(message: string) {
    this.#queue.push(message);
  }

  public consume() {
    return this.#queue.shift();
  }
}

const messageQueue = new MessageQueue();

export class EventQueueDispatcher {
  #handle: number | undefined;
  #listeners: EventListener[] = [];

  constructor(private milliseconds: number) {}

  public start() {
    this.#handle = setInterval(this.handler.bind(this), this.milliseconds);
  }

  public stop() {
    if (typeof this.#handle === "number") {
      clearInterval(this.#handle);
    }
  }

  private async handler() {
    while (true) {
      const message = messageQueue.consume();
      if (!message) {
        return;
      }

      const event = DomainEvent.deserializeEventFromString(message);
      if (!event) {
        return;
      }

      for (const listener of this.#listeners) {
        if (
          listener.listenTo === "all" ||
          listener.listenTo.some((eventType) => event instanceof eventType)
        ) {
          await listener.dispatch(event);
        }
      }
    }
  }

  addListener(listener: EventListener) {
    this.#listeners.push(listener);
  }
}

function isGenerator(arg: unknown): arg is Generator {
  // @ts-ignore
  return typeof arg === "object" && arg[Symbol.toStringTag] === "Generator";
}

function isAsyncGenerator(arg: unknown): arg is AsyncGenerator {
  return (
    // @ts-ignore
    typeof arg === "object" && arg[Symbol.toStringTag] === "AsyncGenerator"
  );
}

class EventReceiver {
  receive<T>(arg: T | Generator<DomainEvent, T>): T;
  receive<T>(arg: Promise<T> | AsyncGenerator<DomainEvent, T>): Promise<T>;
  receive<T>(
    arg:
      | T
      | Generator<DomainEvent, T>
      | Promise<T>
      | AsyncGenerator<DomainEvent, T>
  ): T | Promise<T> {
    if (isAsyncGenerator(arg)) {
      return new Promise(async (resolve) => {
        while (true) {
          const result = await arg.next();

          if (result.done) {
            return resolve(result.value);
          }

          EventReceiver.emitToQueue(result.value);
        }
      });
    } else if (isGenerator(arg)) {
      while (true) {
        const result = arg.next();

        if (result.done) {
          return result.value;
        }

        EventReceiver.emitToQueue(result.value);
      }
    } else {
      return arg;
    }
  }

  private static emitToQueue(event: DomainEvent) {
    messageQueue.produce(event.serializeToString());
  }
}

function serviceProxyFactory(eventReceiver: EventReceiver) {
  return <T extends {}>(a: T): EventHandled<T> =>
    new Proxy(a, {
      get(target, p) {
        if (p in target) {
          // @ts-ignore
          if (typeof target[p] !== "function") {
            // @ts-ignore
            return target[p];
          }
          // @ts-ignore
          return (...args: any[]) => eventReceiver.receive(target[p](...args));
        }
      },
    }) as any;
}

class MemoryUserRepository implements UserRepository {
  readonly #map = new Map<string, ReturnType<User["serializeToJson"]>>();

  async save(user: User) {
    const data = user.serializeToJson();
    this.#map.set(user.id.value, data);
  }
  async get(userId: UserId) {
    const raw = this.#map.get(userId.value);
    if (raw) {
      return User.deserializeFromJson(raw);
    }
  }
}

class MemoryServiceInfoRepository implements ServiceInfoRepository {
  counter = 0;

  async save(info: [number]) {
    this.counter = info[0];
  }

  async get() {
    return [this.counter] as [number];
  }
}

// DI

const eventReceiver = new EventReceiver();

const serviceProxy = serviceProxyFactory(eventReceiver);

const serviceRegistry = {
  user: serviceProxy(new UserService(new MemoryUserRepository())),
  serviceInfo: serviceProxy(
    new ServiceInfoService(new MemoryServiceInfoRepository())
  ),
};

const listenerRegistry = [
  new AllEventListener(),
  new NewUserCreatedEventListener(serviceRegistry.serviceInfo),
];

const controllerRegistry = {
  user: new UserController(serviceRegistry.user),
  serviceInfo: new ServiceInfoController(serviceRegistry.serviceInfo),
};

export function getEventListenerRegistry() {
  return listenerRegistry;
}

export function getControllerRegistry() {
  return controllerRegistry;
}
