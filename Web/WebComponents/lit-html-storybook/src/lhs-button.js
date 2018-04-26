import {html, render} from 'lit-html';

const style = html`<style>
:host {
    display: inline-block;
    outline: 1px dotted darkturquoise;
    text-align: center;
}
.root {
    display: block;
    padding: 5px;
    text-decoration: none;
    color: darkcyan;
}
</style>`;

class LhsButton extends HTMLElement {
  static get observedAttributes() {
    return ['link'];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    render(this.template({link: null}), this.shadowRoot);
  }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    if (oldValue === newValue) {
      return;
    }
    switch (attributeName) {
      case 'link':
        render(this.template({link: newValue}), this.shadowRoot);
    }
  }

  template({link}) {
    return html`${style}<a href=${link || 'http://example.net/'} class="root" target="_blank" rel="noopener"><slot></slot></a>`
  }
}

customElements.define('lhs-button', LhsButton);