// "Simple" Lisp parser
// https://www.typescriptlang.org/play?ts=4.1.0-pr-40336-88#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-rVaFi9s5wst07np9NLrPaPnI3-VLGrLVRd9TI9FQK26d1ueZwrrb8WSUpY6LtIW+3oSzTmkd+gx0TqnaAGdc6S3kco6x21Z7e6m3K0g19Qb7FupvDy6VoAvUOB9dNv1eaG04aDSGsNuWo1hqTvVlKCb23Nda-F51-bB1V1zYsgb7DZ1MuGxe+NGBsD1qGbl2rWd0vyd3VWgA5GV5aBmGFGbiz9ljgWmKqfxsViIpoQc8cax2lrj7csxuvFmBgSh7jDqsSWV70tVG0vnHolj1G73ee7VD2bxAuWLa4mG5T9jxVMElct797D2dKqlW1yteSielibjzhVuVz2uyvYmi7mOGdYBjQQB7g2mWPaEN1RAzwcJdlACBdhJOGuJc-Xayb1rZfSQxz5rH6EAVMFALAKVtB7v5qe0NhdiPStdNy-N1b62U5DnB2UzOv7od1OS82-7aO5fW4V9j1RZVkD44Ii79Xz3i0e4t8m+XO3iCC5jSwECJZU9SuHQo3rk77hp-d8kyk0nmSyd-Zl3K2rLNzYkatqpMPxuew51z5LfPOfKsF1qkXZq+EOCwOZZACKQ8YbXa0jaCKgX7NRVs5fWLoWbrX9yY7F7A90MM8w8WO+4tkWwpRBXu5Z+I9qzvjfgiXQWe74RuHtnY3fOj5bi0cXMMYeYVPoIrPr-gvjdjmssobpWAuG5goh5qQF5nRrHrnnlhtJ3qzsbkuoNH3sPm-rzhItgQLnZkLhtNqmanYlWuAJ4uiifCbKaJQczInFuvvvpofhDsfowXJufhRNDjfqRuhPQQijQePM5k-u+hgRHuIJAe5GdgSt-uYmAUOj8toDYguDFo3m3ozh3szryl3mzvgfztzhxngb3gYSPpYlQmakHpDuhrxGGjUk9PUpIYvrlO0p0ujEOMsvxp9iviCi8lsqugeGoMxqvvcnvtLiwWkkfuUqClsmfjpGoJfsgbRJ9o6LfiivcgEYgEEc6qIS-ipu-sinUgup4RIv6kMiEa8jslvlFDEW8oQCcpIr4afnVswVYcfrUXERftDlcqkXwekZUY8nfvcscrkdZrgb+jcv-C0n1CUZ7MvuUU0fcg-o4RUbES0eEW0dEX4bvjYVwWuDweir0f+kMWihCo-s-mMeLg0rUpNpnudt-nFssgoXdhATxmTqQBTiRPMTSMSliqPlQr9veiLv8dYvkBBNyLOBIOihyHeDSMisELOBaJilCk+kCVQk+KaHSh9gMkMpyloZxDoUdhLDAcXuYaCaIOCZCafIWDCT0vCYicxu7CSfoBiViWUT8VUaAMcoCcySCQUmCdFJCcroQLSXCbuAibxBBCSLOJyZCDKWkjCKAJpEySLqyZ8ZSBPoATPocZqeZAosyYxryWSQUk3LqbAPqcCVWlFkopVt9sxAaU4X1GaRaVQiBszJhhujUUweEc3oNAJuBsJlAqJjBnvE1Hpr6XjPuhto9MBlWq3PDIoPQfBr4tGY9N8UQopA6fjB6Y2IHCWqACAKAJYMgCuAWEwAEPoNwEIIGLACdtIbxgAdPsATYfjJmSLlVB6VIe9madqfwnPnlG2VQh2WuvEt8umYkWiQouhI2DmUaHmWWIWcWaWVgOWZWdWfcLWXTF-sms6SWA6YOQokrkwLgNqnpAeARK9guLwccc3C3mPk3EAnjNaW2rIcmmkWsDGrOvwmeSgIRP3BQSDM5l0sydeRWruB-NLGnA3NZKbgAuEQLJZKBRquBQusgo-OfK-NBc4YNFLkfJALQBZJzkhREChZ-lnp2u+Z+eij+ReToikiLsRbuMyYxBBCUhWmWjedqrOLyZiQuAhRwIcWkfxYQCxXgKRhxWBQNmrIQDMtJUqVifhYRYgIxfpgReKogMiS0gKWxRqhJchQWGpZztxYZRpX8bxboiRD0WkZAE8pAB8tpeJUQbuNKfpk8nKfpoqeZaoSkdZUzgSXyqJTpREHpSRaANSdQNxV5ZTtuWBOYmMqAEMKUp+mGCtrmOqqomoKJYIgwslbOIlTlfoI4UQPoFgLOHFfJRTpQIWUoFBEoJYAuGsCSCFCSPkI1kijog1ZCM1a1RJM6B3CWliWsF1SSJCD1YQs6P4HRZSENSFIqaIG1WIBEi4FNTcDNSSPCGNSQM6NRLYCtfGMNUiJtUQlCANZ1SFKiEdc6JCDCPCEiKiBiNiHiISCNTdSiHtdWMNRiJdWIOAPgCIYNcNdiN9eABuIgFrqAHsKBFkf9WdSSHiMDddbdfdY9c9YjXdQ9U9S9TDZTmtYSN9RyJCHyHCO9TNZCC1fNb1VCETcgGTadTjV1ZCKNRTeNZyITTCMgATWSCTQzXNS+cdXyDTXTYWSRDNREJqszVtVCK9cjZjWjTLajcTQkAWWAKoinkoOWXSA8PQoIOqatTCN1RLcdWzXTSLfrSNd9WzaAIiCTWbbzQtaNTCHyNbYNWbRtYbVdUTU7SbdNWbYde7VCJWIqaAHyJWM7crY0bdmoA1WbRdf7aNSHYqSHWHYWZ1kOtHSFF9XHcHdncnWAKnVXOnSSEDf7QKEROHfnVHTjWbfDSXaANCGXSnQOo-IXXjSXfXS7TFOTXzVdcHQNeXU3WnVXTFEzd3VTd7XrTFHbZTeAOAHyDPX3Y3ZHenZCG7aPR3HyO3f3UvUPZCH7aPYTf1Q3XnQPQXTvbHfvRvXyIfUrYvc3TvZnRfTtePfGPrZCMXfvcHU-TbTFDXRfQNgeM-dWK-a3aPTtRvYA2sPrTCF3QtTtcHe3enTCCPbAweCHQg0PTCFPSzXyIXhyCgJ+IKByFyB1TjfCAbWvfgJ3CTWQ+bf7a3IKHXaADCFQ4NTQ1g5La3JCCww1TQ6vQtZw4qeAFgHwOANw6QyFHvfw3XYI8I2gGIyLTQ+ffw+ANIkUGgOAKUKIxAzQw-co6o+o6UBBuo9UKAHUFo9QyFO-fwwww7VbaAEiPI9NTQ7-fw6NUw5WCHVbSw1vXfQoyFCA649nYnV4wvcfdvX42Td9Zw9nUnd47fYPRE8g5Ta3HyHE2E74045PVE2g2kxHRk6tWQyvdk1w9ozFJI8k-HbkxXTwzFEoxU6k6U5CLo8kzPXPeY6wzFFY8k+vSUxY5CC4-Ux3I4wUzFAE-Uwfe3MM-GGQ9A1E4TUI+0zU0g1E4wyHQs6AGIw1UiOQ-bUwxA9s7Qx-a3Mw-s7Nd9TY+487VsyFHw5TZCMc1M9WAc+UyzVWG4+46HVWKcySHUyzfgBAHwKAEoOo6emgHoCTQc8038wC0C9jSLQc109C+AIC8C6AAZNc3Dd9fgP89dd82MyzSDcgGDfbpDYQNDRAKDeDaS+S4S8SxDVDWoHC9Nds5E3Hb9djQ1aiDs5TS1dE8c14-Y+3KAOiCTVy4cwtSSJw-y-CO3A4yK4NWK+w8dZWC1aAK3JWG4+qx83Yxs5WIdbq8K5WBA2K7cyzbyw7UK63BtQ48K8axI99ZKxa1a4K-K5y+dd9Sq5WFq+80HUK2q583q5WH6xdeIKKxnVE-Q4w8w3Yw43a0XRG5GxazG0KxdRiI82sGKwMyza3NEwnUK7E3G-ixwzm5w5M5M3a6y2vTm1w5aw8+W2G4zXM2q4qTK2q4daiPWwq1k3Q6Nfy86zax2+m1y0U3Q63Oy52267vVE+FVG2q31lXktROzjcO78xwzO63PO4wIu0OzFFC2u59owxu5Xlu2wkKycw24ixwwfcEztWWxW1m1e8HfyyHbe2I8LdNVy2LU2yHc+2qxtS+weHe0fQNiWThOrdeIJtrdQLrfGBiNy+NZQG3JQCwCPBzafKopQLS1Swy+AJQOm3B+K71Yh63Mh6h3g12LTJCHhxAwR0q46MR5QAkCh4GORxhxQMuFuAkOrcEnSJQEtQkAkHwEQAJ5QFRxQPhzc5dcRwyP-YgG5ErbhV6zO6NeAEtaI-Jw4W5K3DO4I0J4QKI5szjdiPB5LaNUDtfQ1cZ4RyzWZ6WxA1Z3R23KW+m1Z6a5LeZ85-Z-a3Q+ZzW15z899eZ750uyLVZ3u8dUF7m0w-myEyTVZ5exF+g6FyFA+xF+AJCEy6tVZ0WxF0DkDmZ8TZZ53RbWq0DlUyfZXcl42-7Sjjfekwk9NcZ9dVE3l2V6E3kw11lzFG5xF63PgEDpQ3TUAA

