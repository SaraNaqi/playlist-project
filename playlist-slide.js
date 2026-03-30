import { LitElement, html, css } from "lit";
class playlistSlide extends LitElement {
    static properties = {
        topHeading: { type: String, attribute: "top-heading" },
        secondHeading: { type: String, attributes: "second-heading" }
    };

    static styles = css`
    :host {
    display: block;
    min-width:100%;
    box-sizing:border-box;
}

.slide {
    background: white;
    padding: 24px;
    border-radius: 12px;
    border:1px solid #ddd;
    min-height:250px;
}

.top-heading {
    color: #2563eb;
    font-size: 14px;
    font-weight: bold;
}
.second-heading{
    font-size: 24px;
    margin-bottom: 16px;
}
.content{
    max-height: 150px;
    overflow-y: auto;
}
`;
constructor() {
    super();
    this.topHeading = "";
    this.secondHeading = "";
}

render() {
    return html`
    <div class="slide">
        <div class="top-heading">${this.topHeading}</div>
        <div class="second-heading">${this.secondHeading}</div>
        <div class="content">
            <slot></slot>
        </div>
        </div>
    `;
}
}
customElements.define("playlist-slide", playlistSlide)