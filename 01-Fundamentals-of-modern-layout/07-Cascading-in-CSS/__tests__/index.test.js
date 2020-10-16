import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import { query, querySelectorAll } from '@github/query-selector';

beforeAll(async () => {
  const styleData = await fs.promises.readFile('./01-Fundamentals-of-modern-layout/07-Cascading-in-CSS/styles/app.css');
  const htmlData = await fs.promises.readFile('./01-Fundamentals-of-modern-layout/07-Cascading-in-CSS/index.html');
  document.documentElement.innerHTML = htmlData.toString();

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styleData;
  document.head.appendChild(styleEl);
});

const getElementPropertyValue = (element, property) => {
  const elementStyle = getComputedStyle(element);
  return elementStyle.getPropertyValue(property);
};

test('main must include 2 headers and 3 sections', () => {
  const main = query(document, 'main');
  const sections = querySelectorAll(main, 'section');
  const headerOne = query(main, 'h1');
  const headerTwo = query(main, 'h2');

  expect(sections.length).toBe(3);
  expect(headerOne).toBeInTheDocument();
  expect(headerTwo).toBeInTheDocument();
});

test('sections must include one header', () => {
  const main = query(document, 'main');
  const sections = querySelectorAll(main, 'section');

  sections.forEach((section) => {
    const headers = query(section, 'h2');
    expect(headers).toBeInTheDocument();
  });
});

test('body element style', () => {
  const body = query(document, 'body');

  const fontSize = getElementPropertyValue(body, 'font-size');
  const lineHeight = getElementPropertyValue(body, 'line-height');
  const color = getElementPropertyValue(body, 'color');

  expect(fontSize).toBe('18px');
  expect(lineHeight).toBe('1.5');
  expect(color).toBe('rgb(51, 51, 51)');
});

test('h1 element style', () => {
  const h1 = query(document, 'h1');

  const fontSize = getElementPropertyValue(h1, 'font-size');
  const marginTop = getElementPropertyValue(h1, 'margin-top');
  const marginBottom = getElementPropertyValue(h1, 'margin-bottom');
  const textAlign = getElementPropertyValue(h1, 'text-align');

  expect(fontSize).toBe('60px');
  expect(marginTop).toBe('50px');
  expect(marginBottom).toBe('10px');
  expect(textAlign).toBe('center');
});

test('h2 element style', () => {
  const h2 = query(document, 'main > h2');

  const fontSize = getElementPropertyValue(h2, 'font-size');
  const marginTop = getElementPropertyValue(h2, 'margin-top');
  const paddingBottom = getElementPropertyValue(h2, 'padding-bottom');
  const textAlign = getElementPropertyValue(h2, 'text-align');

  expect(fontSize).toBe('25px');
  expect(marginTop).toBe('0px');
  expect(paddingBottom).toBe('30px');
  expect(textAlign).toBe('center');
});

test('section element style', () => {
  const section = query(document, 'section');

  const marginTop = getElementPropertyValue(section, 'margin-top');
  const marginLeft = getElementPropertyValue(section, 'margin-left');
  const paddingLeft = getElementPropertyValue(section, 'padding-left');
  const paddingBottom = getElementPropertyValue(section, 'padding-bottom');

  expect(marginTop).toBe('50px');
  expect(marginLeft).toBe('0px');
  expect(paddingLeft).toBe('50px');
  expect(paddingBottom).toBe('0px');
});