type LowerAlphabet = `a` | `b` | `c` | `d` | `e` | `f` | `g` | `h` | `i` | `j` | `k` | `l` | `m` | `n` | `o` | `p` | `q` | `r` | `s` | `t` | `u` | `v` | `w` | `x` | `y` | `z`;
type UpperAlphabet = `A` | `B` | `C` | `D` | `E` | `F` | `G` | `H` | `I` | `J` | `K` | `L` | `M` | `N` | `O` | `P` | `Q` | `R` | `S` | `T` | `U` | `V` | `W` | `X` | `Y` | `Z`;
type Letter = LowerAlphabet | UpperAlphabet;
type Digit = `1` | `2` | `3` | `4` | `5` | `6` | `7` | `8` | `9` | `0`;
type IdentifierSign = `-` | `_` | `.` | `+` | `*` | `/` | `!` | `@` | `\$` | `%` | `^` | `&` | `~` | `=` | `{` | `}` | `[` | `]` | `:` | `<` | `>` | `?` | `\\`;
type WhiteSpace = ` ` | `\n`;

type TrimLeft<T extends string> =
    T extends `${WhiteSpace}${infer R}`
    ? TrimLeft<R>
    : T

type Prepend<Head, Tail> = Tail extends unknown[] ? [Head, ...Tail] : ParseError<{ head: Head, tail: Tail }, `prepend failed`>;
type Append<Init, Last> = Init extends unknown[] ? [...Init, Last] : ParseError<{ init: Init, last: Last}, `append failed`>;

