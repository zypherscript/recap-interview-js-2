import { test, expect } from '@playwright/experimental-ct-react';
import Accordion from '../../src/components/Accordion/Accordion';
import React from 'react';

test('example test', async ({ mount }) => {
    const accordionComponent = await mount(<Accordion />);
    await expect(accordionComponent).toBeVisible();
});
