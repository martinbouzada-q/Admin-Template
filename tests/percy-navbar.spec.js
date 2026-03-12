const { test, expect } = require('@playwright/test');
const { percySnapshot } = require('@percy/playwright');

const navLinks = [
  { anchor: '#nav-active', name: 'Active' },
  { anchor: '#nav-link',   name: 'Link'   },
];

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('search hover', async ({ page }) => {
    await expect(page.locator('#search')).toBeVisible();
    await page.evaluate(() => document.querySelector('#search').classList.add('percy-hover'));
    await percySnapshot(page, '10 - Navbar - search hover', { scope: '#top-nav' });
    await page.evaluate(() => document.querySelector('#search').classList.remove('percy-hover'));
  });

  test('search focus', async ({ page }) => {
    await expect(page.locator('#search')).toBeVisible();
    await page.evaluate(() => document.querySelector('#search').classList.add('percy-focus'));
    await percySnapshot(page, '11 - Navbar - search focus', { scope: '#top-nav' });
    await page.evaluate(() => document.querySelector('#search').classList.remove('percy-focus'));
  });

  test('nav link hover', async ({ page }) => {
    for (const [i, link] of navLinks.entries()) {
      const n = String(12 + i).padStart(2, '0');
      await expect(page.locator(link.anchor)).toBeVisible();
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.add('percy-hover'),
        link.anchor
      );
      await percySnapshot(page, `${n} - Navbar - ${link.name} hover`, { scope: '#top-nav' });
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.remove('percy-hover'),
        link.anchor
      );
    }
  });

  test('nav link focus', async ({ page }) => {
    for (const [i, link] of navLinks.entries()) {
      const n = String(14 + i).padStart(2, '0');
      await expect(page.locator(link.anchor)).toBeVisible();
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.add('percy-focus'),
        link.anchor
      );
      await percySnapshot(page, `${n} - Navbar - ${link.name} focus`, { scope: '#top-nav' });
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.remove('percy-focus'),
        link.anchor
      );
    }
  });
});
