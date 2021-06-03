import * as O from "fp-ts/Option"
// -------------------------------------------------------------------------------------
// Typeclass instances
// -------------------------------------------------------------------------------------
import { Functor1 } from "fp-ts/lib/Functor"
import { flow, Lazy } from "fp-ts/function"
import * as TPL from "fp-ts/Tuple"
import { Applicative1 } from "fp-ts/Applicative"
import { constant, pipe } from "fp-ts/lib/function"
import * as AR from "fp-ts/Array"
import * as AP from "fp-ts/Apply"
import { Alternative1 } from "fp-ts/Alternative"
import { Kind, URIS } from "fp-ts/HKT"

// -------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------
export const JsonBoolTrue = { tag: "JsonBoolTrue" } as const
export const JsonBoolFalse = { tag: "JsonBoolFalse" } as const
export const JsonNull = { tag: "JsonNull" } as const
export const JsonNumber = ( value: number ) => ({ tag: "JsonNumber", value }) as const
export const JsonString = { tag: "JsonString" } as const
export const JsonArray = { tag: "JsonArray" } as const
export const JsonObject = { tag: "JsonObject" } as const
type JsonBool =
	| typeof JsonBoolTrue
	| typeof JsonBoolFalse

type JsonNull = typeof JsonNull
type JsonNumber = ReturnType<typeof JsonNumber>
type JsonString = typeof JsonString
type JsonArray = typeof JsonArray
type JsonObject = typeof JsonObject
type JsonValue =
	| JsonNull
	| JsonBool
	| JsonNumber
	| JsonString
	| JsonArray
	| JsonObject

type Parser<A> = {
	run: ( value: string ) => O.Option<[ string, A ]>
}

type Char<A extends string> =
	A extends `${infer Char}${infer Rest}` ?
	(Rest extends "" ? Char : never) :
	never

// -------------------------------------------------------------------------------------
// Instances
// -------------------------------------------------------------------------------------
export const URI = "Parser"

export type URI = typeof URI

declare module "fp-ts/lib/HKT"
{
	interface URItoKind<A>
	{
		readonly Parser: Parser<A>
	}
}

interface Some1<F extends URIS> extends Alternative1<F>
{
	// Accepts 0 or more A
	some<A>( f: Kind<F, A> ): Kind<F, A[]>
}


export const Functor: Functor1<URI> = {
	URI,
	map: ( ma, f ) => ({ run: flow( ma.run, O.map( TPL.mapSnd( f ) ) ) }),
}

export const Applicative: Applicative1<URI> = {
	...Functor,
	of: a => ({ run: input => O.some( [ input, a ] ) }),
	ap: ( fab, fa ) => ({
		run: flow(
			fa.run,
			O.chain( ( [ rest, value ] ) =>
				pipe(
					fab.run( rest ),
					O.map( TPL.mapSnd( f => f( value ) ) ),
				) ),
		),
	}),
}

export const Alternative: Alternative1<URI> = {
	...Applicative,
	zero: () => ({ run: () => O.none }),
	alt:  ( fa, that ) => ({
		run: input => pipe(
			fa.run( input ),
			O.alt( () => that().run( input ) ),
		),
	}),
	
}


// -------------------------------------------------------------------------------------
// Typeclass members
// -------------------------------------------------------------------------------------
export const map = <A, B>( ab: ( a: A ) => B ) => ( fa: Parser<A> ): Parser<B> =>
	Functor.map( fa, ab )

export const ap = <A>( fa: Parser<A> ) => <B>( fab: Parser<( a: A ) => B> ): Parser<B> =>
	Applicative.ap( fab, fa )

export const apSecond = AP.apSecond( Applicative )

export const apFirst = AP.apFirst( Applicative )

export const altW = <B>( that: Lazy<Parser<B>> ) => <A>( fa: Parser<A> ): Parser<A | B> =>
	Alternative.alt( fa, that as Lazy<Parser<any>> )

