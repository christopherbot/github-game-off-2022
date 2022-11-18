import 'phaser'
import { gameTitle } from './game-title'
import { Title } from './scenes'

if (module.hot) {
  module.hot.accept()
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: gameTitle,
  type: Phaser.WEBGL,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    // mode: Phaser.Scale.ScaleModes.FIT,
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    width: Math.min(window.innerWidth, 1000),
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000,
      },
      // debug: true,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [Title],
}

window.game = new Phaser.Game(gameConfig)
