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
      items: {type: Array},
      currentIndex: {type: Number},
     loading: { type: Boolean },
     imageLoaded: { type: Boolean },
     likedPosts:{ type: Object }
    };
  }

  constructor() {
    super();
    this.title = "Supernova Feed";
    this.items= [];
    this.currentIndex = 0;
    this.loading= true;
    this.imageLoaded = false;
    this.likedPosts= {};
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

    this.handleBackForward= this.handleBackForward.bind(this);
  }

    connectedCallback() {
     super.connectedCallback();
     window.addEventListener("popstate", this.handleBackForward);
     this.loadLikes();
     this.loadData();
    }

    disconnectedCallback() {
      window.removeEventListener("popstate", this.handleBackForward);
      super.disconnectedCallback();
    }


    async loadData() {
      this.loading = true;
      this.imageLoaded = false;
      try {
     const response = await fetch("/api/photos");
      const data = await response.json();
      this.items = data.data || [];
      this.readPageFromUrl();
      if(this.currentIndex > this.items.length - 1 ){
        this.currentIndex = 0; 
      }
    }
      catch(e) { 
        console.error("Error can't load data:", e);
        this.items= [];
      }
        this.loading = false;
      }

      get currentItem() {
        return this.items[this.currentIndex];
      }
  
      handleBackForward() {
        this.readPageFromUrl();
      }

      readPageFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const activeIndex = Number(params.get("activeIndex"));
        if (!Number.isNaN(activeIndex) && activeIndex >= 0 && activeIndex < this.items.length){
          this.currentIndex = activeIndex;
          this.imageLoaded = false;
        }
      }
    updatePageInUrl() {
      const url = new URL(window.location.href);
      url.searchParams.set("activeIndex", this.currentIndex);
      history.pushState({}, "", url);
    }
    
    nextSlide() {
       if (this.currentIndex < this.items.length -1)
    {
      this.currentIndex ++;
      this.imageLoaded = false;
      this.updatePageInUrl();
    }
    }


  prevSlide() {
    if (this.currentIndex > 0){
      this.currentIndex --;
      this.imageLoaded= false;
      this.updatePageInUrl();
    }
  }


  handleDotChange(e) {
    this.currentIndex = e.detail.index;
    this.imageLoaded= false;
    this.updatePageInUrl();
  }
    

  loadLikes() {
    const savedLikes = localStorage.getItem("supernova-likes");
    if (savedLikes) {
      this.likedPosts = JSON.parse(savedLikes);
    }
  }

  saveLikes() {
    localStorage.setItem("supernova-likes", JSON.stringify(this.likedPosts));
  }

  toggleLike() {
    const currentValue = this.likedPosts[this.currentIndex] || false;
    this.likedPosts = {
      ...this.likedPosts,[this.currentIndex]: !currentValue
    };
    this.saveLikes();
  }
async sharePost() {
  const shareUrl = window.location.href;

  try{
    if (navigator.share) {
      await navigator.share ({
        title: this.currentItem?.title || "Shared post",
        text: this.currentItem?.caption || "Check out this cool space post!",
        url: shareUrl
      });
    } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied!");
      }
    }
    catch (e) {
      console.error("Share failed:", e)
    }
  }


