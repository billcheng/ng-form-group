import { test } from 'jasmine-gherkin'
import { formBuilder } from './form-builder'
import { Validators } from '../validators/validators';
import { Form } from './form';
import { FormControl } from './form-control';

describe('FormBuilder', () => {

    let form: Form

    test('Create form by using formBuilder.group')
        .given('a set of form conrols')
        .when('formBuilder.group is invoked', () => {
            form = formBuilder.group({
                name1: [],
                name2: []
            })
        })
        .then('a new form is generated', () => {
            expect(form).not.toBeNull()
        })
        .then('name1 formControl should be generated', () => {
            expect(form.get('name1')).not.toBeNull()
        })
        .then('name3 formControl should be undefined', () => {
            expect(form.get('name3')).toBeUndefined()
        })
        .run()

    test('Validate form with validator')
        .given('a set of form conrols with validator', () => {
            form = formBuilder.group({
                name1: ['hello', Validators.required]
            })
        })
        .when('formBuilder.valid is invoked')
        .then('it should validate the form', () => {
            expect(form.valid).toBeTruthy()
        })
        .then('hasError is false', () => {
            expect(form.hasError('required')).toBeFalsy()
        })
        .run()

    test('Validate form with validator')
        .given('a set of form conrols with validator', () => {
            form = formBuilder.group({
                name1: ['', Validators.required]
            })
        })
        .when('formBuilder.valid is invoked')
        .then('it should validate the form', () => {
            expect(form.valid).toBeFalsy()
        })
        .then('hasError is true', () => {
            expect(form.hasError('required')).toBeTruthy()
        })
        .run()

    test('Create form by using formBuilder.group')
        .given('a set of form conrols')
        .when('formBuilder.group is invoked', () => {
            form = formBuilder.group({
                name1: '',
                name2: ''
            })
        })
        .then('a new form is generated', () => {
            expect(form).not.toBeNull()
        })
        .run()

    test('Create form by using formBuilder.group')
        .given('a set of form conrols with Validators.compose', () => {
            form = formBuilder.group({
                name1: ['', Validators.compose([Validators.minLength(3), Validators.required])],
                name2: [false, Validators.requiredTrue],
                names: formBuilder.array([
                    ['A', Validators.pattern(/[B-Z]/)]
                ])
            })
        })
        .when('nothing')
        .then('a new form is generated', () => {
            expect(form).not.toBeNull()
        })
        .then('it has minLength error', () => {
            expect(form.hasError('minLength')).toBeTruthy()
        })
        .then('it has required error', () => {
            expect(form.hasError('required')).toBeTruthy()
        })
        .then('it has requiredTrue error', () => {
            expect(form.hasError('requiredTrue')).toBeTruthy()
        })
        .then('form is invalid', () => {
            expect(form.valid).toBeFalsy()
        })
        .when('name1 value has changed', () => {
            const x = form.get('name1') as FormControl;
            if (x)
                x.setValue('123')
        })
        .then('it should not have minLength error', () => {
            expect(form.hasError('minLength')).toBeFalsy()
        })
        .then('it should not have required error', () => {
            expect(form.hasError('required')).toBeFalsy()
        })
        .then('it has requiredTrue error', () => {
            expect(form.hasError('requiredTrue')).toBeTruthy()
        })
        .then('form is invalid', () => {
            expect(form.valid).toBeFalsy()
        })
        .then('it has pattern error', () => {
            expect(form.hasError('pattern')).toBeTruthy()
        })
        .run()


})