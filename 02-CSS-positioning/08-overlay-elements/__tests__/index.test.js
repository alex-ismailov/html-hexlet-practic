/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import { query } from '@github/query-selector';
import path from 'path';

beforeAll(async () => {
  const styleData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/08-overlay-elements/styles/app.css'),
  );
  const htmlData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/08-overlay-elements/index.html'),
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

test('position .circle block', () => {
  const element = query(document, '.circle');
  const elementPosition = getElementPropertyValue(element, 'position');

  expect(elementPosition).toBe('absolute');
});

test('color .circle-red block', () => {
  const element = query(document, '.circle-red');
  const elementBackground = getElementPropertyValue(element, 'background');

  expect(elementBackground).toBe('red');
});

test('color .circle-blue block', () => {
  const element = query(document, '.circle-blue');
  const elementBackground = getElementPropertyValue(element, 'background');

  expect(elementBackground).toBe('blue');
});

test('z-index .circle-red block', () => {
  const element = query(document, '.circle-red');
  const elementZIndex = getElementPropertyValue(element, 'z-index');

  expect(elementZIndex).toBe('2');
});

test('z-index .circle-blue block', () => {
  const element = query(document, '.circle-blue');
  const elementZIndex = getElementPropertyValue(element, 'z-index');

  expect(elementZIndex).toBe('1');
});

test('opacity .circle-red block', () => {
  const element = query(document, '.circle-red');
  const elementOpacity = getElementPropertyValue(element, 'opacity');

  expect(elementOpacity).toBe('0.5');
});
