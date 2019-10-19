import { test } from 'jasmine-gherkin'
import { Validators, ValidatorResult, ValidatorFn } from './validators';

describe('Validator', () => {

    let result: ValidatorResult
    let validatorFn: ValidatorFn<any>

    test('Require')
        .given('value as integer 0')
        .when('require validator is invoked', () => {
            result = Validators.required(0)
        })
        .then('I should get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('Require')
        .given('value as null')
        .when('require validator is invoked', () => {
            result = Validators.required(null)
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                required: true
            })
        })
        .run()

    test('Require')
        .given('value as undefined')
        .when('require validator is invoked', () => {
            result = Validators.required(undefined)
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                required: true
            })
        })
        .run()

    test('Min')
        .given('a minimum of 3.5', () => {
            validatorFn = Validators.min(3.5)
        })
        .when('minimum validator to check with 5', () => {
            result = validatorFn(5)
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .when('minimum validator to check with 2', () => {
            result = validatorFn(2)
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                min: {
                    min: 3.5,
                    value: 2
                }
            })
        })
        .run()

    test('Max')
        .given('a maximum of 3', () => {
            validatorFn = Validators.max(3)
        })
        .when('maximum validator to check with 5', () => {
            result = validatorFn(5)
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                max: {
                    max: 3,
                    value: 5
                }
            })
        })
        .when('maximum validator to check with 2', () => {
            result = validatorFn(2)
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('requiredTrue')
        .given('a control with value=true')
        .when('validator is invoked', () => {
            result = Validators.requiredTrue(true)
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('requiredTrue')
        .given('a control with value=false')
        .when('validator is invoked', () => {
            result = Validators.requiredTrue(false)
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                requiredTrue: {
                    value: false
                }
            })
        })
        .run()

    test('email')
        .given('a control with a valid email')
        .when('validator is invoked', () => {
            result = Validators.email('abc@abc.com')
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('email')
        .given('a control with an invalid email')
        .when('validator is invoked', () => {
            result = Validators.email('abc@abc')
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                email: {
                    value: 'abc@abc'
                }
            })
        })
        .run()

    test('minLength')
        .given('a control with string "ABC"', () => {
            validatorFn = Validators.minLength(2)
        })
        .when('validator is invoked with min length 2', () => {
            result = validatorFn('ABC')
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('minLength')
        .given('a control with string "ABC"', () => {
            validatorFn = Validators.minLength(5)
        })
        .when('validator is invoked with min length 5', () => {
            result = validatorFn('ABC')
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                minLength: {
                    value: 'ABC',
                    minLength: 5
                }
            })
        })
        .run()

    test('maxLength')
        .given('a control with string "ABC"', () => {
            validatorFn = Validators.maxLength(5)
        })
        .when('validator is invoked with max length 5', () => {
            result = validatorFn('ABC')
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('maxLength')
        .given('a control with string "ABC"', () => {
            validatorFn = Validators.maxLength(2)
        })
        .when('validator is invoked with min length 2', () => {
            result = validatorFn('ABC')
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                maxLength: {
                    value: 'ABC',
                    maxLength: 2
                }
            })
        })
        .run()

    test('pattern')
        .given('A pattern of \\d\\d', () => {
            validatorFn = Validators.pattern(/^\d\d$/g)
        })
        .when('validator is invoked with "12"', () => {
            result = validatorFn('12')
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('pattern')
        .given('A pattern of \\d\\d', () => {
            validatorFn = Validators.pattern(/^\d\d$/g)
        })
        .when('validator is invoked with "1"', () => {
            result = validatorFn('1')
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                pattern: {
                    value: '1',
                    pattern: /^\d\d$/g
                }
            })
        })
        .run()

    test('nullValidator')
        .given('a value of null')
        .when('validator is invoked', () => {
            result = Validators.nullValidator(null)
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('nullValidator')
        .given('a value of NOT null')
        .when('validator is invoked', () => {
            result = Validators.nullValidator('123')
        })
        .then('I should get an error', () => {
            expect(result).toEqual({
                nullValidator: {
                    value: '123'
                }
            })
        })
        .run()

    test('compose')
        .given('a value of "123"')
        .when('a bunch of validators are invoked', () => {
            result = Validators.compose([Validators.required, Validators.maxLength(5)])('123')
        })
        .then('I should NOT get an error', () => {
            expect(result).toBeNull()
        })
        .run()

    test('compose')
        .given('a value of null')
        .when('a bunch of validators are invoked', () => {
            result = Validators.compose([Validators.required, Validators.maxLength(5)])(null)
        })
        .then('I should NOT get an error', () => {
            expect(result).toEqual({
                required: true,
                maxLength: {
                    value: null,
                    maxLength: 5
                }
            })
        })
        .run()
})