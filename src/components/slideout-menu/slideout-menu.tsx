'use client'

/**
 * SlideoutMenu component
 *
 * A slide-in panel that overlays the page from the left or right edge.
 * Wraps React Aria's modal/dialog primitives with slide-in animation and positioning.
 *
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=18491-60382
 * @docs https://www.untitledui.com/components/slideout-menu
 *
 * Figma properties → React props:
 * - Position   → `position` ("left" | "right")
 * - Breakpoint → responsive styles (built-in)
 * - Type       → consumer renders content via `children`
 */

import { type ComponentPropsWithRef, type ReactNode, type RefAttributes, type CSSProperties } from 'react'
import type {
  DialogProps as AriaDialogProps,
  ModalOverlayProps as AriaModalOverlayProps,
  ModalRenderProps as AriaModalRenderProps,
} from 'react-aria-components'
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from 'react-aria-components'
import { CloseButton } from '@/components/close-button'
import { sortCx, cx } from '@/utils/cx'
import { useSlideoutResize } from './use-slideout-resize'

// =============================================================================
// TYPES
// =============================================================================

export type SlideoutMenuPosition = 'left' | 'right'

export interface SlideoutMenuProps extends Omit<AriaModalOverlayProps, 'children'>, RefAttributes<HTMLDivElement> {
  /** Content rendered inside the dialog */
  children: ReactNode | ((state: AriaModalRenderProps & { close: () => void }) => ReactNode)
  /** Additional CSS classes for the dialog element */
  dialogClassName?: string
  /** Which edge the slideout opens from */
  position?: SlideoutMenuPosition
  /** Enable drag-to-resize on the inner edge */
  resizable?: boolean
  /** Controlled width in px (used with onWidthChange) */
  width?: number
  /** Callback when the user resizes the panel */
  onWidthChange?: (width: number) => void
  /** Fallback width when no controlled value is provided (default 500) */
  defaultWidth?: number
  /** Minimum resize width in px (default 320) */
  minWidth?: number
  /** Maximum resize width in px (default 90vw) */
  maxWidth?: number
}

interface SlideoutHeaderProps extends ComponentPropsWithRef<'header'> {
  /** Callback fired when the close button is pressed */
  onClose?: () => void
}

// =============================================================================
// STYLES
// =============================================================================

export const styles = sortCx({
  overlay: {
    base: 'fixed inset-0 z-50 flex min-h-dvh w-full items-center bg-overlay/70 outline-hidden ease-linear',
    entering: 'duration-300 animate-in fade-in',
    exiting: 'duration-500 animate-out fade-out',
    position: {
      left: 'justify-start pr-6 md:pr-10',
      right: 'justify-end pl-6 md:pl-10',
    },
  },
  modal: {
    base: 'h-full w-full max-w-[500px] shadow-xl transition',
    position: {
      left: {
        entering: 'duration-300 animate-in slide-in-from-left',
        exiting: 'duration-500 animate-out slide-out-to-left',
      },
      right: {
        entering: 'duration-300 animate-in slide-in-from-right',
        exiting: 'duration-500 animate-out slide-out-to-right',
      },
    },
  },
  dialog: 'relative flex size-full flex-col items-start gap-6 overflow-y-auto bg-primary ring-1 ring-border-secondary-alt outline-hidden',
  content: 'flex size-full flex-col gap-6 overflow-y-auto overscroll-auto px-4 md:px-6',
  header: 'relative z-1 w-full px-4 pt-6 md:px-6',
  headerCloseButton: 'absolute top-3 right-3 shrink-0',
  footer: 'w-full border-t border-secondary p-4 md:px-6',
  resizeHandle: {
    base: 'absolute top-0 z-10 h-full w-1 cursor-col-resize select-none touch-none bg-transparent transition-colors hover:bg-brand-500 active:bg-brand-600 dark:hover:bg-brand-400 dark:active:bg-brand-500',
    position: {
      left: 'right-0',
      right: 'left-0',
    },
  },
})

// =============================================================================
// COMPONENT
// =============================================================================

const SlideoutMenuOverlay = ({ position = 'right', ...props }: AriaModalOverlayProps & RefAttributes<HTMLDivElement> & { position?: SlideoutMenuPosition }) => (
  <AriaModalOverlay
    {...props}
    className={(state) =>
      cx(
        styles.overlay.base,
        styles.overlay.position[position],
        state.isEntering && styles.overlay.entering,
        state.isExiting && styles.overlay.exiting,
        typeof props.className === 'function' ? props.className(state) : props.className,
      )
    }
    data-untitled-ds='SlideoutMenuOverlay' />
)

