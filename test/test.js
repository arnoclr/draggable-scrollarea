import DraggableScrollArea from "../src";

const draggableDiv = new DraggableScrollArea(document.querySelector("#draggable"));
const right = document.querySelector(".right");
const left = document.querySelector(".left");

const a = document.querySelector('a');

a.addEventListener('click', () => {
    alert();
})

left.addEventListener('click', () => {
    draggableDiv.backwards();
})

right.addEventListener('click', () => {
    draggableDiv.forwards();
})

draggableDiv.hideOnStart(left);
draggableDiv.hideOnEnd(right);