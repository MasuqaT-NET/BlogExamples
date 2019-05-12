import { negotiateLanguages } from "fluent-langneg";
import { FluentBundle } from "fluent";

const MESSAGES_ALL = {
  ja: `
-brand-name = Contoso
hello = こんにちは、世界！
application-form = 登録は<button><special>こちら</special></button>から！
    .title = 登録ページに移動します。
description1 = ついに、<special>世界中で</special>大人気の { -brand-name } が日本上陸。
description2 = { $user } 様に特別オファー。
description3 = ただいま、{ $goodsName }が{ $amount }つで{ $price }円！
`,
  "en-US": `
-brand-name = Contoso
hello = Hello, world!
application-form = <button>Apply <special>now</special>!</button>
    .title = Move to the registration page
description1 = A long awaited <special>World-famous</special> { -brand-name } debuts in Japan.
description2 = Special offer for { $gender ->
  [male] Mr. { $user }
  [female] Ms. { $user }
 *[other] { $user } san
}.
description3 = { $amount ->
  [one] { $goodsName }
 *[other] {$amount} { $goodsName }s
} for { $price } yen!
`
} as { [key: string]: string };

export default function* generateBundles(userLocales: readonly string[]) {
  // Choose locales that are best for the user.
  const currentLocales = negotiateLanguages(userLocales, ["ja", "en-US"], {
    defaultLocale: "en-US"
  });

  for (const locale of currentLocales) {
    const bundle = new FluentBundle(locale);
    bundle.addMessages(MESSAGES_ALL[locale]);
    yield bundle;
  }
}
