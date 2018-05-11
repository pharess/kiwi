customElements.define('peter-test',
    class extends HTMLElement {
        constructor() {
            super();
            
            const template = document
                .getElementById('peter-test-template')
                .content;

            const shadowRoot = this.attachShadow({ mode: 'open' })
                .appendChild(template.cloneNode(true));
        }
    }
);