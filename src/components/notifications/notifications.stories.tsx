import type { Meta, StoryObj } from '@storybook/react'
import { IconNotification, AvatarNotification, ImageNotification, type NotificationColor } from './notifications'

/**
 * Notification components for displaying alerts and messages.
 *
 * ## Variants
 * - **IconNotification**: Standard notification with icon and optional progress
 * - **AvatarNotification**: Notification with user avatar for social/messaging
 * - **ImageNotification**: Rich notification with image
 *
 * ## Colors
 * - default (gray modern icon)
 * - brand, gray, error, warning, success (outline icons)
 */
const meta: Meta<typeof IconNotification> = {
    title: 'Application/Notifications',
    component: IconNotification,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Notification title',
            table: { category: 'Content' },
        },
        description: {
            control: 'text',
            description: 'Notification description',
            table: { category: 'Content' },
        },
        color: {
            control: 'select',
            options: ['default', 'brand', 'gray', 'error', 'warning', 'success'],
            description: 'Color variant',
            table: { category: 'Appearance' },
        },
        confirmLabel: {
            control: 'text',
            description: 'Confirm button label',
            table: { category: 'Actions' },
        },
        dismissLabel: {
            control: 'text',
            description: 'Dismiss button label',
            table: { category: 'Actions' },
        },
        progress: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Progress value (0-100)',
            table: { category: 'Content' },
        },
    },
    args: {
        title: 'Successfully updated',
        description: 'Your changes have been saved.',
        color: 'default',
        dismissLabel: 'Dismiss',
    },
}

export default meta
type Story = StoryObj<typeof IconNotification>

// =============================================================================
// OVERVIEW (all variants)
// =============================================================================

const colors: NotificationColor[] = ['default', 'brand', 'gray', 'success', 'warning', 'error']

/**
 * Visual showcase of notification variants.
 */
export const Overview: Story = {
    render: () => (
        <div className="flex flex-col gap-8 w-[480px]">
            {/* Icon Notifications by Color */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Icon Notifications</h3>
                <div className="flex flex-col gap-4">
                    {colors.map((color) => (
                        <IconNotification
                            key={color}
                            title={`${color.charAt(0).toUpperCase() + color.slice(1)} notification`}
                            description="This is a sample notification message."
                            color={color}
                            confirmLabel="View"
                        />
                    ))}
                </div>
            </section>

            {/* With Progress */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">With Progress</h3>
                <IconNotification
                    title="Uploading files..."
                    description="Please wait while your files are being uploaded."
                    progress={65}
                    confirmLabel="Cancel"
                    hideDismissLabel
                />
            </section>

            {/* Avatar Notification */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Avatar Notification</h3>
                <AvatarNotification
                    name="Olivia Rhye"
                    content="Hey, I've just sent you a new message! Can you check it when you have a chance?"
                    avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    date="5 min ago"
                    confirmLabel="Reply"
                />
            </section>

            {/* Image Notification */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Image Notification</h3>
                <ImageNotification
                    title="New feature available"
                    description="Check out our latest feature that helps you manage your workspace more efficiently."
                    imageMobile="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=300&fit=crop"
                    imageDesktop="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop"
                    confirmLabel="Learn more"
                />
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
        title: 'Successfully updated',
        description: 'Your changes have been saved.',
        color: 'success',
        confirmLabel: 'View changes',
        dismissLabel: 'Dismiss',
    },
    render: (args) => (
        <div className="w-[400px]">
            <IconNotification
                title={args.title}
                description={args.description}
                color={args.color as NotificationColor}
                confirmLabel={args.confirmLabel}
                dismissLabel={args.dismissLabel}
                progress={args.progress}
            />
        </div>
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
            url: 'https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=4296-24282',
        },
        github: {
            url: 'https://github.com/playalink/untitled-ds/blob/main/src/components/notifications/notifications.tsx',
        },
    },
    render: () => (
        <div className="flex flex-col gap-4 w-[400px]">
            <p className="text-secondary">
                View this component's source code and Figma design using the addon panels.
            </p>
            <IconNotification
                title="Order confirmed"
                description="Your order #12345 has been confirmed and is being processed."
                color="success"
                confirmLabel="Track order"
            />
        </div>
    ),
}
