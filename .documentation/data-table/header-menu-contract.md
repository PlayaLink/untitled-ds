# DataTable Column Header Menu Contract

**Decision:** Adopt and refine the existing `createColumn` column metadata API:
`sortable`, `filterable`, `filterMode`, `filterOptions`, `canHide`, and `label`.

This keeps DataTable behavior declarative and design-system owned. Consuming apps should describe column capabilities through `createColumn` metadata instead of embedding custom JSX controls in column headers.

## Column Capabilities

| Column configuration | Header behavior |
| --- | --- |
| Plain column with no sort, filter, or hide action | Renders the header label without menu chrome. |
| Sortable-only column | Shows one header-menu trigger with sort ascending, sort descending, and clear sort when sorted. |
| Filterable-only column | Shows one header-menu trigger with filter options from `filterOptions`. |
| Sortable + filterable column | Shows one header-menu trigger with sort actions and filter options separated in the same popover. |
| Hideable column | Shows `Hide column` in the same header menu only when table-level column visibility is enabled. |

## Filtering

`filterable: true` opts a column into menu-based filtering. `filterOptions` supplies the available options. `filterMode` controls the interaction model:

| `filterMode` | Behavior |
| --- | --- |
| `select` | Single selected value. Choosing an already-selected option clears the filter. |
| `multiSelect` | Multiple selected values. Toggling the last selected option clears the filter. |

If `filterMode` is omitted, the column uses `select`.

## Hide Behavior

The per-column `Hide column` action appears only when both of these are true:

- The table has `enableColumnVisibility` enabled.
- The current column returns `column.getCanHide()`.

Primary columns (`isPrimary: true`), selection columns, drag columns, and columns with `canHide: false` are locked. Locked columns do not expose the per-column hide action and are omitted from the global column manager.

Hidden columns are restored from the global sliders column manager because hidden columns no longer have a header menu trigger.

## Display Names

All DataTable column surfaces use the same display-name fallback:

```ts
label ?? stringHeader ?? id
```

This applies to menu trigger labels, popover titles, and the global column manager.

## State Model

The header menu preserves TanStack Table as the state source:

- Sorting uses TanStack sorting state and `column.toggleSorting` / `column.clearSorting`.
- Filtering uses TanStack column filter state and `column.setFilterValue`.
- Visibility uses TanStack column visibility state and `column.toggleVisibility`.

The design system does not introduce parallel sort, filter, or visibility state.

## Accessibility

The menu trigger is a React Aria dialog trigger with an accessible label that includes active sort and filter state. Active filters show a count badge, active sorts show the sort direction icon, and the trigger exposes `data-state="active"` for visual styling. Popover keyboard and focus behavior should remain delegated to React Aria primitives.
