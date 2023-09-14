export class RouterHandler {
  level: number
  router = (window as any).router
  onChangeCallback: (segment: string) => void
  onReadyCallback: () => void

  constructor (level: number, onChangeCallback: (segment: string) => void, onReadyCallback: () => void) {
    this.level = level
    this.onChangeCallback = onChangeCallback
    this.onReadyCallback = onReadyCallback
    this.router.onLevelChange(this.level, this.onRouteChange.bind(this))
    window.addEventListener(`level-${this.level}-ready`, this.onReady.bind(this))
  }

  onRouteChange (segment: string): void {
    console.log(`Level ${this.level} segment changed to: ${segment}`)
    this.onChangeCallback(segment)
    // After processing the segment, signal readiness:
    this.setReady()
  }

  onReady (): void {
    this.onReadyCallback()
  }

  setReady (): void {
    this.router.setLevelReady(this.level)
  }
}
