export function addLevel0RenderListener (level: number): void {
  window.addEventListener(`level-${level.toString()}-render`, () => {
    console.log('Level 0 component signaled ready')
  })
}

export function updateUrlAndTriggerRouteChange (pathAfterRoot: string): void {
  window.history.pushState({}, '', pathAfterRoot)
  window.dispatchEvent(new Event('popstate'))
}

export function createWindowEvent (eventType: string, level: number, path: string): CustomEvent {
  const event = new CustomEvent(`level-${level.toString()}-${eventType}`, {
    detail: {
      path
    }
  })
  return event
}