type IsNumber<T>
    = T extends `.`
        ? false
    : T extends `${infer _0}.${infer _1}.${infer _2}`
        ? false
    : T extends `${infer _0}${ExpSign}${infer _1}${ExpSign}${infer _2}`
        ? false
    : T extends `${infer _0}${ExpSign}${infer _1}.${infer _2}`
        ? false
    : T extends `${infer _}${ExpSign}` | `${infer _}${ExpSign}+` | `${infer _}${ExpSign}-`
        ? false
    : T extends | `+${ExpSign}${infer _}` | `-${ExpSign}${infer _}` | `.${ExpSign}${infer _}` | `+.${ExpSign}${infer _}` | `-.${ExpSign}${infer _}`
        ? false
    : T extends `${infer _0}${WhiteSpace}${infer _1}`
        ? false
    : T extends `+${infer Rest}` | `-${infer Rest}`
        ? IsNumber_Sub<Rest>
    : IsNumber_Sub<T>;
type IsNumber_Sub<T>
    = T extends ``
        ? true
    : T extends `${Digit | `.` | ExpSign}${infer Rest}`
        ? Rest extends `+${infer NewRest}` | `-${infer NewRest}`
            ? IsNumber_Sub<NewRest>
            : IsNumber_Sub<Rest>
    : false;
