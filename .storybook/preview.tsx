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
      return <Story />;
    },
  ],
}

export default preview
