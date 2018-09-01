import "reflect-metadata";

const SPECIAL_FIELD = Symbol("special-field");
const SPECIAL_TYPE = Symbol("special-type");

export function SpecialFiledProcess(args: { value: string; count: number }, targetPrototype: any, propertyKey: string) {
    Reflect.defineMetadata(SPECIAL_FIELD, args, targetPrototype.constructor, propertyKey);
    Reflect.defineMetadata(SPECIAL_FIELD, args, targetPrototype, propertyKey);
    const meta: any[] = Reflect.getMetadata(SPECIAL_FIELD, targetPrototype.constructor) || {};
    meta[propertyKey] = args;
    Reflect.defineMetadata(SPECIAL_FIELD, meta, targetPrototype.constructor); // class
    Reflect.defineMetadata(SPECIAL_FIELD, meta, targetPrototype); // instance
}

export function SpecialTypeProcess<T extends { new(...args: any[]): {} }>(): (ctor: T) => any {

    return function (ctor: T): any {
        Reflect.defineMetadata(SPECIAL_TYPE, {}, ctor); // class
        Reflect.defineMetadata(SPECIAL_TYPE, {}, ctor.prototype); // instance

        if (!ctor.hasOwnProperty("__specialFields")) {
            Object.defineProperty(ctor, "__specialFields", {
                get: function () {
                    // return this.__specialFields;
                    return Reflect.getMetadata(SPECIAL_FIELD, ctor) || {}
                }
            });
        }
    }
}

