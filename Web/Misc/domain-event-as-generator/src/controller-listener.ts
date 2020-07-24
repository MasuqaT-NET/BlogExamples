import { ServiceInfoService, UserService } from "./application.ts";
import { DomainEvent, NewUserCreated } from "./domain.ts";

export type EventHandled<T> = {
  [K in keyof T]: T[K] extends (
    ...args: infer P
  ) => AsyncGenerator<any, infer R>
    ? (...args: P) => Promise<R>
    : T[K] extends (...args: infer P) => Generator<any, infer R>
    ? (...args: P) => R
    : T[K];
};

export interface EventListener<T extends DomainEvent = DomainEvent> {
  dispatch(event: T): Promise<void>;
  listenTo: (Function & { prototype: T })[] | "all";
}

export class AllEventListener implements EventListener {
  get listenTo() {
    return "all" as const;
  }

  async dispatch(event: DomainEvent): Promise<void> {
    console.warn("Storing domain event...");
    console.warn(event);
    console.warn();
  }
}

export class NewUserCreatedEventListener implements EventListener {
  #serviceInfoService: EventHandled<ServiceInfoService>;

  constructor(serviceInfoService: EventHandled<ServiceInfoService>) {
    this.#serviceInfoService = serviceInfoService;
  }

  get listenTo() {
    return [NewUserCreated];
  }

  async dispatch(_: NewUserCreated): Promise<void> {
    await this.#serviceInfoService.incrementRegisteredUsers();
  }
}

// @controller
export class UserController {
  #userService: EventHandled<UserService>;

  constructor(userService: EventHandled<UserService>) {
    this.#userService = userService;
  }

  // @post("/users")
  // @body({ firstName: String, lastName: String })
  public async postUsers(
    _: undefined,
    {
      firstName,
      lastName,
    }: {
      firstName: string;
      lastName: string;
    }
  ) {
    console.debug("Receive POST: /users");
    console.debug({ firstName, lastName });

    const user = await this.#userService.createUser(firstName, lastName);

    return user.serializeToJson();
  }

  // @put(`/users/${{ id: String }}`)
  // @body({ activated: Boolean })
  public async putUser(
    { id }: { id: string },
    { activated }: { activated: boolean }
  ) {
    console.debug(`Receive PUT: /users/${id}`);
    console.debug({ id, activated });

    try {
      if (activated) {
        await this.#userService.activateUser(id);
      } else {
        await this.#userService.deactivateUser(id);
      }

      return { succeeded: true };
    } catch (e) {
      return { succeeded: false, reason: e.message };
    }
  }
}

// @controller
export class ServiceInfoController {
  #serviceInfoService: EventHandled<ServiceInfoService>;

  constructor(serviceInfoService: EventHandled<ServiceInfoService>) {
    this.#serviceInfoService = serviceInfoService;
  }

  // @get("/info")
  public async getInfo() {
    console.debug("Received GET: /info");

    return await this.#serviceInfoService.showInfo();
  }
}
