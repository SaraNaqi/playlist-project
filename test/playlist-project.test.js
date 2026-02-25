import { html, fixture, expect } from '@open-wc/testing';
import "../playlist-project.js";

describe("PlaylistProject test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <playlist-project
        title="title"
      ></playlist-project>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
