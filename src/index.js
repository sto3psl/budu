let batch = [];

let isRunning = false;

export default function schedule (tasks) {
    batch.push(tasks);

    if (isRunning) return;
    tick();
}

function runBatch () {
    if (!batch.length) return;
    const values = batch.map(task => task.measure());
    batch.forEach((task, i) => task.update && task.update(values[i]));
    batch = [];
    isRunning = false;
}

function tick () {
    isRunning = true;
    window.requestAnimationFrame(runBatch);
}
