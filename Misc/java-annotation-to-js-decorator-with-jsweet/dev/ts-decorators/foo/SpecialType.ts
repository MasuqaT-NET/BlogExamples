import {SpecialTypeProcess as process} from "./Core";

export function SpecialType<T extends { new(...args: any[]): {} }>(): (ctor: T) => any {
    return process();
}
