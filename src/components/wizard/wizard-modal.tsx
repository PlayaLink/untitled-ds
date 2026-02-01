'use client'

/**
 * WizardModal component - Modal wrapper for multi-step wizard flows
 * Shares styling system with BaseModal for consistency
 */

import type { ComponentPropsWithRef, ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { ModalOverlay, Modal, Dialog } from '@/components/modal'
import { Button } from '@/components/button'
import { CloseButton } from '@/components/close-button'
import { FeaturedIcon, type FeaturedIconProps } from '@/components/featured-icon'
import { cx } from '@/utils/cx'

// =============================================================================
// Shared styling constants (matching BaseModal)
// =============================================================================

const sizeClasses = {
  sm: 'sm:max-w-[400px]',
  md: 'sm:max-w-[480px]',
  lg: 'sm:max-w-[560px]',
  xl: 'sm:max-w-[720px]',
}

// =============================================================================
// Types
// =============================================================================

export interface WizardModalStep {
  id: string
  title: string
  description?: string
}

export interface WizardModalContextValue {
  steps: WizardModalStep[]
  currentStepIndex: number
  currentStep: WizardModalStep | undefined
  isFirstStep: boolean
  isLastStep: boolean
  canGoBack: boolean
  canGoNext: boolean
  goToStep: (stepIndex: number) => void
  goNext: () => void
  goBack: () => void
  registerStep: (step: WizardModalStep, index: number) => void
  onClose: () => void
  isSubmitting: boolean
}

export interface WizardModalProps {
  isOpen: boolean
  onClose: () => void
  isSubmitting?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  defaultStep?: number
  title: string
  description?: string
  icon?: FeaturedIconProps['icon']
  iconColor?: FeaturedIconProps['color']
  children: ReactNode
  className?: string
}

export interface WizardModalProgressProps extends ComponentPropsWithRef<'div'> {
  showNumbers?: boolean
  showTitles?: boolean
}

export interface WizardModalStepProps extends ComponentPropsWithRef<'div'> {
  id: string
  title: string
  description?: string
  index: number
  children?: ReactNode
}

export interface WizardModalFooterProps extends ComponentPropsWithRef<'div'> {
  children?: ReactNode
}

export interface WizardModalBackButtonProps {
  children?: ReactNode
  onClick?: () => void
  isDisabled?: boolean
}

export interface WizardModalNextButtonProps {
  children?: ReactNode
  onClick?: () => void
  isDisabled?: boolean
  isLoading?: boolean
}

// =============================================================================
// Context
// =============================================================================

const WizardModalContext = createContext<WizardModalContextValue | null>(null)

export function useWizardModal() {
  const context = useContext(WizardModalContext)
  if (!context) {
    throw new Error('useWizardModal must be used within a WizardModal')
  }
  return context
}

// =============================================================================
// Components
// =============================================================================

export function WizardModalProgress({ showNumbers = true, showTitles = false, className, ...props }: WizardModalProgressProps) {
  const { steps, currentStepIndex } = useWizardModal()

  if (steps.length <= 1) return null

  return (
    <div className={cx('flex items-center justify-center gap-2 border-b border-secondary px-4 py-3', className)} {...props}>
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex
        const isCompleted = index < currentStepIndex

        return (
          <div key={step.id} className="flex items-center gap-2">
            {index > 0 && (
              <div className={cx('h-px w-6 sm:w-8', isCompleted ? 'bg-brand-500' : 'bg-border-secondary')} />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cx(
                  'flex items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  showNumbers ? 'size-6' : 'size-2',
                  isActive && 'bg-brand-500 text-white',
                  isCompleted && 'bg-brand-500 text-white',
                  !isActive && !isCompleted && 'bg-bg-tertiary text-fg-quaternary'
                )}
              >
                {showNumbers && index + 1}
              </div>
              {showTitles && (
                <span
                  className={cx(
                    'max-w-[80px] truncate text-center text-xs',
                    isActive && 'font-medium text-fg-primary',
                    isCompleted && 'text-fg-secondary',
                    !isActive && !isCompleted && 'text-fg-quaternary'
                  )}
                >
                  {step.title}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function WizardModalStep({ id, title, description, index, children, className, ...props }: WizardModalStepProps) {
  const { currentStepIndex, registerStep } = useWizardModal()

  useMemo(() => {
    registerStep({ id, title, description }, index)
  }, [id, title, description, index, registerStep])

  if (currentStepIndex !== index) {
    return null
  }

  return (
    <div className={cx('flex flex-col', className)} {...props}>
      {children}
    </div>
  )
}

export function WizardModalFooter({ children, className, ...props }: WizardModalFooterProps) {
  return (
    <div className={cx('flex items-center justify-end gap-3 border-t border-secondary px-4 py-4 sm:px-6', className)} {...props}>
      {children}
    </div>
  )
}

export function WizardModalBackButton({ children, onClick, isDisabled }: WizardModalBackButtonProps) {
  const { goBack, isFirstStep, onClose, isSubmitting } = useWizardModal()

  const handleClick = onClick ?? (isFirstStep ? onClose : goBack)
  const label = children ?? (isFirstStep ? 'Cancel' : 'Back')

  return (
    <Button color="secondary" size="lg" onClick={handleClick} isDisabled={isDisabled || isSubmitting}>
      {label}
    </Button>
  )
}

export function WizardModalNextButton({ children, onClick, isDisabled, isLoading }: WizardModalNextButtonProps) {
  const { goNext, isLastStep, isSubmitting } = useWizardModal()

  const handleClick = onClick ?? goNext
  const label = children ?? (isLastStep ? 'Complete' : 'Continue')

  return (
    <Button
      color="primary"
      size="lg"
      onClick={handleClick}
      isDisabled={isDisabled || isSubmitting}
      isLoading={isLoading || isSubmitting}
    >
      {label}
    </Button>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function WizardModal({
  isOpen,
  onClose,
  isSubmitting = false,
  size = 'md',
  defaultStep = 0,
  title,
  description,
  icon,
  iconColor = 'brand',
  children,
  className,
}: WizardModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(defaultStep)
  const [steps, setSteps] = useState<WizardModalStep[]>([])

  const registerStep = useCallback((step: WizardModalStep, index: number) => {
    setSteps((prev) => {
      const newSteps = [...prev]
      newSteps[index] = step
      return newSteps
    })
  }, [])

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStepIndex(stepIndex)
      }
    },
    [steps.length]
  )

  const goNext = useCallback(() => {
    goToStep(currentStepIndex + 1)
  }, [currentStepIndex, goToStep])

  const goBack = useCallback(() => {
    goToStep(currentStepIndex - 1)
  }, [currentStepIndex, goToStep])

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose()
    }
  }, [isSubmitting, onClose])

  const contextValue = useMemo<WizardModalContextValue>(
    () => ({
      steps,
      currentStepIndex,
      currentStep: steps[currentStepIndex],
      isFirstStep: currentStepIndex === 0,
      isLastStep: currentStepIndex === steps.length - 1,
      canGoBack: currentStepIndex > 0,
      canGoNext: currentStepIndex < steps.length - 1,
      goToStep,
      goNext,
      goBack,
      registerStep,
      onClose: handleClose,
      isSubmitting,
    }),
    [steps, currentStepIndex, goToStep, goNext, goBack, registerStep, handleClose, isSubmitting]
  )

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()} isDismissable={!isSubmitting}>
      <Modal>
        <Dialog>
          <WizardModalContext.Provider value={contextValue}>
            <div
              className={cx(
                'relative flex w-full flex-col overflow-hidden rounded-2xl bg-primary shadow-xl',
                sizeClasses[size],
                className
              )}
            >
              {/* Header */}
              <div className="flex items-start gap-4 border-b border-secondary px-4 py-5 sm:px-6">
                {icon && (
                  <FeaturedIcon icon={icon} color={iconColor} size="lg" theme="modern" className="max-sm:hidden" />
                )}
                <div className="flex flex-1 flex-col gap-0.5">
                  <h2 className="text-md font-semibold text-primary">{title}</h2>
                  {description && <p className="text-sm text-tertiary">{description}</p>}
                </div>
                <CloseButton onPress={handleClose} size="lg" />
              </div>

              {/* Progress indicator */}
              <WizardModalProgress />

              {/* Steps */}
              <div className="flex-1 px-4 py-5 sm:px-6">{children}</div>
            </div>
          </WizardModalContext.Provider>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

// Attach sub-components for convenience (not using compound pattern)
WizardModal.Progress = WizardModalProgress
WizardModal.Step = WizardModalStep
WizardModal.Footer = WizardModalFooter
WizardModal.BackButton = WizardModalBackButton
WizardModal.NextButton = WizardModalNextButton
