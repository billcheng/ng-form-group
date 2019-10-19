export type FormGroupEntry = { [controlName: string]: unknown[] | unknown }
export type FormGroupArray = unknown[]

export interface Valid {
    valid: boolean
    hasError(errorCode: string): boolean
}
