let Matter = require("matter-js");

let engine = Matter.Engine.create();

let render = Matter.Render.create({
    element: document.body,
    engine,
    options: {
        width: 1200,
        height: 700,
        wireframes: false
    }
})
let ground = Matter.Bodies.rectangle(0, 590, 2000, 10, { isStatic: true })

let mouse = Matter.Mouse.create(render.canvas)
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
        render: { visible: true }
    }
})

render.mouse = mouse;

let stack = Matter.Composites.stack(170, 270, 4, 4, 0, 0, (x, y) => {
    let sides = Math.round(Matter.Common.random(2, 8))
    let rad = Matter.Common.random(20, 50)
    return Matter.Bodies.polygon(x, y, sides, rad)
})

Matter.World.add(engine.world, [stack, ground, mouseConstraint])
Matter.Engine.run(engine)
Matter.Render.run(render)