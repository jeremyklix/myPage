// This tells the browser to look for the template and inject it
class LangSelector extends HTMLElement {
    async connectedCallback() {
        // Fetch the raw HTML template file
        const response = await fetch('/scripts/lang-control.html');
        const text = await response.text();

        // Parse the text into real HTML elements
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const template = doc.getElementById('language-picker-template');

        // Clone and attach the template structure
        this.appendChild(template.content.cloneNode(true));

        const picker = this.querySelector('#language-picker');

        if (picker) {
            const currentPath = window.location.pathname; // Gets the current URL path

            for (let option of picker.options) {
                if (currentPath.includes(option.value)) {
                    option.selected = true;
                    break;
                }
            }
        }
    }
}
customElements.define('lang-selector', LangSelector);
