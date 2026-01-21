import { addons } from '@storybook/manager-api'
import { STORY_CHANGED, CURRENT_STORY_WAS_SET } from '@storybook/core-events'

addons.setConfig({
  showPanel: false, // Default to hidden
})

/**
 * Panel Controller Addon
 * Dynamically shows/hides the addons panel based on story tags:
 * - Stories with 'show-panel' tag: Panel is SHOWN
 * - All other stories: Panel is HIDDEN
 */
addons.register('panel-controller', (api) => {
  const channel = addons.getChannel()

  const updatePanelVisibility = (storyId) => {
    if (!storyId) return

    const storyData = api.getData(storyId)
    const tags = storyData?.tags ?? []
    const storyName = storyData?.name ?? ''

    // Show panel if story has 'show-panel' tag OR if story name is 'Props'
    const shouldShow = tags.includes('show-panel') || storyName === 'Props'

    api.setOptions({ showPanel: shouldShow })
    api.togglePanel(shouldShow)
  }

  // Listen for story changes
  channel.on(STORY_CHANGED, updatePanelVisibility)
  channel.on(CURRENT_STORY_WAS_SET, (data) => updatePanelVisibility(data?.storyId))

  // Handle initial load
  const currentStoryId = api.getUrlState()?.storyId
  if (currentStoryId) {
    setTimeout(() => updatePanelVisibility(currentStoryId), 500)
  }
})
