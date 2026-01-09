import figma from '@figma/code-connect'
import { ButtonGroup, ButtonGroupItem } from './button-group'

// Placeholder icon component for Code Connect examples
const Icon = () => null

/**
 * Code Connect for ButtonGroup component
 * Maps Figma component properties to React props
 * @see https://www.figma.com/code-connect-docs/react/
 */
figma.connect(ButtonGroup, 'https://www.figma.com/design/99BhJBqUTbouPjng6udcbz?node-id=19:1307', {
  props: {
    icon: figma.enum('Icon', {
      False: 'false',
      Leading: 'leading',
      Only: 'only',
    }),
  },
  example: (props) => {
    if (props.icon === 'only') {
      return (
        <ButtonGroup>
          <ButtonGroupItem id="1" iconLeading={Icon} aria-label="Action 1" />
          <ButtonGroupItem id="2" iconLeading={Icon} aria-label="Action 2" />
          <ButtonGroupItem id="3" iconLeading={Icon} aria-label="Action 3" />
        </ButtonGroup>
      )
    }
    if (props.icon === 'leading') {
      return (
        <ButtonGroup>
          <ButtonGroupItem id="1" iconLeading={Icon}>Text</ButtonGroupItem>
          <ButtonGroupItem id="2" iconLeading={Icon}>Text</ButtonGroupItem>
          <ButtonGroupItem id="3" iconLeading={Icon}>Text</ButtonGroupItem>
        </ButtonGroup>
      )
    }
    return (
      <ButtonGroup>
        <ButtonGroupItem id="1">Text</ButtonGroupItem>
        <ButtonGroupItem id="2">Text</ButtonGroupItem>
        <ButtonGroupItem id="3">Text</ButtonGroupItem>
      </ButtonGroup>
    )
  },
})
