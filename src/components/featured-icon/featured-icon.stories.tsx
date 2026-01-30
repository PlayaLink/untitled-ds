import type { Meta, StoryObj } from '@storybook/react'
import { FeaturedIcon, type FeaturedIconTheme, type FeaturedIconSize, type FeaturedIconColor } from './featured-icon'
import { Icon, createIcon } from '../icon'
import { Button } from '../button'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

/**
 * Featured Icon component for highlighting important icons with decorative backgrounds.
 *
 * ## Features
 * - Multiple themes: light, gradient, dark, modern, modern-neue, outline
 * - 5 color options: brand, gray, success, warning, error
 * - 4 sizes: sm, md, lg, xl
 * - Accepts icon as component or ReactNode
 */
const meta: Meta<typeof FeaturedIcon> = {
    title: 'Foundations/FeaturedIcon',
    component: FeaturedIcon,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        theme: {
            control: 'select',
            options: ['light', 'gradient', 'dark', 'modern', 'modern-neue', 'outline'],
            description: 'Visual theme of the featured icon',
            table: { category: 'Appearance' },
        },
        color: {
            control: 'select',
            options: ['brand', 'gray', 'success', 'warning', 'error'],
            description: 'Color variant',
            table: { category: 'Appearance' },
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'Size of the featured icon',
            table: { category: 'Appearance' },
        },
        icon: {
            control: false,
            description: 'Icon component or ReactNode',
            table: { category: 'Content' },
        },
        className: {
            control: false,
            table: { category: 'Advanced' },
        },
    },
    args: {
        theme: 'light',
        color: 'brand',
        size: 'md',
    },
}

export default meta
type Story = StoryObj<typeof FeaturedIcon>

// =============================================================================
// OVERVIEW (all variants)
// =============================================================================

const themes: FeaturedIconTheme[] = ['light', 'gradient', 'dark', 'modern', 'modern-neue', 'outline']
const colors: FeaturedIconColor[] = ['brand', 'gray', 'success', 'warning', 'error']
const sizes: FeaturedIconSize[] = ['sm', 'md', 'lg', 'xl']

/**
 * Visual showcase of all featured icon variants.
 */
export const Overview: Story = {
    render: () => (
        <div className="flex flex-col gap-12">
            {/* Themes */}
            {themes.map((theme) => (
                <section key={theme}>
                    <h3 className="text-sm font-medium text-tertiary mb-4 capitalize">{theme}</h3>
                    <div className="flex flex-wrap items-center gap-4">
                        {colors.map((color) => (
                            <FeaturedIcon
                                key={`${theme}-${color}`}
                                theme={theme}
                                color={color}
                                size="lg"
                                icon={<Icon name="settings" size="xl" />}
                            />
                        ))}
                    </div>
                </section>
            ))}

            {/* Sizes */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Sizes</h3>
                <div className="flex items-end gap-4">
                    {sizes.map((size) => (
                        <div key={size} className="flex flex-col items-center gap-2">
                            <FeaturedIcon
                                theme="light"
                                color="brand"
                                size={size}
                                icon={<Icon name="settings" size={size === 'sm' ? 'md' : size === 'md' ? 'lg' : size === 'lg' ? 'xl' : '2xl'} />}
                            />
                            <span className="text-xs text-tertiary">{size}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

/**
 * Interactive playground for testing props.
 */
export const Props: Story = {
    tags: ['show-panel'],
    args: {
        theme: 'light',
        color: 'brand',
        size: 'lg',
    },
    render: (args) => (
        <FeaturedIcon
            theme={args.theme as FeaturedIconTheme}
            color={args.color as FeaturedIconColor}
            size={args.size as FeaturedIconSize}
            icon={<Icon name="settings" size="xl" />}
        />
    ),
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

/**
 * Links to source code and Figma design.
 */
export const SourceCodeAndDesign: Story = {
    name: 'Source Code + Design',
    render: () => (
        <div className="flex min-w-[480px] flex-col items-center gap-8 py-12">
            <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-display-xs font-semibold text-primary">Source Code + Figma Design</h2>
                <p className="text-md text-tertiary">This component was built from the Untitled Design System</p>
            </div>
            <div className="flex gap-4">
                <Button
                    href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/featured-icon"
                    iconLeading={GitHubIcon}
                    color="secondary"
                >
                    View on GitHub
                </Button>
                <Button
                    href="https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18487-14887"
                    iconLeading={FigmaIcon}
                    color="primary"
                >
                    View in Figma
                </Button>
            </div>
        </div>
    ),
}
