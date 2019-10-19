# ng-form-group
Similar to Angular Reactive Form "API" but on the server side.

# Example
```javascript
import { formBuilder } from 'ng-form-group'

function validate(name, address, city, zipcode) {
    const form = formBuilder.group({
        name: [name, Validators.required],
        address: [address, Validators.required],
        city: [city, Validators.required],
        zipcode: [zipcode,
            Validators.compose([
                Validators.required,
                Validators.pattern(/\d{5}/)
                ])
        ]
    })

    return form.valid
}
```
