import { createWindowEvent } from './helpers'

export class HierarchicalRouter {
  private currentPathArray: string[] = []
  private currentLoadedPaths: string[] = []
  private currLevel = -1

  constructor () {
    console.log('HierarchicalRouter Router Initialized')
    window.addEventListener('popstate', this.handleUrlChange.bind(this) as EventListener)
    void this.handleUrlChange() // Handle initial URL
  }

  private async handleUrlChange (): Promise<void> {
    const pathSegments = this.getPathsFromCurrentUrl()
    // await this.resetState(pathSegments)
    const newLevelFromCurrUrl = pathSegments.length

    console.log('Handling URL Change')

    if (newLevelFromCurrUrl === 1) {
      console.log('from handleURL :\n\tDefault route only in URL')
      await this.renderDefaultHomePage()
      return
    }
    console.log('==============================================')
    console.log('Current Active Path:', this.currentPathArray)
    console.log('New Path Segments:', pathSegments)
    console.log("Sending render events for each level's path")
    console.log('==============================================')

    await this.sendRenderEventsForEachUrl(pathSegments)
  }

  private getPathsFromCurrentUrl (): string[] {
    return ['', ...window.location.pathname.split('/').filter(Boolean)]
  }

  private async sendRenderEventsForEachUrl (newPaths: string[]): Promise<void> {
    const newLevel = newPaths.length - 1
    console.log('Current level is ', this.currLevel, '\nNew Level is ', newLevel)
    if (this.currLevel === -1) {
      console.log('from sendRenderEvents :\n\tRoot Path Render due to Skip Path')
      await this.renderDefaultHomePage()
    }
    console.log('Processed and loaded Default Page Successfully')
    this.printRouterState()

    for (let i = 1; i <= newLevel; i++) {
      console.log(`\nLVL${i}-start======================`)
      // Level Exists and Path Changed
      if (this.currentPathArray[i] !== undefined && newPaths[i] !== this.currentPathArray[i]) {
        console.log('*****Level existed but path changed')
        console.log('Path changed at level ', i, ' from ', this.currentPathArray[i], ' to ', newPaths[i])
        console.log('Sending Render Event')
        const event = createWindowEvent('render', i, newPaths[i])
        console.log('Sending RENDER event from Router', event)
        window.dispatchEvent(event)
        this.currentLoadedPaths[i] = newPaths[i]

        // Level Exists and Path is same
      } else if (newPaths[i] === this.currentPathArray[i]) {
        console.log('*****Level Existed but Path Same')
        console.log('=======')
        console.log('Prev level in Routing', this.currLevel)
        console.log('Current level in Routing', newLevel)
        console.log('=======')
        if (this.currLevel > newLevel) { // need to reset state since we are going back
          void this.sendResetEvent(i, newPaths[i])
        }

        console.log('Newpath[i] === currentPathArray[i]', newPaths[i], this.currentPathArray[i])
        console.log('Level already loaded, skipping ', i)
      } else {
        console.log('*****New level detected, sending render event with await for ready')
        // await this.createLevelWaitListenerThenAwaitAndRemoveIt(i, newPaths[i], newPaths[i - 1])
        console.log('Checking if prev ready\nloadedprev-', this.currentLoadedPaths[i - 1], '\nnewprev', newPaths[i - 1])
        if (this.currentPathArray[i - 1] !== newPaths[i - 1]) {
          console.log('Active path mismatch ', this.currentPathArray[i - 1], ' and ', newPaths[i - 1], ' sending reset event')
          await this.waitForReadyEvent(i - 1, newPaths[i - 1])
        }
        console.log('current loaded', this.currentLoadedPaths)

        const event = createWindowEvent('render', i, newPaths[i])
        console.log('Received ready event , sending render', event)
        window.dispatchEvent(event)
        this.currentLoadedPaths[i] = newPaths[i]
      }
      console.log('=======\nNew State of Router:\n')
      console.log('Current Active Path:', this.currentPathArray)
      console.log('Current Loaded Paths:', this.currentLoadedPaths)
      console.log('New Path Segments:', newPaths)
      console.log('=======\n')
      console.log(`\nLVL${i}-end======================`)
    }
    console.log('Sent all render events')
    this.currLevel = newLevel
    this.currentPathArray = [...newPaths]
    await Promise.resolve(undefined)
  }

