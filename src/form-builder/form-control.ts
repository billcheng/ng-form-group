import { Valid } from './interface'

export class FormControl implements Valid {

    private _value: unknown
    private _validator: Function | null
    private _errors: unknown[]

    constructor(arrayOrPrimitive: unknown[] | unknown) {
        if (Array.isArray(arrayOrPrimitive))
            this.setupControlUsingArray(arrayOrPrimitive)
        else
            this.setupControlAsPrimitiveValue(arrayOrPrimitive)
    }

    private setupControlUsingArray(array: unknown[]) {
        const [value, validator] = array
        this._validator = validator as Function
        this.setValue(value)
    }

    private setupControlAsPrimitiveValue(primitive: unknown) {
        this._value = primitive
        this._validator = null
    }

    get validator(): Function | null | undefined {
        return this._validator
    }

    get value(): unknown {
        return this._value
    }

    setValue(value: unknown) {
        this._value = value
        const validator = this.validator
        this._errors = validator ? validator(value) : null
    }

    get valid(): boolean {
        return this._errors ? Object.keys(this._errors).length === 0 : true
    }

    hasError(errorCode: string) {
        return this._errors ? new Set(Object.keys(this._errors)).has(errorCode) : false
    }

}