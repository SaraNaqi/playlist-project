import { LitElement, html, css } from "lit";

class PlaylistDotNav extends LitElement {
    static properties = {
        total: { type: Number },
        activeIndex: { type: Number }
    };

    static styles = css`
    .dots {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        justify-content: center;
    }

    button{
        width:12px;
        height:12px;
        border-radius:50%;
        border:none;
        background:#ccc;
        cursor:pointer;
    }

    button.active{
        background:#2563eb;
    }
    `;
    constructor() {
        super();
        this.total = 0;
        this.activeIndex =0;
    }

    selectDot(index) {
        this.dispatchEvent(
            new CustomEvent("playlist-index-changed", {
                bubbles:true,
                composed:true,
                detail: { index }
    
            })
        );
    }

    render() {
        return html`
        <div class="dots">
            ${Array.from({ length: this.total }, (_, i) => html`
            <button
            class="${this.activeIndex === i ? "active" : ""}"
            @click=${() => this.selectDot(i)}
            aria-label="Go to slide ${i + 1}"
            ></button>
            `)}
        </div>
        `;
    }
}
customElements.define("playlist-dot-nav", PlaylistDotNav);