type ExpSign = `e` | `E`;
type IsValidIdenfitier<T>
    = T extends `()`
        ? true
    : T extends `${infer _0}${WhiteSpace}${infer _1}`
        ? false
    : T extends `${Letter | Digit | IdentifierSign}${infer R}`
        ? IsValidIdenfitier_Sub<R>
    : false;
type IsValidIdenfitier_Sub<T>
    = T extends ``
        ? true
    : T extends `${Letter | Digit | IdentifierSign}${infer R}`
        ? IsValidIdenfitier_Sub<R>
    : false;


type Parse<Arg extends string> = SExpressionRoot<RemoveComments<Arg> extends infer A ? A extends string ? A : never : never>;

type RemoveComments<Arg extends string>
    = Arg extends `${infer Before};${infer _}\n${infer After}`
        ? RemoveComments<`${Before}\n${After}`>
        : Arg;

type SExpressionRoot<Arg extends string>
    = SExpression<Arg, [], false, true, ``, false> extends infer Node
        ? Node extends ListNode<infer Exprs, ``>
            ? Exprs
        : Node extends PairNode<infer Return_Expr1, infer Return_Expr2, infer _>
            ? [Pair<``, Return_Expr1, Return_Expr2>]
        : Node extends AtomNode<infer Return_AtomName, infer _>
            ? [Atom<``, Return_AtomName>]
        : ParseError<Node, `parse error`>
    : never;
type SExpression<
    Arg,
    InitExprs extends unknown[],
    PairFlag extends boolean,
    InRoot extends boolean,
    Prefix extends string,
    AfterEnd = false,
>
    = Arg extends ``
        ? PairFlag extends true
            ? InitExprs extends [unknown, unknown]
                ? PairNode<InitExprs[0], InitExprs[1], ``>
                : ParseError<[Arg, InitExprs], `invalid pair notation`>
        : Prefix extends ``
            ? ListNode<InitExprs, ``>
            : ParseError<[Arg, Prefix], `invalid single-quote notation`>
    : Arg extends `${infer Char}${infer Rest}`
        ? Char extends `.`
            ? AfterEnd extends true
                ? PairStartSub<Arg, Rest, InitExprs, PairFlag, InRoot, Prefix>
            : Rest extends `${Letter | Digit | IdentifierSign}${infer _}`
                ? IdentifierSub<Rest, Char, InitExprs, PairFlag, InRoot, Prefix>
            : PairStartSub<Arg, Rest, InitExprs, PairFlag, InRoot, Prefix>
        : Char extends Letter | Digit | IdentifierSign
            ? IdentifierSub<Rest, Char, InitExprs, PairFlag, InRoot, Prefix>
        : Char extends WhiteSpace
            ? SExpression<TrimLeft<Rest>, InitExprs, PairFlag, InRoot, Prefix>
        : Char extends `"`
            ? StringLiteralSub<Arg, InitExprs, PairFlag, InRoot, Prefix>
        : Char extends `(`
            ? ListSub<Rest, InitExprs, PairFlag, InRoot, Prefix>
        : Char extends `)`
            ? InitExprs extends []
                ? Prefix extends ``
                    ? AtomNode<`()`, Rest>
                : ParseError<[Arg, Prefix], `invalid single-quote notation`>
            : PairFlag extends true
                ? InitExprs extends [unknown, unknown]
                    ? PairNode<InitExprs[0], InitExprs[1], Rest>
                    : ParseError<[Arg, InitExprs], `invalid pair notation`>
                : ListNode<InitExprs, Rest>
        : Char extends `'`
            ? SExpression<Rest, InitExprs, PairFlag, InRoot, `${Prefix}'`>
        : ParseError<[Arg, InitExprs], `unexpected string`>
    : never;