export const alt = <A>( that: Lazy<Parser<A>> ) => ( fa: Parser<A> ): Parser<A> =>
	altW( that )( fa )

const of = <A>( a: A ): Parser<A> => Applicative.of( a )

// -------------------------------------------------------------------------------------
// Constructors
// -------------------------------------------------------------------------------------
export const charP = <A extends string>( char: A ): Parser<A> => ({
	run: input => {
		const [ head, ...rest ] = input.split( "" )
		return head === char ?
		       O.some( [ _join( rest ), head as A ] ) :
		       O.none
	},
})

export const stringP = <A extends string>( str: A ): Parser<A> =>
	pipe(
		AR.sequence( Applicative )( str.split( "" ).reverse().map( charP ) ), // []<Parser> -> Parser<[]>
		map( constant( str ) ),
	)

export const notEmpty = ( fa: Parser<string> ): Parser<string> => ({
	run: flow(
		fa.run,
		O.filter( ( [ _rest, value ] ) => value !== "" ),
	),
})



export const spanP = ( accept: ( curr: string, next: string | undefined ) => boolean ): Parser<string> =>
	pipe(
		({
			run: input => pipe(
				input.split( "" ),
				_span( accept ),
				TPL.swap,
				TPL.bimap( _join, _join ),
				O.some,
			),
		}),
		notEmpty,
	)

export const some = <A>( p: Parser<A> ): Parser<A[]> => ({
	run: input => {
		
		const firstResult = p.run( input )
		if ( O.isNone( firstResult ) ) {
			return O.none
		}
		
		const rest = pipe(
			firstResult,
			O.map( TPL.fst ),
			O.getOrElse( () => "" ),
		)
		
		const blah = pipe(
			// some(p).run(rest),
			O.of( ( a: [ string, A ] ) => ( as: [ string, A[] ] ): [ string, A[] ] => [ TPL.fst( a ), [ ...TPL.snd( as ), TPL.snd( a ) ] ] ),
			O.ap( firstResult ),
		)
		return pipe( firstResult, O.map( TPL.mapSnd( AR.of ) ) )
		
		
		
		return null as any
	},
})

// -------------------------------------------------------------------------------------
// Primitives
// -------------------------------------------------------------------------------------
const _quote = charP( "\"" )
const _anyCharUntilNonEscapedQuote = spanP( ( char, nextChar ) => char !== "\"" && `${char}${nextChar}` !== "\"" )
export const stringLitteral: Parser<string> = pipe(
	_quote,
	apSecond( _anyCharUntilNonEscapedQuote ),
	apFirst( _quote ),
)


export const jsonNull: Parser<JsonNull> = pipe(
	stringP( "null" ),
	map( constant( JsonNull ) ),
)

export const jsonBool: Parser<JsonBool> = Alternative.alt<JsonBool>(
	pipe( stringP( "true" ), map( constant( JsonBoolTrue ) ) ),
	() => pipe( stringP( "false" ), map( constant( JsonBoolFalse ) ) ),
)

export const jsonNumber: Parser<JsonNumber> = pipe(
	spanP( _isStringNumber ),
	map( parseInt ),
	map( JsonNumber ),
)

// -------------------------------------------------------------------------------------
// Private
// -------------------------------------------------------------------------------------
const _join = ( chars: string[] ): string => chars.join( "" )


const _span = <T>( accept: ( curr: T, next: T | undefined ) => boolean ) => ( arr: T[] ): [ init: T[], rest: T[] ] =>
	pipe(
		arr.findIndex( ( curr, index, arr ) => !accept( curr, arr[ index + 1 ] ) ),
		matchFailedIndex =>
			matchFailedIndex === -1 ?
			[ arr, [] ] :
			pipe( arr, AR.splitAt( matchFailedIndex ) ),
	)


function _isStringNumber( char: string )
{
	return !isNaN( parseInt( char ) )
}