markImageLoaded() {
  this.imageLoaded = true;
}

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
    css`
      :host {
        
        display: block;
        color-scheme: light dark;
        min-height: 100vh;
        background: light-dark(#f4f4f4, #0b1020);
        color: light-dark(#111, #f5f7ff);
        font-family: var(--ddd-font-navigation, Arial, sans-serif);
      }
      
      *{
        box-sizing: border-box;
      }

      .page {
        display: flex;
        justify-content: center;
        padding: 24px 12px;
      }
      .container {
        width: 100%;
        max-width:520px;
      }
      
      .main-title {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 18px;
      }

      .card, 
      .slider-box {
        background: light-dark(#ffffff, #141a2e);
        border: 1px solid light-dark(#dcdcdc, #26304d);
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }
      .slider-box {
        margin-top: 20px;
        position: relative;
      }


      .card-top {
        display: flex; 
        align-items: center;
        gap: 12px;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-bottom: 1px solid light-dark(#ececec, #26304d);
      }
      .avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%; 
        object-fit: cover;
      }

      .username {
        font-size: 14px;
        font-weight: 700;
      }

      .post-title {
        font-size: 12px;
        color: light-dark(#666, #b8c3e0);
      }
      
      .image-area {
        width:100%;
        aspect-ratio: 1/1; 
        background: light-dark(#ededed, #0f1528);
        position: relative;
      }
  
      .main-image {
        width: 100%;
        height:100%;
        object-fit: cover;
        display: block;
      }

      .hidden {
        visibility: hidden;
      }

      .loading-text {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: light-dark(#666, #b8c3e0);
      }
      
      .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 14px 6px 14px;
      }
      
      .left-buttons {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: center;
      }

      .icon-button, .reload-button {
        border: none;
        cursor: pointer;
        color: inherit;
      }

      .icon-button {
        background: transparent;
        font-size: 22px;
      }

      .reload-button {
        background: light-dark(#f7f7f7, #1b2340);
        border: 1px solid light-dark(#d4d4d4, #344061);
        border-radius: var(--ddd-radius-sm);
        padding: 8px 12px;
        font-size: 13px;
      }

      .like-text {
        padding: 0 16px 8px 16px;
        font-size: 14px;
        font-weight: 600;
      }

      .caption {
        padding: 0 16px 16px 16px;
        font-size: 14px;
        line-height: 1.45;
      }

      .caption strong{
        margin-right: 6px;
      }

      .slider {
        overflow: hidden;
        width:100%;
      }

      .slides {
        display: flex;
        width: 100%;
        transition: transform 0.3s ease-in-out;
      }

      .thumb-area {
        padding: 12px;
        border-top: 1px solid light-dark(#ececec, #26304d);
      }

      .empty {
        padding: 24px;
        text-align: center;
      }
    `];
  }

  // Lit render the HTML
  render() {
    const item = this.currentItem;
    return html`
<div class="page">
  <div class="container">
    <div class="main-title">${this.title}</div>
${this.loading ? html `<div class="card">
  <div class="empty">Loading content.....</div>
</div>
`
: !item ? html`
<div class="card">
  <div class="empty">Nothing loaded here yet
  </div>
</div>
`
: html`
<div class="card">
  <div class="card-top">
    <img class="avatar"
    src="${item.author.image}" alt="${item.author.name} profile image" loading="lazy"/>
    <div class="user-info">
      <div class= "username">${item.author.name}</div>
      <div class="post-title">${item.author.channel}</div>
      <div class="post-title">User since ${item.author.userSince}</div>
      <div class="post-title">Taken: ${item.dateTaken}</div>
    </div>
  </div>
  <div class="image-area">
    ${!this.imageLoaded ? html`<div class="loading-text">Loading image.....</div>` : ""}
    <img class= "main-image ${this.imageLoaded ? "" : "hidden"}" src="${item.image}" alt="${item.alt}"
    @load=${this.markImageLoaded}/>
  </div>
  <div class="buttons">
    <div class="left-buttons">
      <button class="icon-button" @click=${this.toggleLike}
      title="Like post" aria-label="Like post"> ${this.likedPosts[this.currentIndex] ? "♥︎" : "♡" }
    </button>
    <button class="icon-button"
  @click=${this.sharePost}
  title="Share post"
  aria-label="Share post">⌯⌲</button>
    </div>

    <button class="reload-button" @click=${this.loadData}
    title="Reload data" aria-label="Reload data">
  Refresh data </button>
  </div>
  <div class="like-text">${this.likedPosts[this.currentIndex] ? "You liked the post" : "Tap the heart to like this post"}
  </div>

  <div class="caption"><strong>${item.author.name}</strong> ${item.caption}</div>
</div>
<div class="slider-box">
  <div class="slider">
    <div class="slides" style="transform: translateX(-${this.currentIndex * 100}%);">
      ${this.items.map((slide) => html`
        <playlist-slide top-heading="${slide.slideHeading}" second-heading="${slide.title}">
          <p>${slide.slideText}</p>
        </playlist-slide>
        `)}
    </div>
  </div>
<playlist-arrow direction="left" title-text= "previous slide" @playlist-arrow-activate=${this.prevSlide}></playlist-arrow>

<playlist-arrow direction="right" title-text="Next slide" @playlist-arrow-activate=${this.nextSlide}></playlist-arrow>

<div class="thumb-area">
  <playlist-dot-nav .items=${this.items} .activeIndex=${this.currentIndex} @playlist-index-changed=${this.handleDotChange}></playlist-dot-nav>
</div>
</div>
`}
  </div>
  </div>
  `;
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