type PairStartSub<Arg, Rest, InitExprs extends unknown[], PairFlag extends boolean, InRoot extends boolean, Prefix extends string>
    = InRoot extends true
        ? ParseError<[Arg, InitExprs], `pair notation not allowed in root`>
    : PairFlag extends true
        ? ParseError<[Arg, InitExprs], `too many pair notation`>
    : Prefix extends ``
        ? InitExprs extends [unknown]
            ? SExpression<Rest, InitExprs, true, InRoot, ``>
        : ParseError<[Arg, InitExprs], `unexpected pair notation`>
    : ParseError<[Arg, InitExprs, Prefix], `wrong pair and single-quote notation`>;

type IdentifierSub<Rest, Char extends string, InitExprs extends unknown[], PairFlag extends boolean, InRoot extends boolean, Prefix extends string>
    = ConsumeAtom<Rest, Char> extends AtomNode<infer Return_AtomName, infer Return_Rest>
        ? SExpression<Return_Rest, Append<InitExprs, Atom<Prefix, Return_AtomName>>, PairFlag, InRoot, ``>
        : ParseError<[Rest, Char, ConsumeAtom<Rest, Char>], `invalid Node`>
    
type StringLiteralSub<Arg, InitExprs extends unknown[], PairFlag extends boolean, InRoot extends boolean, Prefix extends string>
    = Arg extends `"${infer AtomValue}"${infer NewRest}`
        ? SExpression<NewRest, Append<InitExprs, Atom<Prefix, `"${AtomValue}"`>>, PairFlag, InRoot, ``>
        : ParseError<[Arg], `invalid Node`>
    
type ListSub<Rest, InitExprs extends unknown[], PairFlag extends boolean, InRoot extends boolean, Prefix extends string>
    = SExpression<Rest, [], false, false, ``> extends infer Node
    ? Node extends ListNode<infer Return_ChildExprs, infer Return_Rest>
        ? SExpression<Return_Rest, Append<InitExprs, List<Prefix, Return_ChildExprs>>, PairFlag, InRoot, ``, true>
    : Node extends PairNode<infer Return_Expr1, infer Return_Expr2, infer Return_Rest>
        ? SExpression<Return_Rest, Append<InitExprs, Pair<Prefix, Return_Expr1, Return_Expr2>>, PairFlag, InRoot, ``, true>
    : Node extends AtomNode<infer Return_AtomName, infer Return_Rest>
        ? SExpression<Return_Rest, Append<InitExprs, Atom<Prefix, Return_AtomName>>, PairFlag, InRoot, ``, true>
    : ParseError<[Rest, Node], `invalid Node`>
        : never

type AtomNode<Name extends string, RestString extends string> = { _: `atom-node`, v: [Name, RestString] };
type ListNode<Exprs extends unknown[], RestString extends string> = { _: `list-node`, v: [Exprs, RestString] };
type PairNode<Expr1, Expr2, RestString extends string> = { _: `pair-node`, v: [{ 0: Expr1, 1: Expr2 }, RestString] };

