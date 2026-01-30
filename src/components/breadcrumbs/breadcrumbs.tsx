"use client";

/**
 * Breadcrumbs component
 * @docs https://www.untitledui.com/components/breadcrumb
 * @figma https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-93096
 */

import type { HTMLAttributes, ReactNode } from "react";
import React, { createContext, useContext, useState, isValidElement } from "react";
import {
    Breadcrumbs as AriaBreadcrumbs,
    Breadcrumb as AriaBreadcrumb,
    type BreadcrumbProps as AriaBreadcrumbProps,
    Link as AriaLink,
} from "react-aria-components";
import { Icon } from "@/components/icon";
import { cx, sortCx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

// =============================================================================
// Types
// =============================================================================

export type BreadcrumbType = "text" | "text-line" | "button";
export type BreadcrumbDivider = "chevron" | "slash";

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
    breadcrumbs: {
        base: "relative flex",
        text: "gap-1.5 md:gap-2",
        "text-line": "pl-2 gap-1.5 md:gap-2 py-2 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-t after:border-secondary",
        button: "gap-0.5 md:gap-1",
    },
    item: {
        base: "flex items-center current:overflow-hidden",
        text: "gap-1.5 md:gap-2",
        button: "gap-0.5 md:gap-1",
    },
    base: {
        root: "group inline-flex cursor-pointer items-center justify-center gap-1 rounded-md outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 in-current:max-w-full",
        icon: "size-5 transition-inherit-all",
        label: "text-sm font-semibold whitespace-nowrap transition-inherit-all in-current:truncate",
    },
    type: {
        text: {
            root: "",
            icon: "text-fg-quaternary group-hover:text-fg-quaternary-hover",
            label: "text-quaternary group-hover:text-tertiary-hover",
        },
        button: {
            root: "p-1 hover:bg-primary-hover",
            icon: "text-fg-quaternary group-hover:text-fg-quaternary-hover",
            label: "px-1 text-quaternary group-hover:text-tertiary-hover",
        },
    },
    current: {
        text: {
            root: "",
            icon: "text-fg-brand-primary group-hover:text-fg-brand-primary",
            label: "text-brand-secondary group-hover:text-brand-secondary",
        },
        button: {
            root: "bg-primary-hover",
            icon: "text-fg-quaternary-hover",
            label: "text-fg-tertiary-hover",
        },
    },
});

// =============================================================================
// Context
// =============================================================================

