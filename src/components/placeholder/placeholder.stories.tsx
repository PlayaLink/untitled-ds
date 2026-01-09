import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from './placeholder'

const meta = {
  title: 'Getting Started/Placeholder',
  component: Placeholder,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Design System Ready',
  },
}
