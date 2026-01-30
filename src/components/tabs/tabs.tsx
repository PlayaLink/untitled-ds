"use client";

/**
 * Tabs component
 * @docs https://www.untitledui.com/components/tabs
 */

import type { ComponentPropsWithRef, ReactNode } from "react";
import { Fragment, createContext, useContext } from "react";
import type { TabListProps as AriaTabListProps, TabProps as AriaTabProps, TabRenderProps as AriaTabRenderProps } from "react-aria-components";
import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs, TabsContext, useSlottedContext } from "react-aria-components";
import type { BadgeColor } from "../badge";
import { Badge } from "../badge";
import { cx, sortCx } from "@/utils/cx";

type Orientation = "horizontal" | "vertical";

// Types for different orientations
type HorizontalTypes = "button-brand" | "button-gray" | "button-border" | "button-minimal" | "underline";
type VerticalTypes = "button-brand" | "button-gray" | "button-border" | "button-minimal" | "line";
type TabTypeColors<T> = T extends "horizontal" ? HorizontalTypes : VerticalTypes;

export type TabType = HorizontalTypes | VerticalTypes;
export type TabSize = "sm" | "md";

export const styles = sortCx({
    tab: {
        base: "z-10 flex h-max cursor-pointer items-center justify-center gap-2 rounded-md whitespace-nowrap text-quaternary transition duration-100 ease-linear group-orientation-vertical:justify-start",
        fullWidth: "w-full flex-1",
    },
    tabList: {
        base: "group flex",
        vertical: "w-max flex-col",
        underlineBorder: "relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border-secondary",
    },
});

// Styles for different types of tab
const getTabStyles = ({ isFocusVisible, isSelected, isHovered }: AriaTabRenderProps) => ({
    "button-brand": cx(
        "outline-focus-ring",
        isFocusVisible && "outline-2 -outline-offset-2",
        (isSelected || isHovered) && "bg-brand-primary-alt text-brand-secondary",
    ),
    "button-gray": cx(
        "outline-focus-ring",
        isHovered && "bg-primary_hover text-secondary",
        isFocusVisible && "outline-2 -outline-offset-2",
        isSelected && "bg-active text-secondary",
    ),
    "button-border": cx(
        "outline-focus-ring",
        (isSelected || isHovered) && "bg-primary-alt text-secondary shadow-sm",
        isFocusVisible && "outline-2 -outline-offset-2",
    ),
    "button-minimal": cx(
        "rounded-lg outline-focus-ring",
        isHovered && "text-secondary",
        isFocusVisible && "outline-2 -outline-offset-2",
        isSelected && "bg-primary-alt text-secondary shadow-xs ring-1 ring-border-primary ring-inset",
    ),
    underline: cx(
        "rounded-none border-b-2 border-transparent outline-focus-ring",
        (isSelected || isHovered) && "border-fg-brand-primary-alt text-brand-secondary",
        isFocusVisible && "outline-2 -outline-offset-2",
    ),
    line: cx(
        "rounded-none border-l-2 border-transparent outline-focus-ring",
        (isSelected || isHovered) && "border-fg-brand-primary-alt text-brand-secondary",
        isFocusVisible && "outline-2 -outline-offset-2",
    ),
});

const sizes = {
    sm: {
        "button-brand": "text-sm font-semibold py-2 px-3",
        "button-gray": "text-sm font-semibold py-2 px-3",
        "button-border": "text-sm font-semibold py-2 px-3",
        "button-minimal": "text-sm font-semibold py-2 px-3",
        underline: "text-sm font-semibold px-1 pb-2.5 pt-0",
        line: "text-sm font-semibold pl-2.5 pr-3 py-0.5",
    },
    md: {
        "button-brand": "text-md font-semibold py-2.5 px-3",
        "button-gray": "text-md font-semibold py-2.5 px-3",
        "button-border": "text-md font-semibold py-2.5 px-3",
        "button-minimal": "text-md font-semibold py-2.5 px-3",
        underline: "text-md font-semibold px-1 pb-2.5 pt-0",
        line: "text-md font-semibold pr-3.5 pl-3 py-1",
    },
};

