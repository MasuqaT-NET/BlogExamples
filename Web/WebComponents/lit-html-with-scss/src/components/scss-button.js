import {html, render} from 'lit-html';

import commonStyleHref from '../common.scss';
import style from './scss-button.scss'

class ScssButton extends HTMLElement {
    static template() {
        return html`<link rel="stylesheet" type="text/css" href="${commonStyleHref}" /><style>${style}</style>
<a href="http://example.com/">†<slot></slot>†</a>`;
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        render(ScssButton.template(), this.shadowRoot);
    }
}

customElements.define('scss-button', ScssButton);