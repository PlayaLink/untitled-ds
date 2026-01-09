import figma from '@figma/code-connect'
import { Tag } from './tag'

/**
 * Code Connect for Tag component
 * Maps Figma component properties to React props
 * @see https://www.figma.com/code-connect-docs/react/
 */
figma.connect(Tag, 'https://www.figma.com/design/99BhJBqUTbouPjng6udcbz?node-id=18:35311', {
  props: {
    size: figma.enum('Size', {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    hasIcon: figma.enum('Icon', {
      True: true,
      False: false,
    }),
    action: figma.enum('Action', {
      'Text only': 'text',
      'X close': 'close',
      Count: 'count',
    }),
    hasCheckbox: figma.enum('Checkbox', {
      True: true,
      False: false,
    }),
  },
  example: (props) => (
    <Tag
      size={props.size}
      iconLeading={props.hasIcon ? Icon : undefined}
      onClose={props.action === 'close' ? () => {} : undefined}
      count={props.action === 'count' ? 5 : undefined}
      checked={props.hasCheckbox ? false : undefined}
      onCheckedChange={props.hasCheckbox ? () => {} : undefined}
    >
      Label
    </Tag>
  ),
})

// Placeholder for icon in code example
const Icon = () => null
