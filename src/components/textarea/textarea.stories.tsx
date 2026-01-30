import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextArea, TextAreaBase } from './textarea'

/**
 * TextArea component for multi-line text input.
 *
 * ## Features
 * - Label and hint text support
 * - Validation states (invalid, disabled)
 * - Custom resize handle styling
 * - Built on React Aria for accessibility
 */
const meta: Meta<typeof TextArea> = {
    title: 'Form/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Label text for the textarea',
            table: { category: 'Content' },
        },
        hint: {
            control: 'text',
            description: 'Helper text displayed below the textarea',
            table: { category: 'Content' },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
            table: { category: 'Content' },
        },
        isRequired: {
            control: 'boolean',
            description: 'Whether the field is required',
            table: { category: 'State' },
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the textarea is disabled',
            table: { category: 'State' },
        },
        isInvalid: {
            control: 'boolean',
            description: 'Whether the textarea has an error',
            table: { category: 'State' },
        },
        rows: {
            control: 'number',
            description: 'Visible height in rows',
            table: { category: 'Layout' },
        },
        cols: {
            control: 'number',
            description: 'Visible width in columns',
            table: { category: 'Layout' },
        },
        className: {
            control: false,
            table: { category: 'Advanced' },
        },
    },
    args: {
        label: 'Description',
        placeholder: 'Enter a description...',
        rows: 4,
    },
}

export default meta
type Story = StoryObj<typeof TextArea>

// =============================================================================
// OVERVIEW (all variants)
// =============================================================================

/**
 * Visual showcase of textarea states and configurations.
 */
export const Overview: Story = {
    render: () => (
        <div className="flex flex-col gap-8 w-[400px]">
            {/* Default */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Default</h3>
                <TextArea
                    label="Description"
                    placeholder="Enter a description..."
                    rows={3}
                />
            </section>

            {/* With Hint */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">With Hint</h3>
                <TextArea
                    label="Bio"
                    hint="Write a short bio about yourself (max 500 characters)"
                    placeholder="Tell us about yourself..."
                    rows={4}
                />
            </section>

            {/* Required */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Required</h3>
                <TextArea
                    label="Feedback"
                    placeholder="Your feedback is important to us..."
                    isRequired
                    rows={3}
                />
            </section>

            {/* Invalid */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Invalid</h3>
                <TextArea
                    label="Comments"
                    hint="Please enter at least 10 characters"
                    placeholder="Enter your comments..."
                    isInvalid
                    rows={3}
                />
            </section>

            {/* Disabled */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Disabled</h3>
                <TextArea
                    label="Notes"
                    placeholder="Cannot edit..."
                    isDisabled
                    rows={3}
                />
            </section>

            {/* Base Component Only */}
            <section>
                <h3 className="text-sm font-medium text-tertiary mb-4">Base Component Only</h3>
                <TextAreaBase placeholder="Just the textarea..." rows={3} />
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
        label: 'Description',
        hint: 'This is helper text',
        placeholder: 'Enter a description...',
        isRequired: false,
        isDisabled: false,
        isInvalid: false,
        rows: 4,
    },
    render: (args) => (
        <div className="w-[400px]">
            <TextArea
                label={args.label}
                hint={args.hint}
                placeholder={args.placeholder}
                isRequired={args.isRequired}
                isDisabled={args.isDisabled}
                isInvalid={args.isInvalid}
                rows={args.rows}
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
            url: 'https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=5232-117168',
        },
        github: {
            url: 'https://github.com/playalink/untitled-ds/blob/main/src/components/textarea/textarea.tsx',
        },
    },
    render: () => {
        const [value, setValue] = useState('')
        return (
            <div className="flex flex-col gap-4 w-[400px]">
                <p className="text-secondary">
                    View this component's source code and Figma design using the addon panels.
                </p>
                <TextArea
                    label="Your message"
                    hint={`${value.length}/500 characters`}
                    placeholder="Type your message here..."
                    value={value}
                    onChange={setValue}
                    rows={4}
                />
            </div>
        )
    },
}
