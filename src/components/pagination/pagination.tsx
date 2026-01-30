"use client";

/**
 * Pagination component
 * @docs https://www.untitledui.com/components/pagination
 * @figma https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-69560
 */

import { Icon } from "@/components/icon";
import { cx, sortCx } from "@/utils/cx";

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
    root: "relative flex items-center justify-between border-t border-secondary px-4 py-3 md:justify-center md:gap-3 md:px-6 md:py-4",
    button: {
        base: "inline-flex items-center justify-center rounded-lg border border-primary bg-primary shadow-xs transition-colors duration-100 ease-linear hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50",
        nav: "gap-1 px-3 py-2",
    },
    buttonText: "hidden text-sm font-semibold text-secondary md:inline",
    buttonIcon: "text-fg-quaternary",
    mobileText: "text-sm font-medium text-secondary md:hidden",
    pageNumbers: "hidden items-center gap-0.5 md:flex",
    pageButton: {
        base: "size-10 rounded-lg text-sm font-medium transition-colors duration-100 ease-linear hover:bg-primary-hover",
        current: "bg-primary-hover text-secondary",
        default: "text-quaternary",
    },
    ellipsis: "size-10 rounded-lg text-sm font-medium text-quaternary flex items-center justify-center",
    totalCount: "absolute right-6 hidden text-sm text-tertiary md:inline",
});

// =============================================================================
// Types
// =============================================================================

export interface PaginationProps {
    /** Current page number (1-indexed) */
    currentPage: number;
    /** Total number of pages */
    totalPages: number;
    /** Callback when page changes */
    onPageChange: (page: number) => void;
    /** Total number of items (optional, displays count on right) */
    total?: number;
    /** Label for items (e.g., "SKUs", "products"). Defaults to "items" */
    label?: string;
    /** Additional class name */
    className?: string;
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Generate page numbers to display with ellipsis
 * Shows: 1, 2, 3, ..., 8, 9, 10 pattern
 */
function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    // Always show first 3 pages
    if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages);
    }
    // Always show last 3 pages
    else if (currentPage >= totalPages - 3) {
        pages.push(1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    }
    // Show pages around current
    else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
    }

    return pages;
}

// =============================================================================
// Component
// =============================================================================

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    total,
    label = "items",
    className,
}: PaginationProps) {
    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    const handlePrevious = () => {
        if (canGoPrevious) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (canGoNext) {
            onPageChange(currentPage + 1);
        }
    };

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <div className={cx(styles.root, className)}>
            {/* Previous Button */}
            <button
                type="button"
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className={cx(styles.button.base, styles.button.nav)}
                aria-label="Go to previous page"
            >
                <Icon name="arrow-left" size="lg" className={styles.buttonIcon} />
                <span className={styles.buttonText}>Previous</span>
            </button>

            {/* Mobile: Page X of Y */}
            <span className={styles.mobileText}>
                Page {currentPage} of {totalPages}
            </span>

            {/* Desktop: Page Numbers */}
            <div className={styles.pageNumbers}>
                {pageNumbers.map((page, index) =>
                    page === "ellipsis" ? (
                        <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={cx(
                                styles.pageButton.base,
                                page === currentPage ? styles.pageButton.current : styles.pageButton.default
                            )}
                            aria-label={`Go to page ${page}`}
                            aria-current={page === currentPage ? "page" : undefined}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next Button */}
            <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext}
                className={cx(styles.button.base, styles.button.nav)}
                aria-label="Go to next page"
            >
                <span className={styles.buttonText}>Next</span>
                <Icon name="arrow-right" size="lg" className={styles.buttonIcon} />
            </button>

            {/* Total count (desktop only) */}
            {total !== undefined && (
                <span className={styles.totalCount}>
                    {total.toLocaleString()} {label}
                </span>
            )}
        </div>
    );
}

Pagination.displayName = "Pagination";
