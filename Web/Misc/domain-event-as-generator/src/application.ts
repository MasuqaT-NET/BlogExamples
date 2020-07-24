import { User, UserId } from "./domain.ts";

export interface UserRepository {
  save(user: User): Promise<void>;
  get(userId: UserId): Promise<User | undefined>;
}

export interface ServiceInfoRepository {
  save(info: [number]): Promise<void>;
  get(): Promise<[number]>;
}

class UserNotFoundError extends Error {
  constructor(id: UserId) {
    super(`User with id ${id.value} not found`);
  }
}

// @autoHandleEvents
export class UserService {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  // @transactional
  public async *createUser(firstName: string, lastName: string) {
    const user = yield* User.createNew(firstName, lastName);

    await this.#userRepository.save(user);

    return user;
  }

  // @transactional
  public async *activateUser(id: string) {
    const userId = new UserId(id);

    const user = await this.#userRepository.get(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    yield* user.activate();

    await this.#userRepository.save(user);
  }

  // @transactional
  public async *deactivateUser(id: string) {
    const userId = new UserId(id);

    const user = await this.#userRepository.get(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    yield* user.deactivate();

    await this.#userRepository.save(user);
  }
}

// @autoHandleEvents
export class ServiceInfoService {
  readonly #serviceInfoRepository: ServiceInfoRepository;

  constructor(serviceInfoRepository: ServiceInfoRepository) {
    this.#serviceInfoRepository = serviceInfoRepository;
  }

  // @transactional
  public async *incrementRegisteredUsers() {
    const [count] = await this.#serviceInfoRepository.get();
    await this.#serviceInfoRepository.save([count + 1]);
  }

  // @transactional({ readOnly: true })
  public async *showInfo() {
    const info = await this.#serviceInfoRepository.get();
    return {
      users: info[0],
    };
  }
}
