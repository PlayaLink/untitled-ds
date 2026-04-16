import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './file-upload'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

interface DemoFile {
  id: string
  name: string
  size: number
  progress: number
  failed?: boolean
  type?: 'pdf' | 'img' | 'doc' | 'zip' | 'empty'
}

const meta: Meta<typeof FileUpload.DropZone> = {
  title: 'Application/FileUpload',
  component: FileUpload.DropZone,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hint: {
      control: 'text',
      description: 'Helper text below the upload prompt',
      table: { category: 'Content' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable drop + click to upload',
      table: { category: 'State' },
    },
    accept: {
      control: 'text',
      description: 'Comma-separated list of accepted file types',
      table: { category: 'Behavior' },
    },
    allowsMultiple: {
      control: 'boolean',
      description: 'Allow multiple files in one drop',
      table: { category: 'Behavior' },
    },
    maxSize: {
      control: { type: 'number', min: 1024, step: 1024 },
      description: 'Max file size in bytes',
      table: { category: 'Behavior' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
    isDisabled: false,
    allowsMultiple: true,
  },
}

export default meta
type Story = StoryObj<typeof FileUpload.DropZone>

// =============================================================================
// HELPERS
// =============================================================================

const uploadingFile: DemoFile = {
  id: '1',
  name: 'design-brief.pdf',
  size: 2_300_000,
  progress: 42,
  type: 'pdf',
}

const completeFile: DemoFile = {
  id: '2',
  name: 'hero-image.png',
  size: 1_100_000,
  progress: 100,
  type: 'img',
}

const failedFile: DemoFile = {
  id: '3',
  name: 'archive.zip',
  size: 8_400_000,
  progress: 0,
  type: 'zip',
  failed: true,
}

const InteractiveDemo = () => {
  const [files, setFiles] = useState<DemoFile[]>([completeFile])

  const addFile = () => {
    const nextId = `${Date.now()}`
    const newFile: DemoFile = {
      id: nextId,
      name: `uploaded-${files.length + 1}.pdf`,
      size: 1_500_000 + Math.floor(Math.random() * 3_000_000),
      progress: 0,
      type: 'pdf',
    }
    setFiles((prev) => [...prev, newFile])

    let pct = 0
    const interval = setInterval(() => {
      pct = Math.min(pct + 20, 100)
      setFiles((prev) => prev.map((f) => (f.id === nextId ? { ...f, progress: pct } : f)))
      if (pct >= 100) clearInterval(interval)
    }, 300)
  }

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))
  const retryFile = (id: string) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress: 25, failed: false } : f)))

  return (
    <div className="w-[480px]">
      <FileUpload.Root>
        <FileUpload.DropZone
          onDropFiles={addFile}
          hint="Any file type — this demo simulates progress."
        />
        <div className="flex justify-end">
          <Button color="secondary" size="sm" onPress={addFile}>
            Simulate new upload
          </Button>
        </div>
        <FileUpload.List>
          {files.map((file) => (
            <FileUpload.ListItemProgressBar
              key={file.id}
              name={file.name}
              size={file.size}
              progress={file.progress}
              failed={file.failed}
              type={file.type}
              onDelete={() => removeFile(file.id)}
              onRetry={() => retryFile(file.id)}
            />
          ))}
        </FileUpload.List>
      </FileUpload.Root>
    </div>
  )
}

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      data-referenceid="file-upload-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Idle drop zone</span>
        <div className="w-[480px]">
          <FileUpload.DropZone hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Disabled drop zone</span>
        <div className="w-[480px]">
          <FileUpload.DropZone isDisabled hint="Uploads are paused." />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">List item — uploading (progress bar)</span>
        <div className="w-[480px]">
          <FileUpload.List>
            <FileUpload.ListItemProgressBar
              name={uploadingFile.name}
              size={uploadingFile.size}
              progress={uploadingFile.progress}
              type={uploadingFile.type}
            />
          </FileUpload.List>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">List item — complete (progress bar)</span>
        <div className="w-[480px]">
          <FileUpload.List>
            <FileUpload.ListItemProgressBar
              name={completeFile.name}
              size={completeFile.size}
              progress={completeFile.progress}
              type={completeFile.type}
            />
          </FileUpload.List>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">List item — failed (progress bar)</span>
        <div className="w-[480px]">
          <FileUpload.List>
            <FileUpload.ListItemProgressBar
              name={failedFile.name}
              size={failedFile.size}
              progress={failedFile.progress}
              type={failedFile.type}
              failed
            />
          </FileUpload.List>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">List item — progress fill variant</span>
        <div className="w-[480px]">
          <FileUpload.List>
            <FileUpload.ListItemProgressFill
              name={uploadingFile.name}
              size={uploadingFile.size}
              progress={uploadingFile.progress}
              type={uploadingFile.type}
            />
          </FileUpload.List>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Interactive demo</span>
        <p className="text-xs text-quaternary">
          Click the drop zone or "Simulate new upload" to add a file — progress is simulated client-side.
        </p>
        <InteractiveDemo />
      </div>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
    isDisabled: false,
    allowsMultiple: true,
  },
  render: (args) => (
    <div className="w-[480px]">
      <FileUpload.DropZone
        hint={args.hint}
        isDisabled={args.isDisabled}
        accept={args.accept}
        allowsMultiple={args.allowsMultiple}
        maxSize={args.maxSize}
      />
    </div>
  ),
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/file-upload"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=1-2831"
          target="_blank"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
