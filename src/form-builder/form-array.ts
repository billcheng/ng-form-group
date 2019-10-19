import { Valid, FormGroupArray } from "./interface"
import { FormControl } from "./form-control"

export class FormArray implements Valid {
    formArray: FormControl[] = []

    constructor(formControls: FormGroupArray) {
        this.formArray = formControls.map(formControl => new FormControl(formControl))
    }

    get(index: number): FormControl | undefined {
        return index < this.formArray.length ? this.formArray[index] : undefined
    }

    get valid(): boolean {
        return this.formArray.every(p => p.valid)
    }

    hasError(errorCode: string) {
        return this.formArray.some(p => p.hasError(errorCode))
    }
}