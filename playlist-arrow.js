import { LitElement, html, css } from "lit";
class PlaylistArrow extends LitElement{
    static properties = {
        direction: { type:String, reflect: true, attribute: "direction" },
        titleText: { type: String, attribute: "title-text" }
    };
    constructor() {
        super();
        this.direction = "right";
    }

    static styles = css`

    :host {
        position: absolute;
        top: 42%;
        transform: translateY(-50%);
        z-index: 2;
    }
    :host([direction="left"]){
        left: 10px;
    }
    :host([direction="right"]) {
        right: 10px;
    }

    button{
        width:42px;
        height:42px;
        border-radius:50%;
        border:1px solid light-dark(#d7d7d7, #344061);
        background:light-dark(rgba(255, 255, 255, 0.95), rgba(20, 26, 46, 0.95));
        color:light-dark(#111, #f5f7ff);
        display: grid;
        place-items: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
     }
     `;
     

    clickArrow() {
        this.dispatchEvent(
            new CustomEvent("playlist-arrow-activate", {
            bubbles: true,
            composed: true,
            detail: { direction: this.direction }
        })
    );
}

render(){
    return html`
    <button @click=${this.clickArrow} title="${this.titleText}" aria-label="${this.titleText}">
        ${this.direction === "left" ? "<" : ">"}
    </button>
    `;
}
}
customElements.define("playlist-arrow", PlaylistArrow);