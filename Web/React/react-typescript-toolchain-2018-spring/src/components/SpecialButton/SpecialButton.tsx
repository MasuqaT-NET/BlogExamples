import * as React from 'react';

import * as style from './SpecialButton.css';

export default (props: {
  children?: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}) => (
  <button className={style.root} onClick={props.onClick}>
    <span className={style.content}>{props.children}</span>
    <span className={style.description}> is awesome.</span>
  </button>
);
