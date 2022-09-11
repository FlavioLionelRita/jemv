/* eslint-disable @typescript-eslint/ban-types */
export enum PropertyType {
	null = 'null',
	any = 'any',
	boolean = 'boolean',
	integer = 'integer',
	decimal = 'decimal',
	string = 'string',
	date = 'date',
	time = 'time',
	datetime = 'datetime',
	object = 'object',
	array = 'array'
}

export interface ContentSchema {
	type:PropertyType
	required?:string[]
}

export interface PropertyNames {
	type:PropertyType
	minLength: number
}

export interface Contains {
	type:PropertyType
}

export interface Schema {
	$id?: string
	$schema?: string
	// https://json-schema.org/understanding-json-schema/structuring.html?highlight=ref
	$ref?: string
	$extends?: string
	// https://json-schema.org/understanding-json-schema/structuring.html?highlight=defs
	$defs: any

	title?: string
	name?: string
	type: PropertyType
	enum?: string[]
	items?: Schema
	properties?: any
	// Validation Keywords for Numeric Instances (number and integer)
	// https://json-schema.org/draft/2020-12/json-schema-validation.html
	// https://opis.io/json-schema/2.x/number.html
	minimum?: any
	maximum?: any
	exclusiveMaximum?: boolean
	exclusiveMinimum?: boolean
	multipleOf:number
	// Validation Keywords for Strings
	// https://opis.io/json-schema/2.x/string.html
	maxLength?: number
	minLength?: number
	format?: string
	pattern?: string
	contentEncoding?:string // TODO
	contentMediaType?:string // TODO
	contentSchema?:ContentSchema // TODO
	// Validation Keywords for Objects
	// https://opis.io/json-schema/2.x/object.html
	required?: string[]
	maxProperties?: number
	minProperties?: number
	propertyNames?: PropertyNames // TODO
	patternProperties?: any // TODO
	additionalProperties?: any // TODO
	unevaluatedProperties?: any // TODO
	dependentRequired?: any // TODO
	dependencies?: any // TODO
	dependentSchemas?: any // TODO
	// Validation Keywords for Arrays
	// https://opis.io/json-schema/2.x/array.html
	maxItems?: number
	minItems?: number
	uniqueItems?: boolean
	contains?:Contains // TODO
	maxContains?: number // TODO
	minContains?: number // TODO
	prefixItems?: any // TODO
	additionalItems?: any // TODO
	unevaluatedItems?: any // TODO
}

export interface Constraint {
	message: string
}

export interface FunctionConstraint extends Constraint {
	func: Function
}
export interface ConstraintBuilder
{
	build (property: Schema):Constraint[]
}

export interface ConstraintValidator
{
	apply (constraint: Constraint): boolean
	validate (constraint: Constraint, data: any): boolean
}

export interface BuildedSchema {
	$id?: string
	$defs?: any
	$ref?:string
	type: PropertyType
	properties?: any
	items?:BuildedSchema
	constraints: Constraint[]
}
export interface ValidateError {
	message:string
	path:string
}
export interface ValidateResult {
	errors:ValidateError[]
	valid: boolean
}
