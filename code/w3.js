let Matter = require("matter-js");

let engine = Matter.Engine.create();

let render = Matter.Render.create({
    element: document.body,
    engine,
    options: {
        width: 1500,
        height: 800,
        wireframes: false,
    },
});
let ground = Matter.Bodies.rectangle(1200, 500, 300, 20, { isStatic: true });

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
        render: { visible: true },
    },
});

render.mouse = mouse;

let ball = Matter.Bodies.circle(300, 600, 20);

let sling = Matter.Constraint.create({
    pointA: { x: 300, y: 600 },
    bodyB: ball,
    stiffness: 0.05,
});

let stack = Matter.Composites.stack(1100, 270, 4, 4, 0, 0, (x, y) => {
    return Matter.Bodies.polygon(x, y, 8, 30);
});

let firing = false;
Matter.Events.on(mouseConstraint, "enddrag", (e) => {
    console.log(e)
    if (e.body === ball) firing = true;
});
Matter.Events.on(engine, "afterUpdate", () => {
    if (firing && Math.abs(ball.position.x - 300) < 20 && Math.abs(ball.position.y - 600) < 20) {

        ball = Matter.Bodies.circle(300, 600, 20);
        Matter.World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
    }
});

Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);

document.getElementById('restart').addEventListener('click', () => {
    let stack = Matter.Composites.stack(1100, 270, 4, 4, 0, 0, (x, y) => {
        return Matter.Bodies.polygon(x, y, 8, 30);
    });
    Matter.World.add(engine.world, stack);

})