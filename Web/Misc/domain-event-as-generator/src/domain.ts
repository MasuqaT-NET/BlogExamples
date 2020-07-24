import { v4 } from "https://deno.land/std/uuid/mod.ts";

export class UserId {
  constructor(public value: string) {}
}

// @jsonSerializable
// @jsonDeserializable
export class User {
  readonly #firstName: string;
  readonly #lastName: string;
  #activated: boolean;

  private constructor(
    readonly id: UserId,
    firstName: string,
    lastName: string,
    activated: boolean
  ) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#activated = activated;
  }

  public *activate() /*: Generator<DomainEvent, void>*/ {
    if (!this.#activated) {
      this.#activated = true;

      yield UserActivated.create(this.id);
    }
  }

  public *deactivate() /*: Generator<DomainEvent, void>*/ {
    if (this.#activated) {
      this.#activated = false;

      yield UserDeactivated.create(this.id);
    }
  }

  // jsonSerializable
  public serializeToJson() {
    return {
      id: this.id.value,
      firstName: this.#firstName,
      lastName: this.#lastName,
      activated: this.#activated,
    };
  }

  // jsonDeserializable
  public static deserializeFromJson({
    id,
    firstName,
    lastName,
    activated,
  }: ReturnType<User["serializeToJson"]>) {
    const userId = new UserId(id);
    return new User(userId, firstName, lastName, activated);
  }

  public static *createNew(
    firstName: string,
    lastName: string
  ) /*: Generator<DomainEvent, User>*/ {
    const userId = new UserId(v4.generate());
    const newUser = new User(userId, firstName, lastName, true);

    yield NewUserCreated.create(userId);

    return newUser;
  }
}

export class EventId {
  constructor(public value: string) {}
}

export abstract class DomainEvent {
  protected constructor(readonly eventId: EventId, readonly occurredOn: Date) {}

  public abstract serializeToJson(): {
    __name: string;
    eventId: EventId;
    occurredOn: Date;
  };

  public serializeToString() {
    return JSON.stringify(this.serializeToJson());
  }

  public static deserializeEventFromString(
    str: string
  ): DomainEvent | undefined {
    // need validation logic
    try {
      const event = JSON.parse(str) as ReturnType<
        DomainEvent["serializeToJson"]
      >;
      // should automatically generated
      switch (event.__name) {
        case "UserActivated":
          return UserActivated.deserializeFromJson(event as any);
        case "UserDeactivated":
          return UserDeactivated.deserializeFromJson(event as any);
        case "NewUserCreated":
          return NewUserCreated.deserializeFromJson(event as any);
      }
    } catch (_) {
      return undefined;
    }
  }
}

// @jsonSerializable
// @jsonDeserializable
export class UserActivated extends DomainEvent {
  private constructor(
    eventId: EventId,
    occurredOn: Date,
    readonly userId: UserId
  ) {
    super(eventId, occurredOn);
  }

  public static create(userId: UserId) {
    return new UserActivated(new EventId(v4.generate()), new Date(), userId);
  }

  // jsonDeserializable
  public serializeToJson() {
    return {
      __name: "UserActivated",
      eventId: this.eventId,
      occurredOn: this.occurredOn,
      userId: this.userId,
    };
  }

  // jsonDeserializable
  public static deserializeFromJson({
    eventId,
    occurredOn,
    userId,
  }: ReturnType<UserActivated["serializeToJson"]>) {
    return new UserActivated(eventId, occurredOn, userId);
  }
}

// @jsonSerializable
// @jsonDeserializable
export class UserDeactivated extends DomainEvent {
  private constructor(
    eventId: EventId,
    occurredOn: Date,
    readonly userId: UserId
  ) {
    super(eventId, occurredOn);
  }

  public static create(userId: UserId) {
    return new UserDeactivated(new EventId(v4.generate()), new Date(), userId);
  }

  // jsonDeserializable
  public serializeToJson() {
    return {
      __name: "UserDeactivated",
      eventId: this.eventId,
      occurredOn: this.occurredOn,
      userId: this.userId,
    };
  }

  // jsonDeserializable
  public static deserializeFromJson({
    eventId,
    occurredOn,
    userId,
  }: ReturnType<UserDeactivated["serializeToJson"]>) {
    return new UserDeactivated(eventId, occurredOn, userId);
  }
}

// @jsonSerializable
// @jsonDeserializable
export class NewUserCreated extends DomainEvent {
  private constructor(
    eventId: EventId,
    occurredOn: Date,
    readonly userId: UserId
  ) {
    super(eventId, occurredOn);
  }

  public static create(userId: UserId) {
    return new NewUserCreated(new EventId(v4.generate()), new Date(), userId);
  }

  // jsonDeserializable
  public serializeToJson() {
    return {
      __name: "NewUserCreated",
      eventId: this.eventId,
      occurredOn: this.occurredOn,
      userId: this.userId,
    };
  }

  // jsonDeserializable
  public static deserializeFromJson({
    eventId,
    occurredOn,
    userId,
  }: ReturnType<NewUserCreated["serializeToJson"]>) {
    return new NewUserCreated(eventId, occurredOn, userId);
  }
}
