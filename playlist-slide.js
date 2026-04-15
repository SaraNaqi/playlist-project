import { LitElement, html, css } from "lit";
class playlistSlide extends LitElement {
    static properties = {
        topHeading: { type: String, attribute: "top-heading" },
        secondHeading: { type: String, attribute: "second-heading" }
    };

    static styles = css`
    :host {
    display: block;
    min-width:100%;
    box-sizing:border-box;
    background: light-dark(#ffffff, #141a2e);
    color: light-dark(#111, #f5f7ff);
}

.slide {
    padding: 24px;
    box-sizing: border-box;
    min-height:220px;
}

.top-heading {
    color: light-dark(#2563eb, #9eb8ff);
    font-size: 14px;
    font-weight: 700;
    margin-bottom:10px;
}

.second-heading{
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 14px;
}

.content{
    max-height: 130px;
    overflow-y: auto;
    line-height: 1.5;
    font-size:16px;
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