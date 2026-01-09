import figma from '@figma/code-connect'
import { Button } from './button'

/**
 * Code Connect for Button component
 * Maps Figma component properties to React props
 * @see https://www.figma.com/code-connect-docs/react/
 */
figma.connect(Button, 'https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/?node-id=18-30003', {
  props: {
    children: figma.string('Label'),
    size: figma.enum('Size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    }),
    color: figma.enum('Hierarchy', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      'Link color': 'link-color',
      'Link gray': 'link-gray',
    }),
    isDisabled: figma.boolean('State', {
      true: 'Disabled',
      false: 'Default',
    }),
    iconLeading: figma.boolean('Icon leading'),
    iconTrailing: figma.boolean('Icon trailing'),
  },
  example: (props) => <Button {...props} />,
})
