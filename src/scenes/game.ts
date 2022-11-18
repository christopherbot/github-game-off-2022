import { BaseScene } from './base-scene'

export class Game extends BaseScene {
  private enterKey!: Phaser.Input.Keyboard.Key
  private player!: Phaser.GameObjects.Sprite
  private graphics!: Phaser.GameObjects.Graphics
  private verts: Record<'x' | 'y', number>[] = []
  private maxVerts = 6
  private isBuilt = false

  constructor() {
    super('game')
  }

  preload(): void {}

  create(): void {
    this.enterKey = this.input.keyboard.addKey('enter')

    this.drawGrid({
      x: 0,
      y: 0,
      width: this.gameWidth,
      height: this.gameHeight,
      backgroundColor: 'yellow',
    })

    this.add
      .text(this.middleX, 100, 'GAME', this.gameTitleConfig)
      .setOrigin(0.5, 0.5)
      .setPadding(5)

    ////

    this.matter.world.setBounds().disableGravity()

    this.graphics = this.add.graphics()

    // const canDrag = this.matter.world.nextGroup()

    const arrow = '40 0 40 20 100 20 100 80 40 80 40 100 0 50'
    const chevron = '100 0 75 50 100 100 25 100 0 50 25 0'
    const star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'
    const wheel =
      '50 100 ' +
      '60 99 ' +
      '70 96 ' +
      '80 90 ' +
      '90 80 ' +
      '100 50 ' +
      '90 20 ' +
      '80 10 ' +
      '70 4 ' +
      '60 1 ' +
      '50 0 ' +
      '40 1 ' +
      '30 4 ' +
      '20 10 ' +
      '10 20 ' +
      '0 50 ' +
      '10 80 ' +
      '20 90 ' +
      '30 96 ' +
      '40 99'
    const chassis = '0 0 300 0 300 20 0 20'

    const arrowPoly = this.add.polygon(
      400,
      300,
      arrow,
      0x0000ff,
      0.2,
    ) as unknown as Phaser.Physics.Matter.Sprite

    this.matter.add.gameObject(arrowPoly, {
      shape: { type: 'fromVerts', verts: arrow, flagInternal: true },
    })

    // arrowPoly.setVelocity(6, 3)
    // arrowPoly.setAngularVelocity(0.01)
    // arrowPoly.setBounce(1)
    // arrowPoly.setFriction(0, 0, 0)

    const chevronPoly = this.add.polygon(
      400,
      100,
      chevron,
      0xff0000,
      0.2,
    ) as unknown as Phaser.Physics.Matter.Sprite

    this.matter.add.gameObject(chevronPoly, {
      shape: { type: 'fromVerts', verts: chevron, flagInternal: true },
    })

    // chevronPoly.setVelocity(6, 3)
    // chevronPoly.setAngularVelocity(0.01)
    // chevronPoly.setBounce(1)
    // chevronPoly.setFriction(0, 0, 0)

    const starPoly = this.add.polygon(
      600,
      400,
      star,
      0x00ff00,
      0.2,
    ) as unknown as Phaser.Physics.Matter.Sprite

    this.matter.add.gameObject(starPoly, {
      shape: { type: 'fromVerts', verts: star, flagInternal: true },
    })

    // starPoly.setVelocity(4, -2)
    // starPoly.setBounce(1)
    // starPoly.setFriction(0, 0, 0)
    // starPoly.setFrictionAir(0.005)

    const wheelPoly1 = this.add.polygon(
      300,
      700,
      wheel,
      0xffff00,
      0.2,
    ) as unknown as Phaser.Physics.Matter.Sprite

    this.matter.add.gameObject(wheelPoly1, {
      shape: { type: 'fromVerts', verts: wheel, flagInternal: true },
    })

    const wheelPoly2 = this.add.polygon(
      500,
      700,
      wheel,
      0xffff00,
      0.2,
    ) as unknown as Phaser.Physics.Matter.Sprite

    this.matter.add.gameObject(wheelPoly2, {
      shape: { type: 'fromVerts', verts: wheel, flagInternal: true },
    })

    const chassisPoly = this.add.polygon(
      400,
      600,
      chassis,
      0xffff00,
      0.2,
    ) as unknown as Phaser.Physics.Matter.Sprite

    this.matter.add.gameObject(chassisPoly, {
      shape: { type: 'fromVerts', verts: chassis, flagInternal: true },
    })

    // wheelPoly.setVelocity(6, 3)
    // wheelPoly.setAngularVelocity(0.01)
    // wheelPoly.setBounce(1)
    // wheelPoly.setFriction(0, 0, 0)

    this.matter.add.mouseSpring({
      length: 1,
      stiffness: 0.6,
      // collisionFilter: { group: canDrag },
    })

    let origin: Record<'x' | 'y', number>

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // TODO call .off if built
      if (this.isBuilt) return

      /*
       * TODO
       * - origin is vert[0](x, y)
       * - vert[0] becomes (0,0)
       * - subsequent verts become normalized based on diff from vert[0]
       */

      if (this.verts.length < this.maxVerts) {
        // if (!origin) {
        //   origin = { x: pointer.x, y: pointer.y }
        //   this.verts.push({ x: 0, y: 0 })
        // } else {
        this.verts.push({ x: pointer.x, y: pointer.y })
        // }
      }

      if (this.verts.length === this.maxVerts) {
        const vertString = this.verts
          .map(vert => `${vert.x} ${vert.y}`)
          .join(' ')
        const average = (array: number[]) =>
          array.reduce((a, b) => a + b) / array.length
        const poly = this.add.polygon(
          average(this.verts.map(vert => vert.x)),
          average(this.verts.map(vert => vert.y)),
          // origin.x,
          // origin.y,
          vertString,
          0xffff00,
          0.2,
        ) as unknown as Phaser.Physics.Matter.Sprite

        this.matter.add.gameObject(poly, {
          shape: { type: 'fromVerts', verts: vertString, flagInternal: true },
        })
        this.isBuilt = true
      }
      console.log('~~~ verts', this.verts)
    })
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      console.log('~~~ Enter')
    }

    this.graphics.clear().lineStyle(1, 0x8c8c8c)
    this.verts.forEach((vert, i, array) => {
      if (this.isBuilt) return
      const nextVert = array[i + 1] || this.input
      this.graphics.lineBetween(vert.x, vert.y, nextVert.x, nextVert.y)
    })
  }
}
