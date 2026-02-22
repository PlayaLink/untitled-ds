"use client";

/**
 * Notifications component
 * @docs https://www.untitledui.com/components/notification
 */

import type { FC } from "react";
import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { CloseButton } from "@/components/close-button/close-button";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import { FeaturedIcon } from "@/components/featured-icon/featured-icon";
import { createIcon } from "@/components/icon";
import { cx, sortCx } from "@/utils/cx";

// =============================================================================
// Icon Map
// =============================================================================

const InfoCircleIcon = createIcon('info-circle');
const AlertCircleIcon = createIcon('alert-circle');
const CheckCircleIcon = createIcon('check-circle');

const iconMap = {
    default: InfoCircleIcon,
    brand: InfoCircleIcon,
    gray: InfoCircleIcon,
    error: AlertCircleIcon,
    warning: AlertCircleIcon,
    success: CheckCircleIcon,
};

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
    container: "relative z-[var(--z-index)] flex max-w-full flex-col gap-4 rounded-xl bg-primary-alt p-4 shadow-lg ring ring-border-secondary-alt xs:w-[var(--width)] xs:flex-row",
    content: "flex flex-1 flex-col gap-3 md:pr-8",
    contentWithIcon: "md:pt-0.5",
    contentWithProgress: "gap-4",
    textContainer: "flex flex-col gap-1",
    title: "text-sm font-semibold text-fg-primary",
    description: "text-sm text-fg-secondary",
    actions: "flex gap-3",
    closeButton: "absolute top-2 right-2 flex items-center justify-center",
    // Avatar notification specific
    avatarContainer: "relative z-[var(--z-index)] flex max-w-full flex-col items-start gap-4 rounded-xl bg-primary-alt p-4 shadow-lg ring ring-border-secondary-alt xs:w-[var(--width)] xs:flex-row",
    avatarContent: "flex flex-col gap-3 pr-8",
    avatarHeader: "flex items-center gap-2",
    avatarDate: "text-sm text-fg-quaternary",
    // Image notification specific
    imageContainer: "relative z-[var(--z-index)] flex max-w-full flex-col gap-3 rounded-xl bg-primary-alt p-4 shadow-lg max-md:ring-1 max-md:ring-border-secondary-alt xs:w-[var(--width)] xs:flex-row xs:gap-0 md:p-0",
    imageLeft: "-my-px hidden w-40 shrink-0 overflow-hidden rounded-l-xl outline-1 -outline-offset-1 outline-black/10 md:block",
    imageRight: "flex flex-col gap-4 rounded-r-xl bg-primary-alt md:gap-3 md:p-4 md:pl-5 md:ring-1 md:ring-border-secondary-alt",
    imageMobile: "h-40 w-full overflow-hidden rounded-md bg-secondary md:hidden",
});

// =============================================================================
// Types
// =============================================================================

export type NotificationColor = "default" | "brand" | "gray" | "error" | "warning" | "success";

export interface IconNotificationProps {
    title: string;
    description: string;
    confirmLabel?: string;
    dismissLabel?: string;
    hideDismissLabel?: boolean;
    icon?: FC<{ className?: string }>;
    color?: NotificationColor;
    progress?: number;
    onClose?: () => void;
    onConfirm?: () => void;
}

export interface AvatarNotificationProps {
    name: string;
    content: string;
    avatar: string;
    date: string;
    confirmLabel: string;
    dismissLabel?: string;
    hideDismissLabel?: boolean;
    icon?: FC<{ className?: string }>;
    color?: NotificationColor;
    onClose?: () => void;
    onConfirm?: () => void;
}

export interface ImageNotificationProps {
    title: string;
    description: string;
    confirmLabel: string;
    dismissLabel?: string;
    hideDismissLabel?: boolean;
    imageMobile: string;
    imageDesktop: string;
    onClose?: () => void;
    onConfirm?: () => void;
}

// =============================================================================
// Components
// =============================================================================

