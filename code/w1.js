let Matter = require("matter-js");

let engine = Matter.Engine.create();

let render = Matter.Render.create({ element: document.body, engine })
let ground = Matter.Bodies.rectangle(400, 600, 810, 60, { isStatic: true })

let box1 = Matter.Bodies.rectangle(400, 200, 80, 80)
let box2 = Matter.Bodies.rectangle(400, 200, 80, 80)

let mouse = Matter.Mouse.create(render.canvas)
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
        render: { visible: true }
    }
})

render.mouse = mouse;
Matter.World.add(engine.world, [box1, box2, ground, mouseConstraint])
Matter.Engine.run(engine)
Matter.Render.run(render)