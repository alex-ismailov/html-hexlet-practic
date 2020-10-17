/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import { query } from '@github/query-selector';
import path from 'path';

beforeAll(async () => {
  const styleData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/06-fixed-positioning/styles/app.css'),
  );
  const htmlData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/06-fixed-positioning/index.html'),
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

test('position header block', () => {
  const element = query(document, '.fixed-header');
  const elementPosition = getElementPropertyValue(element, 'position');
  const elementPositionTop = getElementPropertyValue(element, 'top');

  expect(elementPosition).toBe('fixed');
  expect(elementPositionTop).toBe('0px');
});

test('height header block', () => {
  const element = query(document, '.fixed-header');
  const elementHeight = getElementPropertyValue(element, 'height');

  expect(elementHeight).toBe('100px');
});

test('width header block', () => {
  const element = query(document, '.fixed-header');
  const elementWidth = getElementPropertyValue(element, 'width');

  expect(elementWidth).toBe('100%');
});

test('main padding', () => {
  const element = query(document, '.padding-header');
  const elementPadding = getElementPropertyValue(element, 'padding-top');

  expect(elementPadding).toBe('100px');
});
