'use client'

/**
 * Empty State component
 * @docs https://www.untitledui.com/components/empty-state
 */

import type { ComponentProps, ComponentPropsWithRef, ReactElement, ReactNode } from 'react'
import { Children, createContext, isValidElement, useContext } from 'react'
import { FileIcon } from '@untitledui/file-icons'
import { FeaturedIcon as FeaturedIconBase } from '@/components/featured-icon'
import type { BackgroundPatternProps } from '@/components/shared-assets'
import { BackgroundPattern, Illustration as Illustrations } from '@/components/shared-assets'
import { Icon } from '@/components/icon'
import { cx } from '@/utils/cx'

export interface EmptyStateRootContextProps {
  size?: 'sm' | 'md' | 'lg'
}

const RootContext = createContext<EmptyStateRootContextProps>({ size: 'lg' })

export interface EmptyStateRootProps extends ComponentPropsWithRef<'div'>, EmptyStateRootContextProps {
  children?: ReactNode
}

const Root = ({ size = 'lg', ...props }: EmptyStateRootProps) => {
  return (
    <RootContext.Provider value={{ size }}>
      <div {...props} className={cx('mx-auto flex w-full max-w-lg flex-col', props.className)} />
    </RootContext.Provider>
  )
}

const SearchIcon = () => <Icon name="search" size="lg" />

const FeaturedIcon = ({ color = 'gray', theme = 'modern', icon = SearchIcon, size = 'lg', ...props }: ComponentPropsWithRef<typeof FeaturedIconBase>) => {
  const { size: rootSize } = useContext(RootContext)

  return <FeaturedIconBase {...props} {...{ color, theme, icon }} size={rootSize === 'lg' ? 'xl' : size} />
}

const Illustration = ({ type = 'cloud', color = 'gray', size = 'lg', ...props }: ComponentPropsWithRef<typeof Illustrations>) => {
  const { size: rootSize } = useContext(RootContext)

  return (
    <Illustrations
      role="img"
      {...props}
      {...{ type, color }}
      size={rootSize === 'sm' ? 'sm' : rootSize === 'md' ? 'md' : size}
      className={cx('z-10', props.className)}
    />
  )
}

const FileTypeIcon = ({ type = 'folder', theme = 'solid', ...props }: EmptyStateFileTypeIconProps) => {
  return (
    <div {...props} className={cx('relative z-10 flex rounded-full bg-linear-to-b from-gray-50 to-gray-200 p-8', props.className)}>
      <FileIcon type={type} variant={theme} className="size-10 drop-shadow-sm" />
    </div>
  )
}

export interface EmptyStateHeaderProps extends ComponentPropsWithRef<'div'> {
  children?: ReactNode
  pattern?: 'none' | BackgroundPatternProps['pattern']
  patternSize?: 'sm' | 'md' | 'lg'
}

const Header = ({ pattern = 'circle', patternSize = 'md', ...props }: EmptyStateHeaderProps) => {
  const { size } = useContext(RootContext)
  // Whether we are passing `Illustration` component as children.
  const hasIllustration = Children.toArray(props.children).some((headerChild) => isValidElement(headerChild) && headerChild.type === Illustration)

  return (
    <header
      {...props}
      className={cx('relative mx-auto mb-4 flex flex-col items-center', (size === 'md' || size === 'lg') && 'mb-5', hasIllustration && size === 'lg' && 'mb-6!', props.className)}
    >
      {pattern !== 'none' && (
        <BackgroundPattern size={patternSize} pattern={pattern} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
      {props.children}
    </header>
  )
}

const Content = (props: ComponentPropsWithRef<'div'>) => {
  const { size } = useContext(RootContext)

  return (
    <div
      {...props}
      className={cx(
        'z-10 mx-auto mb-6 flex w-full max-w-sm flex-col gap-1',
        (size === 'md' || size === 'lg') && 'mb-8 gap-2',
        props.className,
      )}
    />
  )
}

const Footer = (props: ComponentPropsWithRef<'div'>) => {
  return <footer {...props} className={cx('z-10 mx-auto flex gap-3', props.className)} />
}

const Title = (props: ComponentPropsWithRef<'h1'>) => {
  const { size } = useContext(RootContext)

  return (
    <h1
      {...props}
      className={cx(
        'w-full text-center text-md font-semibold text-primary',
        size === 'md' && 'text-lg font-semibold',
        size === 'lg' && 'text-xl font-semibold',
        props.className,
      )}
    />
  )
}

const Description = (props: ComponentPropsWithRef<'p'>) => {
  const { size } = useContext(RootContext)

  return <p {...props} className={cx('w-full text-center text-sm text-tertiary', size === 'lg' && 'text-md', props.className)} />
}

export type EmptyStateContentProps = ComponentPropsWithRef<'div'>
export type EmptyStateFooterProps = ComponentPropsWithRef<'div'>
export type EmptyStateTitleProps = ComponentPropsWithRef<'h1'>
export type EmptyStateDescriptionProps = ComponentPropsWithRef<'p'>
export type EmptyStateIllustrationProps = ComponentPropsWithRef<typeof Illustrations>
export type EmptyStateFeaturedIconProps = ComponentPropsWithRef<typeof FeaturedIconBase>
export interface EmptyStateFileTypeIconProps extends ComponentPropsWithRef<'div'> {
  type?: ComponentProps<typeof FileIcon>['type']
  theme?: ComponentProps<typeof FileIcon>['variant']
}

export interface EmptyStateComponent {
  (props: EmptyStateRootProps): ReactElement
  Title: (props: EmptyStateTitleProps) => ReactElement
  Header: (props: EmptyStateHeaderProps) => ReactElement
  Footer: (props: EmptyStateFooterProps) => ReactElement
  Content: (props: EmptyStateContentProps) => ReactElement
  Description: (props: EmptyStateDescriptionProps) => ReactElement
  Illustration: (props: EmptyStateIllustrationProps) => ReactElement
  FeaturedIcon: (props: EmptyStateFeaturedIconProps) => ReactElement
  FileTypeIcon: (props: EmptyStateFileTypeIconProps) => ReactElement
}

const EmptyState = Root as EmptyStateComponent

EmptyState.Title = Title
EmptyState.Header = Header
EmptyState.Footer = Footer
EmptyState.Content = Content
EmptyState.Description = Description
EmptyState.Illustration = Illustration
EmptyState.FeaturedIcon = FeaturedIcon
EmptyState.FileTypeIcon = FileTypeIcon

export { EmptyState }
