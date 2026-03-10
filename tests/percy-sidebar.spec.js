const { test } = require('@playwright/test');
const { percySnapshot } = require('@percy/playwright');

test.describe('Sidebar visual states (Percy)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('default sidebar', async ({ page }) => {
    await percySnapshot(page, 'Sidebar - default');
  });

  test('hover states for each sidebar button', async ({ page }) => {
    const buttons = [
      { id: '#sidebar-tasks', name: 'Tasks' },
      { id: '#sidebar-messages', name: 'Messages' },
      { id: '#sidebar-analytics', name: 'Analytics' },
      { id: '#sidebar-payments', name: 'Payments' }
    ];

    for (const btn of buttons) {
      await page.hover(btn.id);
      await percySnapshot(page, `Sidebar - ${btn.name} hover`,{
        scope: btn.id
      });
      // reset mouse
      await page.mouse.move(0, 0);
    }
  });

  test('focus states for each sidebar button', async ({ page }) => {
    const selectors = ['#sidebar-tasks', '#sidebar-messages', '#sidebar-analytics', '#sidebar-payments'];
    for (const sel of selectors) {
      await page.focus(sel);
      await percySnapshot(page, `Sidebar - ${sel} focus`, {
        scope: sel
      });
    }
  });

  test('active (pressed) state for a button', async ({ page }) => {
    const sel = '#sidebar-tasks';
    const el = await page.$(sel);
    const box = await el.boundingBox();
    // move to center and press
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await percySnapshot(page, 'Sidebar - tasks active', {
      scope: sel
    });
    await page.mouse.up();
  });
});


/*
await percySnapshot(page, 'Button with tooltip', {
  scope: '#button-container'
})
  */