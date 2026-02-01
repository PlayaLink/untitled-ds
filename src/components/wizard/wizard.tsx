'use client'

/**
 * Wizard component for multi-step flows
 * @docs https://www.untitledui.com/components/wizard
 */

import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { cx } from '@/utils/cx'

// =============================================================================
// Context
// =============================================================================

export interface WizardStep {
  id: string
  title: string
  description?: string
}

export interface WizardContextValue {
  steps: WizardStep[]
  currentStepIndex: number
  currentStep: WizardStep | undefined
  isFirstStep: boolean
  isLastStep: boolean
  canGoBack: boolean
  canGoNext: boolean
  goToStep: (stepIndex: number) => void
  goNext: () => void
  goBack: () => void
  registerStep: (step: WizardStep, index: number) => void
}

const WizardContext = createContext<WizardContextValue | null>(null)

export const useWizard = () => {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within a Wizard.Root')
  }
  return context
}

// =============================================================================
// Root
// =============================================================================

export interface WizardRootProps extends ComponentPropsWithRef<'div'> {
  children?: ReactNode
  /** Initial step index (0-based) */
  defaultStep?: number
  /** Controlled step index */
  step?: number
  /** Callback when step changes */
  onStepChange?: (stepIndex: number) => void
}

const Root = ({ defaultStep = 0, step: controlledStep, onStepChange, children, className, ...props }: WizardRootProps) => {
  const [internalStep, setInternalStep] = useState(defaultStep)
  const [steps, setSteps] = useState<WizardStep[]>([])

  const currentStepIndex = controlledStep ?? internalStep

  const registerStep = useCallback((step: WizardStep, index: number) => {
    setSteps((prev) => {
      const newSteps = [...prev]
      newSteps[index] = step
      return newSteps
    })
  }, [])

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setInternalStep(stepIndex)
        onStepChange?.(stepIndex)
      }
    },
    [steps.length, onStepChange],
  )

  const goNext = useCallback(() => {
    goToStep(currentStepIndex + 1)
  }, [currentStepIndex, goToStep])

  const goBack = useCallback(() => {
    goToStep(currentStepIndex - 1)
  }, [currentStepIndex, goToStep])

  const contextValue = useMemo<WizardContextValue>(
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
    }),
    [steps, currentStepIndex, goToStep, goNext, goBack, registerStep],
  )

  return (
    <WizardContext.Provider value={contextValue}>
      <div className={cx('flex flex-col', className)} {...props}>
        {children}
      </div>
    </WizardContext.Provider>
  )
}

// =============================================================================
// Progress
// =============================================================================

export interface WizardProgressProps extends ComponentPropsWithRef<'div'> {
  /** Show step numbers instead of dots */
  showNumbers?: boolean
  /** Show step titles */
  showTitles?: boolean
}

const Progress = ({ showNumbers = false, showTitles = false, className, ...props }: WizardProgressProps) => {
  const { steps, currentStepIndex } = useWizard()

  return (
    <div className={cx('flex items-center justify-center gap-2', className)} {...props}>
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex
        const isCompleted = index < currentStepIndex

        return (
          <div key={step.id} className="flex items-center gap-2">
            {index > 0 && <div className={cx('h-px w-8', isCompleted ? 'bg-brand-500' : 'bg-border-secondary')} />}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cx(
                  'flex items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  showNumbers ? 'size-6' : 'size-2',
                  isActive && 'bg-brand-500 text-white',
                  isCompleted && 'bg-brand-500 text-white',
                  !isActive && !isCompleted && 'bg-bg-tertiary text-fg-quaternary',
                )}
              >
                {showNumbers && index + 1}
              </div>
              {showTitles && (
                <span
                  className={cx(
                    'text-xs',
                    isActive && 'font-medium text-fg-primary',
                    isCompleted && 'text-fg-secondary',
                    !isActive && !isCompleted && 'text-fg-quaternary',
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

// =============================================================================
// Step
// =============================================================================

export interface WizardStepProps extends ComponentPropsWithRef<'div'> {
  children?: ReactNode
  /** Unique identifier for this step */
  id: string
  /** Step title (shown in progress indicator) */
  title: string
  /** Step description */
  description?: string
  /** Index of this step (auto-assigned if not provided) */
  index?: number
}

const Step = ({ id, title, description, index = 0, children, className, ...props }: WizardStepProps) => {
  const { currentStepIndex, registerStep } = useWizard()

  // Register step on mount
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

// =============================================================================
// Header
// =============================================================================

export interface WizardHeaderProps extends ComponentPropsWithRef<'div'> {
  children?: ReactNode
}

const Header = ({ children, className, ...props }: WizardHeaderProps) => {
  const { currentStep } = useWizard()

  return (
    <div className={cx('flex flex-col gap-1', className)} {...props}>
      {children ?? (
        <>
          {currentStep?.title && <h2 className="text-lg font-semibold text-fg-primary">{currentStep.title}</h2>}
          {currentStep?.description && <p className="text-sm text-fg-tertiary">{currentStep.description}</p>}
        </>
      )}
    </div>
  )
}

// =============================================================================
// Content
// =============================================================================

export interface WizardContentProps extends ComponentPropsWithRef<'div'> {
  children?: ReactNode
}

const Content = ({ children, className, ...props }: WizardContentProps) => {
  return (
    <div className={cx('flex-1', className)} {...props}>
      {children}
    </div>
  )
}

// =============================================================================
// Footer
// =============================================================================

export interface WizardFooterProps extends ComponentPropsWithRef<'div'> {
  children?: ReactNode
}

const Footer = ({ children, className, ...props }: WizardFooterProps) => {
  return (
    <div className={cx('flex items-center justify-end gap-3', className)} {...props}>
      {children}
    </div>
  )
}

// =============================================================================
// Navigation Buttons (convenience components)
// =============================================================================

export interface WizardBackButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
  children?: ReactNode
}

const BackButton = ({ children, className, disabled, ...props }: WizardBackButtonProps) => {
  const { canGoBack, goBack } = useWizard()

  return (
    <button
      type="button"
      onClick={goBack}
      disabled={disabled ?? !canGoBack}
      className={cx(
        'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
        'text-fg-secondary hover:text-fg-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children ?? 'Back'}
    </button>
  )
}

export interface WizardNextButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
  children?: ReactNode
  /** Custom click handler. If provided, default goNext is not called */
  onClick?: () => void
}

const NextButton = ({ children, className, disabled, onClick, ...props }: WizardNextButtonProps) => {
  const { canGoNext, goNext, isLastStep } = useWizard()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      goNext()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled ?? (!canGoNext && !onClick)}
      className={cx(
        'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
        'bg-brand-500 text-white hover:bg-brand-600',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children ?? (isLastStep ? 'Finish' : 'Continue')}
    </button>
  )
}

// =============================================================================
// Compound Component
// =============================================================================

export interface WizardComponent {
  (props: WizardRootProps): ReactElement
  Progress: (props: WizardProgressProps) => ReactElement | null
  Step: (props: WizardStepProps) => ReactElement | null
  Header: (props: WizardHeaderProps) => ReactElement
  Content: (props: WizardContentProps) => ReactElement
  Footer: (props: WizardFooterProps) => ReactElement
  BackButton: (props: WizardBackButtonProps) => ReactElement
  NextButton: (props: WizardNextButtonProps) => ReactElement
}

const Wizard = Root as WizardComponent

Wizard.Progress = Progress
Wizard.Step = Step
Wizard.Header = Header
Wizard.Content = Content
Wizard.Footer = Footer
Wizard.BackButton = BackButton
Wizard.NextButton = NextButton

export { Wizard, WizardContext }
