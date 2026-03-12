const { test, expect } = require('@playwright/test');
const { percySnapshot } = require('@percy/playwright');

test.describe('Percy PoC', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html');
    });

    // Caso 1: Página completa — captura el layout global sin recorte
    test('01 - Full page', async ({ page }) => {
        await percySnapshot(page, '01 - Full page');
    });

    // Caso 2: Componente — captura una sola Card con scope
    test('02 - Component - Metric Card', async ({ page }) => {
        await expect(page.locator('#metric-1')).toBeVisible();
        await percySnapshot(page, '02 - Component - Metric Card', { scope: '#metric-1' });
    });

    // Caso 3: Estado interactivo — hover del botón Tasks via .percy-hover
    test('03 - Interactive - Button hover', async ({ page }) => {
        await expect(page.locator('#sidebar-tasks')).toBeVisible();
        await page.evaluate(() =>
            document.querySelector('#sidebar-tasks').classList.add('percy-hover')
        );
        await percySnapshot(page, '03 - Interactive - Sidebar Tasks hover', { scope: '#alt-nav' });
    });

    // Caso 4: Tooltip / Modal — abre el dropdown removiendo la clase 'invisible'
    test('04 - Tooltip - Dropdown menu', async ({ page }) => {
        await expect(page.locator('#myDropdown')).toBeAttached();
        await page.evaluate(() =>
            document.querySelector('#myDropdown').classList.remove('invisible')
        );
        await percySnapshot(page, '04 - Tooltip - Dropdown menu');
    });
});
