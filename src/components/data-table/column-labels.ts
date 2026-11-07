/** Optional translations for column layout controls. English is the default. */
export interface DataTableColumnLabels {
  manageColumns?: string
  visibilityAndOrder?: string
  dragColumn?: string
  reorderColumn?: (label: string) => string
  resizeColumn?: (label: string) => string
  columnMenu?: (label: string) => string
  hideColumn?: string
}
