/**
 * Copyright 2026 SaraNaqi
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./playlist-slide.js";
import "./playlist-arrow.js";
import "./playlist-dot-nav.js";
/**
 * `playlist-project`
 * 
 * @demo index.html
 * @element playlist-project
 */
export class PlaylistProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-project";
  }

  static get properties() {
    return {
      ...super.properties,
      title: {type: String},
      currentIndex: {type: Number},
      totalSlides: {type:Number},
      foxImage: { type: String}
    };
  }

  constructor() {
    super();
    this.title = "My Playlist";
    this.currentIndex = 0;
    this.totalSlides = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/playlist-project.ar.json", import.meta.url).href +
        "/../",
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadFox();
  }

  async loadFox() {
    const res = await fetch("https://randomfox.ca/floof/");
    const data = await res.json();
    this.foxImage = data.image;
  }
  
  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      .slider {
       overflow: hidden;
       width: 100%;
       margin: 16px 0;
      }

      .slides {
        display: flex;
        transition: transform 0.3s ease-in-out;
      }

      .card {
        max-width:400px;
        margin: 20px auto;
        background: white;
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 16px;
      }

      h3 span {
        font-size: var(--playlist-project-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>


  <div class = "card">
    <h2>Random fox </h2>

    ${this.foxImage ? html`<img src ="${this.foxImage}" alt="Random fox" style = "width: 100%; border-radius: 10px;"/>`
    : html`<p>Loading....</p>`}

    <button @click=${this.loadFox}> Load new fox </button>
  </div>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PlaylistProject.tag, PlaylistProject);