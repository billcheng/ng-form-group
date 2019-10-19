import { FormGroupEntry, FormGroupArray } from "./interface"
import { Form } from "./form"
import { FormArray } from "./form-array"

class FormBuilder {
    group(formControls: FormGroupEntry): Form {
        return new Form(formControls)
    }

    array(formControls: FormGroupArray): FormArray {
        return new FormArray(formControls)
    }
}

export const formBuilder = new FormBuilder()