type ConsumeAtom<ConsumingString, InitString extends string>
    = ConsumingString extends ``
        ? AtomNode<InitString, ``>
    : ConsumingString extends `${infer Char}${infer Rest}`
        ? Char extends Letter | Digit | IdentifierSign
            ? Char extends `.`
                ? Rest extends `(${infer _}` | `"${infer _}`
                    ? AtomNode<InitString, `${Char}${Rest}`> // keep sought item
                    : ConsumeAtom<Rest, `${InitString}${Char}`>
            : ConsumeAtom<Rest, `${InitString}${Char}`>
        : AtomNode<InitString, `${Char}${Rest}`> // keep sought item
    : ParseError<[ConsumingString, InitString], `pop string failed`>

type Atom<Prefix, T extends string>
    = T extends ``
        ? ParseError<[Prefix, T], `atom failed`>
    : T extends `"${infer _}"`
        ? StringAtom<Prefix, T>
    : IsNumber<T> extends true
        ? NumberAtom<Prefix, T>
    : IsValidIdenfitier<T> extends true
        ? SymbolAtom<Prefix, T>
        : ParseError<[Prefix, T], `atom failed`>;
type StringAtom<Prefix, String> = { prefix: Prefix, string: String };
type NumberAtom<Prefix, Number> = { prefix: Prefix, number: Number };
type SymbolAtom<Prefix, SymbolName> = { prefix: Prefix, symbol: SymbolName };

type Pair<Prefix, S1, S2> = { prefix: Prefix, 0: S1, 1: S2 };

type List<Prefix, S extends unknown[]> = { prefix: Prefix, list: S};

type ParseError<Args, Message = undefined> = { message: Message, args: Args };


// check
type T0_00 = Parse<``>;

type T1_00 = Parse<`()`>;
type T1_01 = Parse<`t`>;
type T1_02 = Parse<`foo`>;
type T1_03 = Parse<`nil`>;
type T1_04 = Parse<`1`>;
type T1_05 = Parse<`12345678901234`>;
type T1_06 = Parse<`"a"`>;
type T1_07 = Parse<`"Hello World"`>;
type T1_08 = Parse<`"1234567890123456789012"`>;
type T1_09 = Parse<`-1.2`>;
type T1_10 = Parse<`1.2e10`>;
type T1_11 = Parse<`-1.2e-10`>;
type T1_12 = Parse<`.e1`>;
// type T1_xx = Parse<`1234567890123456789012`>; // need counter reset

type T2_00 = Parse<`1.2`>;
type T2_01 = Parse<`1.2 3`>;
type T2_02 = Parse<`1 2.3`>;
type T2_03 = Parse<`1.2.3`>;
type T2_04 = Parse<`1  2  .  3`>; // invalid
type T2_05 = Parse<`1 . 2 . 3`>; // invalid
type T2_06 = Parse<`1 . . 3`>; // invalid
type T2_07 = Parse<`.`>; // invalid
type T2_08 = Parse<`. 1`>; // invalid
type T2_09 = Parse<`.1`>;
type T2_10 = Parse<`1 .`>; // invalid
type T2_11 = Parse<`1.`>;
type T2_12 = Parse<`"".""`>; // invalid
type T2_13 = Parse<`().1`>; // invalid
type T2_14 = Parse<`1.()`>; // invalid
type T2_15 = Parse<`1.1.()`>; // invalid
type T2_16 = Parse<`1.nil`>;
type T2_17 = Parse<`1 .nil`>;
type T2_18 = Parse<`1. nil`>;
type T2_19 = Parse<`nil.1`>;
type T2_20 = Parse<`nil .1`>;
type T2_21 = Parse<`nil. 1`>;
type T2_22 = Parse<`.wr-le..+--`>;

