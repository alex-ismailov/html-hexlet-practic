/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import { query } from '@github/query-selector';

import path from 'path';

// console.log('+++++++++++++++++++++++++++');
// const myHtmlDataPath = path.join(path.resolve(), '02-CSS-positioning/05-relative-and-absolute-positioning/index.html');
// const myCssDataPath = path.join(path.resolve(), '02-CSS-positioning/05-relative-and-absolute-positioning/styles/app.css');
// console.log(myHtmlDataPath);
// console.log(myCssDataPath);
// const resMyHtmlDataPath = fs.readFileSync(myHtmlDataPath, 'utf-8');
// console.log(resMyHtmlDataPath.toString()); // отдаль html, все ок
// console.log('+++++++++++++++++++++++++++');
// console.log(document);
// console.log('+++++++++++++++++++++++++++');

beforeAll(async () => {
  const styleData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/05-relative-and-absolute-positioning/styles/app.css'),
  );
  const htmlData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/05-relative-and-absolute-positioning/index.html'),
  );

  document.documentElement.innerHTML = htmlData.toString();

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styleData;
  document.head.appendChild(styleEl);
});

const getElementPropertyValue = (element, property) => {
  const elementStyle = getComputedStyle(element);
  return elementStyle.getPropertyValue(property);
};

test('books-card to have relative position', () => {
  const element = query(document, '.books-card');
  const elementPosition = getElementPropertyValue(element, 'position');

  expect(elementPosition).toBe('relative');
});

test('book-description to have top and right rule', () => {
  const divBox = query(document, '.book-description');
  const divBoxTop = getElementPropertyValue(divBox, 'top');
  const divBoxRight = getElementPropertyValue(divBox, 'right');

  expect(divBoxTop).toBe('0px');
  expect(divBoxRight).toBe('0px');
});

test('book-description to have 50% width', () => {
  const divBox = query(document, '.book-description');
  const divBoxWidth = getElementPropertyValue(divBox, 'width');

  expect(divBoxWidth).toBe('50%');
});

test('book-description to have 100% height', () => {
  const divBox = query(document, '.book-description');
  const divBoxBottom = getElementPropertyValue(divBox, 'bottom');

  expect(divBoxBottom).toBe('0px');
});

test('book-description to have position', () => {
  const divBox = query(document, '.book-description');
  const divBoxPosition = getElementPropertyValue(divBox, 'position');

  expect(divBoxPosition).toBe('absolute');
});
