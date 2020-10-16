import jestImageSnapshot from 'jest-image-snapshot';
// import { toMatchImageSnapshot } from 'jest-image-snapshot';

const { toMatchImageSnapshot } = jestImageSnapshot;

expect.extend({ toMatchImageSnapshot });

it('Shadow with a viewport width of 1200px', async () => {
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
  // await page.goto('/home/smile/code/html-hexlet-practic/02-CSS-positioning/03-relative-positioning/index.html');
  // await page.goto('index.html');
  await page.setViewport({ width: 1200, height: 400 });

  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot({
    failureThreshold: 0.02,
    failureThresholdType: 'percent',
  });
});