type T3_00 = Parse<`(a)`>;
type T3_01 = Parse<`(+ 1 2)`>;
type T3_02 = Parse<`(1)`>;
type T3_03 = Parse<`(12 "sb")`>;
type T3_04 = Parse<`( 12 "sb" )`>;
type T3_05 = Parse<`("A B" "C")`>;
type T3_06 = Parse<`("A B" "C D" "E F")`>;
type T3_07 = Parse<`(+ 1 2 3 4)`>;
type T3_08 = Parse<`(1  2  .  3)`>; // invalid
type T3_09 = Parse<`(1 . 2 . 3)`>; // invalid
type T3_10 = Parse<`(1 . . 3)`>; // invalid
type T3_11 = Parse<`(.)`>; // invalid
type T3_12 = Parse<`(. 1)`>; // invalid
type T3_13 = Parse<`(.1)`>;
type T3_14 = Parse<`(1 .)`>; // invalid
type T3_15 = Parse<`(1.)`>;
type T3_16 = Parse<`(""."")`>;
type T3_17 = Parse<`(().1)`>;
type T3_18 = Parse<`(1.())`>;
type T3_19 = Parse<`(1.1.())`>;
type T3_20 = Parse<`(1."s")`>;
type T3_21 = Parse<`( 1 . "s" )`>;

type T4_00 = Parse<`1 2`>;
type T4_01 = Parse<`1 (2)`>;
type T4_02 = Parse<`+ 1 2 3`>;
type T4_03 = Parse<`1(2)`>;
type T4_04 = Parse<`   1   2   3   `>;
type T4_05 = Parse<`a "b c" "d e" f`>;
type T4_06 = Parse<`a "b c"`>;
type T4_07 = Parse<`a "b c" d`>;
type T4_08 = Parse<`aa 12`>;
type T4_09 = Parse<`"Hello World" "Hello World" "Hello World"`>;
type T4_10 = Parse<`1"a"`>;

type T5_00 = Parse<`0 (1 (2 3) 4) 5`>;
type T5_01 = Parse<`0(1(2 3)4)5`>;
type T5_02 = Parse<`  0  (  1  (  2   3  )  4  )  5  `>;
type T5_03 = Parse<`0 (1 2) (3 4) 5`>;
type T5_04 = Parse<`0(1 2)(3 4)5`>;
type T5_05 = Parse<`  0  (  1   2  )  (  3   4  )  5  `>;
type T5_06 = Parse<`((+ 1 2) 3 4)`>;
type T5_07 = Parse<`(((+ 1 2) 3 4) 5 6)`>;
type T5_08 = Parse<`((1 . 2) . 3)`>;
type T5_09 = Parse<`((((1))))`>;
type T5_10 = Parse<`(((1)) ((2)))`>;
type T5_11 = Parse<`(1 (2 3) (4 5))`>;
type T5_12 = Parse<`(1 (2 (3 4) 5))`>;
type T5_13 = Parse<`(("a"))`>;
type T5_14 = Parse<`(list 1 2 (quote foo))`>;
type T5_15 = Parse<`(list (quote foo))`>;
type T5_16 = Parse<`(list 1 (quote foo) 2)`>;
type T5_17 = Parse<`(1.(2 . nil)))`>;
type T5_18 = Parse<`(1 .(2 . nil))`>;
// type T5_xx = Parse<`(1 . (2 . (3 . nil)))`>; // need counter reset

type T6_00 = Parse<
`(
white-line
"Hello World"
)`>;
type T6_01 = Parse<
`(
white-line
1
)`>;
type T6_02 = Parse<
`(
;white-line
read;comment
foo;;bar;;
1
)`>;
type T6_03 = Parse<
`(if nil
    ; true
    (list 1 "foo")
    ; false
    (list 2 "bar"))`>;

type T7_00 = Parse<`1 '()`>;
type T7_01 = Parse<`1 '(1)`>;
type T7_02 = Parse<`((1))`>;
type T7_03 = Parse<`'((1))`>;
type T7_04 = Parse<`('(1))`>;
type T7_05 = Parse<`'('(1))`>;
type T7_06 = Parse<`'('(1 . 2) . 3)`>;
type T7_07 = Parse<`'1`>;
type T7_08 = Parse<`'"1"`>;
type T7_09 = Parse<`'''1 '2`>
type T7_10 = Parse<`1 (')`>; // invalid
type T7_11 = Parse<`'`>; // invalid
type T7_12 = Parse<`(''')`>; // invalid
type T7_13 = Parse<`'(a'a)`>;
