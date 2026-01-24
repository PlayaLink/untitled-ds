import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'
import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      // Set theme synchronously before render
      document.documentElement.setAttribute('data-theme', theme);
      // Set background color on Storybook's body based on theme
      document.body.style.backgroundColor = theme === 'dark' ? 'var(--color-bg-primary)' : '';
      return <Story />;
    },
  ],
}

export default preview