// Styles for different types of horizontal tabs
const getHorizontalStyles = ({ size, fullWidth }: { size?: TabSize; fullWidth?: boolean }) => ({
    "button-brand": "gap-1",
    "button-gray": "gap-1",
    "button-border": cx("gap-1 rounded-[10px] bg-secondary-alt p-1 ring-1 ring-border-secondary ring-inset", size === "md" && "rounded-xl p-1.5"),
    "button-minimal": "gap-0.5 rounded-lg bg-secondary-alt ring-1 ring-inset ring-border-secondary",
    underline: cx("gap-3", fullWidth && "w-full gap-4"),
    line: "gap-2",
});

const getColorStyles = ({ isSelected, isHovered }: Partial<AriaTabRenderProps>) => ({
    "button-brand": isSelected || isHovered ? "brand" : "gray",
    "button-gray": "gray",
    "button-border": "gray",
    "button-minimal": "gray",
    underline: isSelected || isHovered ? "brand" : "gray",
    line: isSelected || isHovered ? "brand" : "gray",
});

interface TabListComponentProps<T extends object, K extends Orientation> extends AriaTabListProps<T> {
    /** The size of the tab list. */
    size?: TabSize;
    /** The type of the tab list. */
    type?: TabTypeColors<K>;
    /** The orientation of the tab list. */
    orientation?: K;
    /** The items of the tab list. */
    items: T[];
    /** Whether the tab list is full width. */
    fullWidth?: boolean;
}

const TabListContext = createContext<Omit<TabListComponentProps<TabComponentProps, Orientation>, "items">>({
    size: "sm",
    type: "button-brand",
});

export const TabList = <T extends Orientation>({
    size = "sm",
    type = "button-brand",
    orientation: orientationProp,
    fullWidth,
    className,
    children,
    ...otherProps
}: TabListComponentProps<TabComponentProps, T>) => {
    const context = useSlottedContext(TabsContext);

    const orientation = orientationProp ?? context?.orientation ?? "horizontal";

    return (
        <TabListContext.Provider value={{ size, type, orientation, fullWidth }}>
            <AriaTabList
                {...otherProps}
                className={(state) =>
                    cx(
                        styles.tabList.base,

                        getHorizontalStyles({
                            size,
                            fullWidth,
                        })[type as HorizontalTypes],

                        orientation === "vertical" && styles.tabList.vertical,

                        // Only horizontal tabs with underline type have bottom border
                        orientation === "horizontal" &&
                            type === "underline" &&
                            styles.tabList.underlineBorder,

                        typeof className === "function" ? className(state) : className,
                    )
                }
            >
                {children ?? ((item) => <Tab {...item}>{item.children}</Tab>)}
            </AriaTabList>
        </TabListContext.Provider>
    );
};

export interface TabPanelProps extends ComponentPropsWithRef<typeof AriaTabPanel> {}

export const TabPanel = (props: TabPanelProps) => {
    return (
        <AriaTabPanel
            {...props}
            className={(state) =>
                cx(
                    "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};

export interface TabComponentProps extends AriaTabProps {
    /** The label of the tab. */
    label?: ReactNode;
    /** The children of the tab. */
    children?: ReactNode | ((props: AriaTabRenderProps) => ReactNode);
    /** The badge displayed next to the label. */
    badge?: number | string;
}

export const Tab = (props: TabComponentProps) => {
    const { label, children, badge, ...otherProps } = props;
    const { size = "sm", type = "button-brand", fullWidth } = useContext(TabListContext);

    return (
        <AriaTab
            {...otherProps}
            className={(prop) =>
                cx(
                    styles.tab.base,
                    fullWidth && styles.tab.fullWidth,
                    sizes[size][type],
                    getTabStyles(prop)[type],
                    typeof props.className === "function" ? props.className(prop) : props.className,
                )
            }
        >
            {(state) => (
                <Fragment>
                    {typeof children === "function" ? children(state) : children || label}
                    {badge && (
                        <Badge
                            size={size}
                            type="pill-color"
                            color={getColorStyles(state)[type] as BadgeColor}
                            className={cx("hidden transition-inherit-all md:flex", size === "sm" && "-my-px")}
                        >
                            {badge}
                        </Badge>
                    )}
                </Fragment>
            )}
        </AriaTab>
    );
};

export interface TabsProps extends ComponentPropsWithRef<typeof AriaTabs> {}

export const Tabs = ({ className, ...props }: TabsProps) => {
    return (
        <AriaTabs
            keyboardActivation="manual"
            {...props}
            className={(state) => cx("flex w-full flex-col", typeof className === "function" ? className(state) : className)}
        />
    );
};

Tabs.Panel = TabPanel;
Tabs.List = TabList;
Tabs.Item = Tab;
