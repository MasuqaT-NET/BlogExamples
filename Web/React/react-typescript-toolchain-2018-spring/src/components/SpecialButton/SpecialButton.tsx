import * as React from 'react';

import * as style from './SpecialButton.css';

/**
 * Very simple but special button for the example.
 */
export default (props: {
  /**
   * Content in this button.
   */
  children?: string;
  /**
   * Event handler when the user clicks this button.
   * @param event Event argument for `onClick`
   */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}) => (
  <button className={style.root} onClick={props.onClick}>
    <span className={style.content}>{props.children}</span>
    <span className={style.description}> is awesome.</span>
  </button>
);
