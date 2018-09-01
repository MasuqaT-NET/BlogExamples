package bar;

import foo.SpecialType;
import foo.SpecialField;

@SpecialType
public class Example {
    @SpecialField
    private Integer hoge;

    @SpecialField("qux")
    private Integer fuga;

    @SpecialField(value = "baz", count = 1)
    private Integer piyo;

    private Integer xxx;
}