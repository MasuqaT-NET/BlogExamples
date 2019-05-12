import React from "react";
import { Localized } from "fluent-react";

const App: React.FunctionComponent = () => (
  <div>
    <Localized id="hello">
      <h1>Hello World!</h1>
    </Localized>
    <Localized
      id="application-form"
      button={<button type="submit" />}
      special={<strong />}
    >
      <div>
        <button>
          Apply <strong>now</strong>!
        </button>
      </div>
    </Localized>
    <div>
      <p>
        <Localized id="description1" special={<strong />}>
          <>
            {`A long awaited <strong>World-famous</strong> thing debuts in Japan.`}
          </>
        </Localized>
        <br />
        <Localized id="description2" $user="Bob" $gender="male">
          <>Special offer for you.</>
        </Localized>
        <Localized id="description3" $amount={2} $goodsName="Foo" $price={498}>
          <></>
        </Localized>
      </p>
    </div>
  </div>
);

export default App;
