import figma from '@figma/code-connect'
import { Badge } from './badge'

/**
 * Code Connect for Badge component
 * Maps Figma component properties to React props
 * @see https://www.figma.com/code-connect-docs/react/
 */
figma.connect(Badge, 'https://www.figma.com/design/99BhJBqUTbouPjng6udcbz?node-id=18:30991', {
  props: {
    size: figma.enum('Size', {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    type: figma.enum('Type', {
      'Pill color': 'pill-color',
      'Badge color': 'badge-color',
      'Badge modern': 'badge-modern',
    }),
    color: figma.enum('Color', {
      Gray: 'gray',
      Brand: 'brand',
      Error: 'error',
      Warning: 'warning',
      Success: 'success',
      'Gray blue': 'gray-blue',
      'Blue light': 'blue-light',
      Blue: 'blue',
      Indigo: 'indigo',
      Purple: 'purple',
      Pink: 'pink',
      Orange: 'orange',
    }),
    hasIcon: figma.enum('Icon', {
      True: true,
      False: false,
    }),
  },
  example: (props) => (
    <Badge
      size={props.size}
      type={props.type}
      color={props.color}
      iconLeading={props.hasIcon ? Icon : undefined}
    >
      Label
    </Badge>
  ),
})

// Placeholder for icon in code example
const Icon = () => null