  private comparePathDifferences (currPaths: string[], newPaths: string[]): void {
    const lenNew = newPaths.length
    for (let i = 0; i < lenNew; i++) {
      if (currPaths[i] !== newPaths[i]) {
        console.log('Path changed at level ', i, ' from ', currPaths[i], ' to ', newPaths[i])
        // const event = createWindowEvent('reset', i, newPaths[i])
        // console.log('Sending RESET event from Router', event)
        // window.dispatchEvent(event)
      }
    }
  }

  /*
  Window Component Events

  */

  private async sendResetEvent (level: number, path: string): Promise<void> {
    const event = createWindowEvent('reset', level, path)
    console.log('Sending RESET event from Router', event)
    window.dispatchEvent(event)
  }

  private async sendRemove (level: number, path: string): Promise<void> {
    const event = createWindowEvent('remove', level, path)
    console.log('Sending REMOVE event from Router', event)
    window.dispatchEvent(event)
  }

  private async createLevelWaitListenerThenAwaitAndRemoveIt (level: number, componentName: string, prevPath: string): Promise<void> {
    console.log('********************')
    console.log(`crreateLevelWaitListenerThenAwaitAndRemoveIt(${level}, ${componentName}, ${prevPath})`)
    console.log('Current Loaded Events ', this.currentLoadedPaths)
    console.log('Prev Path ', prevPath)
    console.log("Component's level is ", level, ' and name is ', componentName)
    console.log('********************')

    if (level === 1 && this.currentLoadedPaths[0] === '') {
      console.log('Level 0 already loaded, skipping')
      return
    }
    if (this.currentLoadedPaths[level - 1] === prevPath) {
      console.log('Component already loaded, skipping')
      return
    }
    await new Promise((resolve) => {
      const listener = (e: CustomEvent): void => {
        console.log(`Received ready event for level ${level - 1} to render path ${componentName}`)
        window.removeEventListener(`level-${level - 1}-ready`, listener as EventListener)
        resolve(undefined)
      }
      console.log(`Awaiting for level ${level - 1}'s ready event`)
      window.addEventListener(`level-${level - 1}-ready`, listener as EventListener)
    })
    this.currentLoadedPaths[level - 1] = componentName
    console.log("Level's ready event received, Proceeding")
  }

  private async renderDefaultHomePage (): Promise<void> {
    console.log('Rendering default home page')
    const event = createWindowEvent('render', 0, '')
    console.log('Sending Root Default Page ReRender Event', event)
    window.dispatchEvent(event)
    await this.waitForReadyEvent(0, '')
    this.currentPathArray = ['']
    this.currentLoadedPaths = ['']
    this.currLevel = 0
  }

  private async waitForReadyEvent (level: number, componentName: string): Promise<void> {
    await new Promise((resolve) => {
      const listener = (e: CustomEvent): void => {
        console.log(`Received ready event for level ${level} to render path ${componentName}`)
        window.removeEventListener(`level-${level}-ready`, listener as EventListener)
        resolve(undefined)
      }
      console.log(`Awaiting for level ${level}'s ready event`)
      window.addEventListener(`level-${level}-ready`, listener as EventListener)
    })
    console.log("Level's ready event received, Proceeding")
  }

  public printRouterState (): void {
    console.log('Current Active Path:', this.currentPathArray)
    console.log('Current Loaded Paths:', this.currentLoadedPaths)
    console.log('Current Level:', this.currLevel)
  }
}

/*
path /        -> level 0
path /go      -> level 1
path /go/test -> level 2

Root -> Page -> Post
/page/post , url changes to /page : reset event for 2nd last level which is page

.com/page/post
  0   1     2

*/
