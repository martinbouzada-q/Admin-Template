const { test, expect } = require('@playwright/test');
const { percySnapshot } = require('@percy/playwright');

const metricCards = [
  { id: '#metric-1', name: 'Total Revenue' },
  { id: '#metric-2', name: 'Total Users'   },
  { id: '#metric-3', name: 'New Users'     },
  { id: '#metric-4', name: 'Server Uptime' },
  { id: '#metric-5', name: 'To Do List'    },
  { id: '#metric-6', name: 'Issues'        },
];

const graphs = [
  { id: '#graph-1', canvas: '#chartjs-7', name: 'Bar + Line' },
  { id: '#graph-2', canvas: '#chartjs-0', name: 'Line'       },
  { id: '#graph-3', canvas: '#chartjs-1', name: 'Bar'        },
  { id: '#graph-4', canvas: '#chartjs-4', name: 'Doughnut'   },
];

test.describe('Analytics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('metric card hover', async ({ page }) => {
    for (const [i, card] of metricCards.entries()) {
      const n = String(16 + i).padStart(2, '0');
      const inner = page.locator(`${card.id} .bg-gradient-to-b`);
      await expect(inner).toBeVisible();
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.add('percy-hover'),
        `${card.id} .bg-gradient-to-b`
      );
      await percySnapshot(page, `${n} - Analytics - ${card.name} card hover`, { scope: card.id });
      await page.evaluate(
        (sel) => document.querySelector(sel).classList.remove('percy-hover'),
        `${card.id} .bg-gradient-to-b`
      );
    }
  });

  test('graph tooltip on hover', async ({ page }) => {
    for (const [i, graph] of graphs.entries()) {
      const n = String(22 + i).padStart(2, '0');
      const canvas = page.locator(graph.canvas);
      await expect(canvas).toBeVisible();

      const box = await canvas.boundingBox();
      await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.35);
      await page.waitForTimeout(300);

      await percySnapshot(page, `${n} - Analytics - ${graph.name} graph tooltip`, { scope: graph.id });

      await page.mouse.move(0, 0);
    }
  });
});
