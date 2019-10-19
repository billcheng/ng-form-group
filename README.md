# nodejs-ng-form
Similar to Angular Reactive Form "API" but on the server side.

# How To Install
```bash
npm i nodejs-ng-form
```
or
```bash
yarn nodejs-ng-form
```

# Example
```javascript
import { formBuilder } from 'nodejs-ng-form'

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
