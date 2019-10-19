import { FormControl } from "./form-control"
import { FormArray } from "./form-array"
import { FormGroupEntry } from "./interface"

export class Form {
    formControls: Map<string, FormControl | FormArray>

    constructor(formControls: FormGroupEntry) {
        this.formControls = new Map(
            Object.entries(formControls)
                .map(([key, value]) => ([key, value instanceof FormArray ? value : new FormControl(value)]))
        )
    }

    get(formControlName: string): FormControl | FormArray | undefined {
        return this.formControls.get(formControlName)
    }

    get valid(): boolean {
        return [...this.formControls.values()].every(p => p.valid)
    }

    hasError(errorCode: string): boolean {
        return [...this.formControls.values()].some(p => p.hasError(errorCode))
    }
}