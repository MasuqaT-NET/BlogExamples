import {SpecialFiledProcess as process} from "./Core"

const defaultValues = {value: "special", count: 0};

export function SpecialField(targetPrototype: any, propertyKey: string): void;
export function SpecialField(args_: { value?: string; count?: number }): (targetPrototype: any, propertyKey: string) => void;
export function SpecialField(arg1: any, arg2?: string): any {
    if (typeof arg2 === 'string') {
        const args = defaultValues;
        const targetPrototype: any = arg1;
        const propertyKey = arg2;
        process(args, targetPrototype, propertyKey);
    } else {
        {
            const args = {...defaultValues, ...arg1};
            return (targetPrototype: any, propertyKey: string) => process(args, targetPrototype, propertyKey)
        }
    }
}