export function IconNotification({
    title,
    description,
    confirmLabel,
    dismissLabel = "Dismiss",
    hideDismissLabel,
    icon,
    progress,
    onClose,
    onConfirm,
    color = "default",
}: IconNotificationProps) {
    const showProgress = typeof progress === "number";

    return (
        <div className={styles.container} data-untitled-ds='IconNotification'>
            <FeaturedIcon
                icon={icon || iconMap[color]}
                color={color === "default" ? "gray" : color}
                theme={color === "default" ? "modern" : "outline"}
                size="md"
            />
            <div
                className={cx(styles.content, color !== "default" && styles.contentWithIcon, showProgress && styles.contentWithProgress)}>
                <div className={styles.textContainer}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                </div>

                {showProgress && <ProgressBar labelPosition="bottom" value={progress} />}

                <div className={styles.actions}>
                    {!hideDismissLabel && (
                        <Button onClick={onClose} size="sm" color="link-gray">
                            {dismissLabel}
                        </Button>
                    )}
                    {confirmLabel && (
                        <Button onClick={onConfirm} size="sm" color="link-color">
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            </div>
            <div className={styles.closeButton}>
                <CloseButton onClick={onClose} size="sm" aria-label="Dismiss" />
            </div>
        </div>
    );
}

IconNotification.displayName = "IconNotification";

export function AvatarNotification({
    name,
    content,
    avatar,
    confirmLabel,
    dismissLabel = "Dismiss",
    hideDismissLabel,
    date,
    onClose,
    onConfirm,
}: AvatarNotificationProps) {
    return (
        <div className={styles.avatarContainer} data-untitled-ds='AvatarNotification'>
            <Avatar size="md" src={avatar} alt={name} status="online" />
            <div className={styles.avatarContent}>
                <div className={styles.textContainer}>
                    <div className={styles.avatarHeader}>
                        <p className={styles.title}>{name}</p>
                        <span className={styles.avatarDate}>{date}</span>
                    </div>
                    <p className={styles.description}>{content}</p>
                </div>

                <div className={styles.actions}>
                    {!hideDismissLabel && (
                        <Button onClick={onClose} size="sm" color="link-gray">
                            {dismissLabel}
                        </Button>
                    )}
                    {confirmLabel && (
                        <Button onClick={onConfirm} size="sm" color="link-color">
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            </div>
            <div className={styles.closeButton}>
                <CloseButton onClick={onClose} size="sm" aria-label="Dismiss" />
            </div>
        </div>
    );
}

AvatarNotification.displayName = "AvatarNotification";

export function ImageNotification({
    title,
    description,
    confirmLabel,
    dismissLabel = "Dismiss",
    hideDismissLabel,
    imageMobile,
    imageDesktop,
    onClose,
    onConfirm,
}: ImageNotificationProps) {
    return (
        <div
            style={{ "--width": "496px" } as React.CSSProperties}
            className={styles.imageContainer}
            data-untitled-ds='ImageNotification'>
            <div className={styles.imageLeft}>
                <img
                    aria-hidden="true"
                    src={imageMobile}
                    alt="Image Mobile"
                    className="size-full object-cover" />
            </div>
            <div className={styles.imageRight}>
                <div className={cx(styles.textContainer, "pr-8")}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                </div>

                <div className={styles.imageMobile}>
                    <img src={imageDesktop} alt="Image Desktop" className="size-full object-cover" />
                </div>

                <div className={styles.actions}>
                    {!hideDismissLabel && (
                        <Button onClick={onClose} size="sm" color="link-gray">
                            {dismissLabel}
                        </Button>
                    )}
                    {confirmLabel && (
                        <Button onClick={onConfirm} size="sm" color="link-color">
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            </div>
            <div className={styles.closeButton}>
                <CloseButton onClick={onClose} size="sm" aria-label="Dismiss" />
            </div>
        </div>
    );
}

ImageNotification.displayName = "ImageNotification";
