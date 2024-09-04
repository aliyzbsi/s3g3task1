import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('html-0 CSS dosyası sayfaya eklenmiş', () => {
    const cssLinkTag = dom.window.document.head.querySelector(
      'link[href*="index.css"]'
    );
    expect(cssLinkTag).toBeInTheDocument();
  });

  it("html-1 main-section class'ına sahip bir bölüm(section) eklenmiş", () => {
    const element = container.querySelector('section.main-section');
    expect(element).toBeInTheDocument();
  });

  it("html-2 main-section içine main-container class'ına sahip bir div eklenmiş", () => {
    const element = container.querySelector(
      'section.main-section div.main-container'
    );
    expect(element).toBeInTheDocument();
  });

  it("html-3 main-container içine main-content class'ına sahip bir div eklenmiş", () => {
    const element = container.querySelector(
      'div.main-container div.main-content'
    );
    expect(element).toBeInTheDocument();
  });

  it('html-4 main-content içinde h1 ve p doğru metinler ile eklenmiş', () => {
    const baslik = container.querySelector('div.main-content h1');
    const yazi = container.querySelector('div.main-content p');
    expect(baslik).toBeInTheDocument();
    expect(yazi).toBeInTheDocument();
    expect(baslik.textContent).toMatch(/6 ayda uluslararası yazılımcı ol/i);
    expect(yazi.textContent).toMatch(/Yazılım ön bilgisi olmayan gençleri/i);
  });

  it('css-1 tüm linkler için altçizgiyi kaldıralım, metin rengini mavi yerine siyah yapalım, üzerine gelince mavi olması sağlanmış', () => {
    expect(isPropertySetInCss(css, 'a', 'text-decoration', 'none')).toBe(true);
    expect(isPropertySetInCss(css, 'a', 'color', 'black')).toBe(true);
    expect(isPropertySetInCss(css, 'a:hover', 'color', 'blue')).toBe(true);
  });

  it("css-2 header'da flex özellikleri uygulanmış", () => {
    expect(isPropertySetInCss(css, 'header', 'flex-direction', 'column')).toBe(
      true
    );
    expect(isPropertySetInCss(css, 'header', 'align-items', 'center')).toBe(
      true
    );
    expect(isPropertySetInCss(css, 'header', 'gap', '30px')).toBe(true);
  });

  it("css-3 menu-items class'ında button hizalanmış", () => {
    expect(isPropertySetInCss(css, '.menu-items', 'align-items', 'center')).toBe(
      true
    );
  });

  it("css-4 main-container'da flex özellikleri uygulanmış", () => {
    expect(isPropertySetInCss(css, '.main-container', 'display', 'flex')).toBe(
      true
    );
    expect(
      isPropertySetInCss(css, '.main-container', 'justify-content', 'center')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.main-container', 'align-items', 'flex-end')
    ).toBe(true);
    expect(
      isPropertySetInCss(css, '.main-container', 'text-align', 'center')
    ).toBe(true);
  });
});
