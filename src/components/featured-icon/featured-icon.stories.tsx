import type { Meta, StoryObj } from '@storybook/react'
import { FeaturedIcon, type FeaturedIconTheme, type FeaturedIconSize, type FeaturedIconColor } from './featured-icon'
import { Icon } from '../icon'

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
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18487-14887',
        },
        github: {
            url: 'https://github.com/playalink/untitled-ds/blob/main/src/components/featured-icon/featured-icon.tsx',
        },
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <p className="text-secondary">
                View this component's source code and Figma design using the addon panels.
            </p>
            <div className="flex gap-4">
                <FeaturedIcon theme="light" color="brand" size="lg" icon={<Icon name="mail" size="xl" />} />
                <FeaturedIcon theme="gradient" color="success" size="lg" icon={<Icon name="check" size="xl" />} />
                <FeaturedIcon theme="dark" color="error" size="lg" icon={<Icon name="x-close" size="xl" />} />
            </div>
        </div>
    ),
}
