import { LitElement, html, css } from "lit";
class PlaylistArrow extends LitElement{
    static properties = {
        direction: { type:String }
    };
    static styles = css`
    button{
        width:40px;
        height:40px;
        border-radius:50%;
        border:none;
        background:#2563eb;
        color:white;
        font-size:20px;
        cursor:pointer;
    }
    `;
    constructor() {
        super();
        this.direction = "right";
    }

    clickArrow(){
        this.dispatchEvent(
            new CustomEvent("playlist-arrow-click",{
            bubbles:true,
            composed:true,
            detail: {diretion:this.direction }
        })
    );
}

render(){
    return html`
    <button @click=${this.clickArrow} aria-label ="$ {this.direction} arrow">
        ${this.direction === "left" ? "←" : "➜"}
    </button>
    `;
}
}
customElements.define("playlist-arrow", PlaylistArrow);