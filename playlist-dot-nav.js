import { LitElement, html, css } from "lit";

class PlaylistDotNav extends LitElement {
    static properties = {
        items: { type: Array },
        activeIndex: { type: Number }
    };

    static styles = css`
    .dots {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }

    button{
        border-radius: 10px;
        border: 2px solid transparent;
        background: transparent;
        padding: 0;
        cursor: pointer;
    }

    button.active {
        border-color: light-dark(#2563eb, #9eb8ff);
    }

    img {
        width: 44px;
        height: 44px;
        object-fit: cover;
        border-radius: 8px;
        display: block;
    }
    `;

    constructor() {
        super();
        this.items = [];
        this.activeIndex = 0;
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
           ${(this.items || []).map(
            (item, index) => html`
            <button class="${this.activeIndex === index ? "active" : ""}"
            @click=${() => this.selectDot(index)}
            title="Go to item ${index + 1}">
        <img src="${item.thumbnail}" alt="${item.title} thumbnail" loading="lazy" />
        </button>
            `
           )}
        </div>
        `;
    }
}
customElements.define("playlist-dot-nav", PlaylistDotNav);