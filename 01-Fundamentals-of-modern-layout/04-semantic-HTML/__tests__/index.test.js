// @ts-check
import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import { query, querySelectorAll } from '@github/query-selector';

beforeAll(async () => {
  const htmlData = await fs.promises.readFile('./01-Fundamentals-of-modern-layout/04-semantic-HTML/index.html');
  document.documentElement.innerHTML = htmlData.toString();
});

test('Header element to be in the document', () => {
  const header = query(document, 'header');
  expect(header).toBeInTheDocument();
});

test('There are 4 links inside the menu', () => {
  const header = query(document, 'header');
  const nav = query(header, 'nav');

  const navLinks = querySelectorAll(nav, 'a');

  expect(navLinks.length).toBe(4);

  navLinks.forEach((link) => {
    expect(link).toHaveAttribute('href');
  });
});

test('Main element to be in the document', () => {
  const main = query(document, 'main');
  expect(main).toBeInTheDocument();
});

test('Aside element to be in the main element', () => {
  const main = query(document, 'main');
  const aside = query(main, 'aside');

  expect(aside).toBeInTheDocument();
  expect(aside).not.toHaveTextContent('');
});

test('Section element to be in the main element', () => {
  const main = query(document, 'main');
  const section = query(main, 'section');

  expect(section).toBeInTheDocument();
  expect(section).not.toHaveTextContent('');
});

test('Article element to be in the section element', () => {
  const main = query(document, 'main');
  const section = query(main, 'section');
  const articles = querySelectorAll(section, 'article');

  expect(articles.length).toBe(4);

  articles.forEach((article) => {
    expect(article).not.toHaveTextContent('');
  });
});
