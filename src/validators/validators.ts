export type ValidatorResult = null | { [error: string]: any }

export type ValidatorFn<T> = (value: T) => ValidatorResult

export class Validators {

    static required = (value: any): ValidatorResult => value === null || value === '' || value === undefined ? { required: true } : null
    static min = (min: number): ValidatorFn<number> => (value: number): ValidatorResult => value >= min ? null : { min: { min, value } }
    static max = (max: number): ValidatorFn<number> => (value: number): ValidatorResult => value <= max ? null : { max: { max, value } }
    static requiredTrue = (value: boolean): ValidatorResult => value === true ? null : { requiredTrue: { value } }
    static email = (value: string): ValidatorResult => Validators.isValidEmail(value) ? null : { email: { value } }
    static minLength = (minLen: number): ValidatorFn<string> => (value: string): ValidatorResult => value && value.length >= minLen ? null : { minLength: { value, minLength: minLen } }
    static maxLength = (maxLen: number): ValidatorFn<string> => (value: string): ValidatorResult => value && value.length <= maxLen ? null : { maxLength: { value, maxLength: maxLen } }
    static pattern = (pattern: string | RegExp): ValidatorFn<string> => (value: string): ValidatorResult => Validators.isPatternValid(pattern, value) ? null : { pattern: { value, pattern } }
    static nullValidator = (value: any | null): ValidatorResult => value === null ? null : { nullValidator: { value } }
    static compose = (validators: ValidatorFn<any>[]) => (value: any) => {
        const potentialResult = validators.reduce((r, validator) => {
            const v = validator(value)
            return v ? { ...r, ...v } : r
        }, {})

        return Object.keys(potentialResult).length === 0 ? null : potentialResult
    }

    private static isValidEmail(value: string): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    }

    private static isPatternValid(pattern: string | RegExp, value: string): boolean {
        const r = typeof pattern === 'string' ? new RegExp(pattern) : pattern
        return r.test(value)
    }

}