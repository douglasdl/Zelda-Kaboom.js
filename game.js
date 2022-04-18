kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 0, 1],
})

const MOVE_SPEED = 120

// Load assets
loadRoot('assets/')
loadSprite('link-going-right', 'link-going-right.png')
loadSprite('link-going-left', 'link-going-left.png')
loadSprite('link-going-up', 'link-going-up.png')
loadSprite('link-going-down', 'link-going-down.png')
loadSprite('left-wall', 'left-wall.png')
loadSprite('right-wall', 'right-wall.png')
loadSprite('top-wall', 'top-wall.png')
loadSprite('bottom-wall', 'bottom-wall.png')
loadSprite('bottom-left-wall', 'bottom-left-wall.png')
loadSprite('bottom-right-wall', 'bottom-right-wall.png')
loadSprite('top-left-wall', 'top-left-wall.png')
loadSprite('top-right-wall', 'top-right-wall.png')
loadSprite('top-door', 'top-door.png')
loadSprite('left-door', 'left-door.png')
loadSprite('fire-pot', 'fire-pot.png')
loadSprite('lanterns', 'lanterns.png')
loadSprite('slicer', 'slicer.png')
loadSprite('skeletor', 'skeletor.png')
loadSprite('kaboom', 'kaboom.png')
loadSprite('stairs', 'stairs.png')
loadSprite('floor', 'floor.png')
loadSprite('grass', 'grass.png')
loadSprite('hole', 'hole.png')
loadSprite('arrow', 'arrow.png')

const map = [
    'xccmcc^ccw',
    'a        b',
    'a      * b',
    'a    f   b',
    '<        b',
    'a    f   b',
    'a   *    b',
    'a        b',
    'zddmddmddy'
]

scene("game", ({ level, score }) => {

    layers(['bg', 'obj', 'ui'], 'obj')

    const gameLevel = addLevel(map, {
        width: 48,
        height: 48,
        pos: vec2(50, 250),
        'a': () => [sprite('left-wall'), area(), solid(), origin("bot")],
        'b': () => [sprite('right-wall'), area(), solid(), origin("bot")],
        'c': () => [sprite('top-wall'), area(), solid(), origin("bot")],
        'd': () => [sprite('bottom-wall'), area(), solid(), origin("bot")],
        'w': () => [sprite('top-right-wall'), area(), solid(), origin("bot")],
        'x': () => [sprite('top-left-wall'), area(), solid(), origin("bot")],
        'y': () => [sprite('bottom-right-wall'), area(), solid(), origin("bot")],
        'z': () => [sprite('bottom-left-wall'), area(), solid(), origin("bot")],
        '^': () => [sprite('top-door'), "next-level", area(), origin("bot")],
        '<': () => [sprite('left-door'), "next-level", area(), solid(), origin("bot")],
        's': () => [sprite('stairs'), "next-level", area(), origin("bot")],
        '*': () => [sprite('slicer'), area(), origin("bot")],
        '}': () => [sprite('skeletor'), area(), origin("bot")],
        'm': () => [sprite('lanterns'), area(), solid(), origin("bot")],
        'f': () => [sprite('fire-pot'), area(), solid(), origin("bot")],
    })

    //add(sprite('floor'), area(gameLevel.width, gameLevel.height), solid(), origin("bot"))

    add([text(score), pos(100, 150), layer('ui'), scale(0.5)])

    add([text('Level ' + level), pos(200, 150), layer('ui'), scale(0.5)])

    const player = add([sprite('link-going-right'), pos(70, 450), layer('obj'),
        {
            // Right by default
            dir: vec2(1, 0),
        }
    ])

    player.action(() => {
        //player.resolve()
    })

    //player.overlaps()

    keyDown('left', () => {
        player.use(sprite('link-going-left'))
        player.move(-MOVE_SPEED, 0)
        player.dir = vec2(-1, 0)
    })
    keyDown('right', () => {
        player.use(sprite('link-going-right'))
        player.move(MOVE_SPEED, 0)
        player.dir = vec2(1, 0)
    })
    keyDown('up', () => {
        player.use(sprite('link-going-up'))
        player.move(0, -MOVE_SPEED)
        player.dir = vec2(0, -1)
    })
    keyDown('down', () => {
        player.use(sprite('link-going-down'))
        player.move(0, MOVE_SPEED)
        player.dir = vec2(0, 1)
    })





})

function start() {
	// Start with the "game" scene, with initial parameters
	go("game", {
        level: 0,
        score: 0,
	})
}

start()