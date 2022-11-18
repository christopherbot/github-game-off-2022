import { BaseScene } from './base-scene'

export class Title extends BaseScene {
  private enterKey!: Phaser.Input.Keyboard.Key

  constructor() {
    super('title')
  }

  preload(): void {}

  create(): void {
    this.enterKey = this.input.keyboard.addKey('enter')

    this.drawGrid({
      x: 0,
      y: 0,
      width: this.gameWidth,
      height: this.gameHeight,
      backgroundColor: '#ffffff',
    })

    this.add
      .text(
        this.middleX,
        this.middleY - 100,
        this.gameTitle,
        this.gameTitleConfig,
      )
      .setOrigin(0.5, 0.5)
      .setPadding(5)
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      console.log('~~~ start')
    }
  }
}