interface SlideoutMenuModalProps extends AriaModalOverlayProps, RefAttributes<HTMLDivElement> {
  position?: SlideoutMenuPosition
  isDragging?: boolean
  widthStyle?: CSSProperties
}

const SlideoutMenuModal = ({ position = 'right', isDragging, widthStyle, ...props }: SlideoutMenuModalProps) => (
  <AriaModal
    {...props}
    style={widthStyle}
    className={(state) =>
      cx(
        styles.modal.base,
        isDragging && '!transition-none',
        state.isEntering && styles.modal.position[position].entering,
        state.isExiting && styles.modal.position[position].exiting,
        typeof props.className === 'function' ? props.className(state) : props.className,
      )
    }
    data-untitled-ds='SlideoutMenuModal' />
)

const SlideoutMenuDialog = (props: AriaDialogProps & RefAttributes<HTMLElement>) => (
  <AriaDialog
    role="dialog"
    {...props}
    className={cx(styles.dialog, props.className)}
    data-untitled-ds='SlideoutMenuDialog' />
)

const ResizeEdge = ({ position, ...props }: { position: SlideoutMenuPosition } & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cx(styles.resizeHandle.base, styles.resizeHandle.position[position])}
    aria-hidden
    data-untitled-ds='ResizeEdge' />
)

const DEFAULT_WIDTH = 500
const DEFAULT_MIN_WIDTH = 320

const Menu = ({
  children,
  dialogClassName,
  position = 'right',
  resizable = false,
  width: controlledWidth,
  onWidthChange,
  defaultWidth = DEFAULT_WIDTH,
  minWidth = DEFAULT_MIN_WIDTH,
  maxWidth: maxWidthProp,
  ...props
}: SlideoutMenuProps) => {
  const effectiveWidth = controlledWidth ?? defaultWidth
  const effectiveMaxWidth = maxWidthProp ?? (typeof window !== 'undefined' ? window.innerWidth * 0.9 : 1200)

  const { isDragging, resizeHandleProps } = useSlideoutResize({
    position,
    width: effectiveWidth,
    onWidthChange: onWidthChange ?? (() => {}),
    minWidth,
    maxWidth: effectiveMaxWidth,
  })

  const widthStyle: CSSProperties | undefined = resizable
    ? { maxWidth: effectiveWidth, width: effectiveWidth }
    : undefined

  return (
    <SlideoutMenuOverlay position={position} {...props} data-untitled-ds='Menu'>
      <SlideoutMenuModal position={position} isDragging={resizable && isDragging} widthStyle={widthStyle}>
        {(state) => (
          <SlideoutMenuDialog className={dialogClassName}>
            {({ close }) => (
              <>
                {resizable && <ResizeEdge position={position} {...resizeHandleProps} />}
                {typeof children === 'function' ? children({ ...state, close }) : children}
              </>
            )}
          </SlideoutMenuDialog>
        )}
      </SlideoutMenuModal>
    </SlideoutMenuOverlay>
  );
}

const Content = ({ role = 'main', ...props }: ComponentPropsWithRef<'div'>) => (
  <div
    role={role}
    {...props}
    className={cx(styles.content, props.className)}
    data-untitled-ds='Content' />
)

const Header = ({ className, children, onClose, ...props }: SlideoutHeaderProps) => (
  <header
    {...props}
    className={cx(styles.header, className)}
    data-untitled-ds='Header'>
    {children}
    <CloseButton size="md" className={styles.headerCloseButton} onPress={onClose} />
  </header>
)

const Footer = (props: ComponentPropsWithRef<'footer'>) => (
  <footer
    {...props}
    className={cx(styles.footer, props.className)}
    data-untitled-ds='Footer' />
)

const SlideoutMenu = Menu as typeof Menu & {
  Trigger: typeof AriaDialogTrigger
  Content: typeof Content
  Header: typeof Header
  Footer: typeof Footer
}

SlideoutMenu.Trigger = AriaDialogTrigger
SlideoutMenu.Content = Content
SlideoutMenu.Header = Header
SlideoutMenu.Footer = Footer

export { SlideoutMenu }

export type { SlideoutHeaderProps }