interface BreadcrumbsContextValue {
    divider: BreadcrumbDivider;
    type: BreadcrumbType;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextValue>({
    divider: "chevron",
    type: "text",
});

// =============================================================================
// Slash Divider SVG
// =============================================================================

const SlashDivider = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M12.5 3.333 7.5 16.667"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// =============================================================================
// BreadcrumbBase (internal)
// =============================================================================

interface BreadcrumbBaseProps extends HTMLAttributes<Element> {
    href?: string;
    icon?: React.FC<{ className?: string }> | ReactNode;
    type?: "text" | "button";
    current?: boolean;
    children?: ReactNode;
}

const BreadcrumbBase = ({
    href,
    children,
    icon: IconProp,
    type = "text",
    current,
    className,
    ...otherProps
}: BreadcrumbBaseProps) => {
    const Wrapper = href ? AriaLink : "button";
    const typeStyles = styles.type[type];
    const currentStyles = current ? styles.current[type] : null;

    return (
        <Wrapper
            {...otherProps}
            href={href}
            className={cx(
                styles.base.root,
                typeStyles.root,
                currentStyles?.root,
                !href && !otherProps.onClick && "cursor-default",
                className
            )}
        >
            {isReactComponent(IconProp) && (
                <IconProp
                    className={cx(
                        styles.base.icon,
                        typeStyles.icon,
                        currentStyles?.icon
                    )}
                />
            )}
            {isValidElement(IconProp) && IconProp}

            {children && (
                <span
                    className={cx(
                        styles.base.label,
                        typeStyles.label,
                        currentStyles?.label
                    )}
                >
                    {children}
                </span>
            )}
        </Wrapper>
    );
};

// =============================================================================
// BreadcrumbItem
// =============================================================================

export interface BreadcrumbItemProps extends AriaBreadcrumbProps {
    /** URL for the breadcrumb link */
    href?: string;
    /** Divider style between items */
    divider?: BreadcrumbDivider;
    /** Visual style type */
    type?: BreadcrumbType;
    /** Whether this is a collapsed ellipsis item */
    isEllipsis?: boolean;
    /** Label content */
    children?: ReactNode;
    /** Icon component or element to display before the label */
    icon?: React.FC<{ className?: string }> | ReactNode;
    /** Click handler (for ellipsis expansion) */
    onClick?: () => void;
}

export const BreadcrumbItem = ({
    href,
    icon,
    divider: dividerProp,
    type: typeProp,
    isEllipsis,
    children,
    onClick,
    ...otherProps
}: BreadcrumbItemProps) => {
    const context = useContext(BreadcrumbsContext);

    const type = typeProp ?? context.type ?? "text";
    const divider = dividerProp ?? context.divider ?? "chevron";

    return (
        <AriaBreadcrumb
            {...otherProps}
            className={cx(
                styles.item.base,
                type === "text" || type === "text-line" ? styles.item.text : styles.item.button
            )}
        >
            {({ isCurrent }) => (
                <>
                    {isEllipsis ? (
                        <BreadcrumbBase
                            aria-label="See all breadcrumb items"
                            type={type === "text-line" ? "text" : type}
                            onClick={onClick}
                        >
                            ...
                        </BreadcrumbBase>
                    ) : (
                        <BreadcrumbBase
                            href={href}
                            icon={icon}
                            current={isCurrent}
                            type={type === "text-line" ? "text" : type}
                            onClick={onClick}
                        >
                            {children}
                        </BreadcrumbBase>
                    )}

                    {/* Divider */}
                    {!isCurrent && (
                        <div className="shrink-0 text-fg-quaternary">
                            {divider === "slash" ? (
                                <SlashDivider className="size-5" />
                            ) : (
                                <Icon name="chevron-right" size="md" />
                            )}
                        </div>
                    )}
                </>
            )}
        </AriaBreadcrumb>
    );
};

// =============================================================================
// Breadcrumbs
// =============================================================================

export interface BreadcrumbsProps {
    /** Divider style between items */
    divider?: BreadcrumbDivider;
    /** Breadcrumb items */
    children: ReactNode;
    /** Visual style type */
    type?: BreadcrumbType;
    /** Additional CSS classes */
    className?: string;
    /**
     * Maximum number of visible items. If exceeded, items collapse
     * into an ellipsis that can be expanded.
     */
    maxVisibleItems?: number;
}

export const Breadcrumbs = ({
    children,
    divider = "chevron",
    type = "text",
    className,
    maxVisibleItems = 4,
}: BreadcrumbsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const visibleItems = (() => {
        const childrenArray = React.Children.toArray(children);

        if (!maxVisibleItems || childrenArray.length <= maxVisibleItems || isExpanded) {
            return childrenArray;
        }

        const firstItems = childrenArray.slice(0, Math.ceil(maxVisibleItems / 2));
        const lastItems = childrenArray.slice(-Math.floor((maxVisibleItems - 1) / 2));
        const ellipsisItem = (
            <BreadcrumbItem
                isEllipsis
                divider={divider}
                type={type}
                onClick={() => setIsExpanded(true)}
                key="ellipsis"
            />
        );

        return [...firstItems, ellipsisItem, ...lastItems];
    })();

    return (
        <nav aria-label="Breadcrumbs" className={cx("min-w-0", className)}>
            <BreadcrumbsContext.Provider value={{ divider, type }}>
                <AriaBreadcrumbs className={cx(styles.breadcrumbs.base, styles.breadcrumbs[type])}>
                    {visibleItems}
                </AriaBreadcrumbs>
            </BreadcrumbsContext.Provider>
        </nav>
    );
};

// Compound component pattern
Breadcrumbs.Item = BreadcrumbItem;
