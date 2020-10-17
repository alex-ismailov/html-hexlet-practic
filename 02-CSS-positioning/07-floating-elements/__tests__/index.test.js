/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import { query } from '@github/query-selector';
import path from 'path';
import css from 'css';


beforeAll(async () => {
  const styleData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/07-floating-elements/styles/app.css'),
  );
  const htmlData = await fs.promises.readFile(
    path.join(path.resolve(), '02-CSS-positioning/07-floating-elements/index.html'),
  );
  document.documentElement.innerHTML = htmlData.toString();

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styleData;
  document.head.appendChild(styleEl);
});

const styleData = fs.readFileSync(
  path.join(path.resolve(), '02-CSS-positioning/07-floating-elements/styles/app.css')
).toString();
const cssStyle = css.parse(styleData).stylesheet.rules;

const getFloatProperty = (selector) => {
  const declarations = cssStyle.filter(({ selectors }) => {
    if (selectors) {
      return selectors.join() === selector;
    }
  })[0].declarations;

  return declarations.filter(({ property }) => property === 'float')[0].value;
};

test('float in left-aside block', () => {
  const value = getFloatProperty('.left-aside');
  expect(value).toBe('left');
});

test('float in right-aside block', () => {
  const value = getFloatProperty('.right-aside');
  expect(value).toBe('left');
});

test('float in main block', () => {
  const value = getFloatProperty('main');
  expect(value).toBe('left');
});

test('clear in footer block', () => {
  const element = query(document, 'footer');
  expect(element).toHaveStyle('clear: both');
});
