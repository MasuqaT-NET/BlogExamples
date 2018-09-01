package foo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

import jsweet.lang.Decorator;

@Decorator
@Target(ElementType.FIELD)
public @interface SpecialField {
    public String value() default "special";
    public int count() default 0;
}