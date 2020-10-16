import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import { query } from '@github/query-selector';

beforeAll(async () => {
  const styleData = await fs.promises.readFile('./01-Fundamentals-of-modern-layout/06-CSS-basics/css/app.css');
  const htmlData = await fs.promises.readFile('./01-Fundamentals-of-modern-layout/06-CSS-basics/index.html');
  document.documentElement.innerHTML = htmlData.toString();

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styleData;
  document.head.appendChild(styleEl);
});

const getElementPropertyValue = (element, property) => {
  const elementStyle = getComputedStyle(element);
  return elementStyle.getPropertyValue(property);
};

test('quote class style', () => {
  const quote = query(document, '.quote');

  const quoteColor = getElementPropertyValue(quote, 'color');
  const quoteWeight = getElementPropertyValue(quote, 'font-weight');
  const quoteSize = getElementPropertyValue(quote, 'font-size');
  const quoteAlign = getElementPropertyValue(quote, 'text-align');

  expect(quoteColor).toBe('rgb(64, 64, 64)');
  expect(quoteWeight).toBe('bold');
  expect(quoteSize).toBe('20px');
  expect(quoteAlign).toBe('center');
});

test('quote-author class style', () => {
  const quoteAuthor = query(document, '.quote-author');

  const quoteAuthorWeight = getElementPropertyValue(quoteAuthor, 'font-weight');
  const quoteAuthorSize = getElementPropertyValue(quoteAuthor, 'font-size');
  const quoteAuthorAlign = getElementPropertyValue(quoteAuthor, 'text-align');

  expect(quoteAuthorWeight).toBe('normal');
  expect(quoteAuthorSize).toBe('16px');
  expect(quoteAuthorAlign).toBe('right');
});
