const { test, expect } = require('@playwright/test');
const { percySnapshot } = require('@percy/playwright');

// CSS para hover y focus vive únicamente en index.html.
// .percy-hover / .percy-focus activan los mismos estilos que :hover / :focus
// para que Percy los capture en el snapshot sin duplicar CSS aquí.
const buttons = [
  { anchor: '#sidebar-tasks',     name: 'Tasks'     },
  { anchor: '#sidebar-messages',  name: 'Messages'  },
  { anchor: '#sidebar-analytics', name: 'Analytics' },
  { anchor: '#sidebar-payments',  name: 'Payments'  },
];

test.describe('Sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('initial state', async ({ page }) => {
    await expect(page.locator('#alt-nav')).toBeVisible();
    await percySnapshot(page, '01 - Sidebar - initial', { scope: '#alt-nav' });
  });

  test('hover state for each button', async ({ page }) => {
    for (const [i, btn] of buttons.entries()) {
      const n = String(2 + i).padStart(2, '0');
      await expect(page.locator(btn.anchor)).toBeVisible();
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.add('percy-hover'),
        btn.anchor
      );
      await percySnapshot(page, `${n} - Sidebar - ${btn.name} hover`, { scope: '#alt-nav' });
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.remove('percy-hover'),
        btn.anchor
      );
    }
  });

  test('focus state for each button', async ({ page }) => {
    for (const [i, btn] of buttons.entries()) {
      const n = String(6 + i).padStart(2, '0');
      await expect(page.locator(btn.anchor)).toBeVisible();
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.add('percy-focus'),
        btn.anchor
      );
      await percySnapshot(page, `${n} - Sidebar - ${btn.name} focus`, { scope: '#alt-nav' });
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.remove('percy-focus'),
        btn.anchor
      );
    }
  });
});
