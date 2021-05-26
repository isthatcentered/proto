import * as E from "fp-ts/Either"
import { pipe } from "fp-ts/lib/function"
import * as O from "fp-ts/Option"
import { flow } from "fp-ts/function"




type Person = {
	tall: boolean,
	name: string,
	age: number
}

type ParseFailure = string



abstract class Parser<A>
{
	
	abstract partialParse( args: string[] ): E.Either<ParseFailure, [ string[], A ]>
	
	
	abstract usage: string
	
	
	parse( args: string[] ): E.Either<ParseFailure, A>
	{
		return pipe(
			this.partialParse( args ),
			E.chain( ( [ unparsed, value ] ) =>
				unparsed.length ?
				E.left( `Unrecognized Argumens: "${unparsed}"` ) :
				E.right( value ) ),
		)
	}
}

const pure = <A>( a: A ): Parser<A> => new class extends Parser<A>
{
	partialParse( args: string[] ): E.Either<ParseFailure, [ string[], A ]>
	{
		return E.right( [ args, a ] );
	}
	
	
	usage: string = ""
}


const ap = <A, B>( fab: Parser<( a: A ) => B>, fa: Parser<A> ): Parser<B> =>
	new class extends Parser<B>
	{
		partialParse( args: string[] ): E.Either<ParseFailure, [ string[], B ]>
		{
			return pipe(
				fa.partialParse( args ),
				E.chain( ( [ nextArgs, value ] ) =>
					pipe(
						fab.partialParse( nextArgs ),
						E.chain( ( [ nextArgs, fn ] ) => E.right( [ nextArgs, fn( value ) ] ) ),
					) ),
			)
		}
		
		
		// Compared to flatMap, in ap, the function sits “inside” the Parser,
		// so we have direct access to both Parsers when composing them,
		// and can look at both usage strings.
		usage: string = [ fa.usage, fab.usage ].filter( v => !!v ).join( " " )
	}


const flatMap = <A, B>( fa: Parser<A>, afb: ( a: A ) => Parser<B> ): Parser<B> =>
	new class extends Parser<B>
	{
		partialParse( args: string[] ): E.Either<ParseFailure, [ string[], B ]>
		{
			return pipe(
				fa.partialParse( args ),
				E.chain( ( [ nextArgs, value ] ) => afb( value ).partialParse( nextArgs ) ),
			)
		}
		
		
		usage: string = `${fa.usage} -> flatMap` // <- I'm fucked, I don't know what the other parser will be
	}

const andParser = <A, B>( left: Parser<A>, right: Parser<B> ): Parser<[ A, B ]> => new class extends Parser<[ A, B ]>
{
	partialParse( args: string[] ): E.Either<ParseFailure, [ string[], [ A, B ] ]>
	{
		return pipe(
			left.partialParse( args ),
			E.chain( ( [ nextArgs, a ] ) =>
				pipe(
					right.partialParse( nextArgs ),
					E.map( ( [ nextArgs, b ] ) => [ nextArgs, [ a, b ] ] ),
				),
			),
		);
	}
	
	
	usage: string = `(${left.usage} && ${right.usage})` // <- I can inspect & define
}


const orParser = <A>( left: Parser<A>, right: Parser<A> ): Parser<A> => new class extends Parser<A>
{
	partialParse( args: string[] ): E.Either<ParseFailure, [ string[], A ]>
	{
		return pipe(
			left.partialParse( args ),
			E.orElse( () => right.partialParse( args ) ),
		);
	}
	
	
	usage: string = `(${left.usage} || ${right.usage})`
}

const flagParser = ( name: string ): Parser<boolean> => new class extends Parser<boolean>
{
	usage = `--${name}`
	
	
	partialParse( args: string[] ): E.Either<ParseFailure, [ string[], boolean ]>
	{
		return E.right( [ args.filter( arg => arg !== `--${name}` ), args.includes( `--${name}` ) ] );
	}
}

// Each applicative can use the previous F[] result.
const sequence = <A, B, C>( parsers: [ Parser<A>, Parser<B>, Parser<C> ] ): Parser<[ A, B, C ]> =>
	parsers.reduce( ( acc, curr ) => {
		const concat = ap( pure( ( values: (A | B | C)[] ) => ( value: A | B | C ) => [ ...values, value ] as [ A, B, C ] ), acc )
		return ap( concat, curr as Parser<A | B | C> )
	}, pure( [] ) as any as Parser<[ A, B, C ]> )


test( ``, () => {
	const blah = sequence( [ flagParser( "hello" ), flagParser( "world" ), flagParser( "indeed" ) ] ).parse( [ "--hello", "--world", "--indeed" ] )
	
	expect( blah ).toEqual( E.right( [ true, true, true ] ) )
} )

test( `Applicatives to the rescue`, () => {
	// <*> = ap
	// <$> = map
	const multiply = ( by: number ) => ( n: number ) => n * by
	expect( pipe(
		O.some( multiply ),
		O.ap( O.some( 5 ) ),
		O.ap( O.some( 5 ) ),
	) ).toEqual( O.some( 25 ) ) // pure (*) <*> (Just 4) <*> (Just 5)
} )

test( `With dependant args`, () => {
	type Validation<A, B> = {
		name: string,
		run: ( a: A ) => E.Either<{ validator: string, message: string }, B>
	}
	
	const pure = <A>( a: A ): Validation<never, A> => ({
		name: `pure(${a})`,
		run:  () => E.right( a ),
	})
	
	const string: Validation<unknown, string> = ({
		name: "string",
		run:  E.fromPredicate(
			( thing ): thing is string => typeof thing === "string",
			value => ({
				validator: "string",
				message:   `Expected a string got <${typeof value}> "${value}"`,
			}),
		),
	})
	
	const notEmpty: Validation<string, string> = ({
		name: "notEmpty",
		run:  E.fromPredicate(
			( str: string ) => str.trim() !== "",
			() => ({
				message: `Cannot be empty`, validator: "notEmpty",
			}),
		),
	})
	
	// the type of the validators left & right is already fixed/known, not computed, so we can introspect & shit
	const and = <A, B, C>( left: Validation<A, B>, right: Validation<B, C>, name: string ): Validation<A, C> => ({
		name: `${name}(${left.name} && ${right.name})`,
		run:
		      flow(
			      left.run,
			      E.chain( right.run ),
			      E.mapLeft( err => ({
				      ...err,
				      validator: `${name}(${left.name} && ${right.name})`,
			      }) ),
		      ),
	})
	
	// console.log( and( string, notEmpty, "nonEmptyString" ).run( 4 ) )
} )
