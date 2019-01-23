let batch = [];
let isRunning = false;

/**
 * With `schedule` you can add a task to budu's batch that will execute with all the other tasks
 * that have been added since the last animation frame.
 *
 * @example
 * schedule({
 *   measure: () => element.getBoundingClientRect().width, // `getBoundingClientRect` triggers layout
 *   update: (width) => element.style.width = `${width + 100}px` // Increase current width by 100px
 * })
 *
 * @export
 * @param {object} task - Object consisting of a measure and update function.
 * @param {function} task.measure - Function that should get used to read from the DOM or triggers Layout and style recalculations.
 * This function should always return a value which get's passed into `task.update`.
 * @param {function} task.update - Function to update DOM attributes. It get's called with the returned value from `task.measure`.
 */
export default function schedule (task) {
    batch.push(task);

    if (isRunning) return;

    isRunning = true;
    window.requestAnimationFrame(runBatch);
}

/**
 *  Functions that first calls all `measure` functions and all `update` functions after that.
 *
 */
function runBatch () {
    if (!batch.length) return;
    const values = batch.map(task => task.measure());
    batch.forEach((task, i) => task.update && task.update(values[i]));
    batch = [];
    isRunning = false;
}
