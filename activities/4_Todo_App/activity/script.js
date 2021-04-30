"use strict";

const colorBtn = document.querySelectorAll(".priority");
const contentContainer = document.querySelector(".content-container");

const addBtn = document.querySelector(".ctrl-btn-add");
const taskCreator = document.querySelector(".task-creator");

const overlay = document.querySelector(".overlay");

const removeCreatorBtn = document.querySelector(".overlay-btn-remove");

let selectedColor = "purple";
const resetColor = function (colorboxes) {
    selectedColor = "purple";
    for (let cb of colorboxes) {
        cb.classList.remove("selected-border");
    }
};

(() => {
    addBtn.addEventListener("click", () => {
        taskCreator.classList.remove("hidden");
        overlay.classList.remove("hidden");

        const colorboxes = document.querySelectorAll(".color-box");
        document.getElementById("task-text-input").focus();

        colorboxes[0].classList.add("selected-border");
        for (let colorBox of colorboxes) {
            colorBox.addEventListener("click", () => {
                for (let cb of colorboxes) {
                    cb.classList.remove("selected-border");
                }
                colorBox.classList.add("selected-border");
                selectedColor = colorBox.classList[1];
                console.log(selectedColor);
            });
        }
    });

    removeCreatorBtn.addEventListener("click", () => {
        const colorboxes = document.querySelectorAll(".color-box");
        resetColor(colorboxes);
        taskCreator.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    taskCreator.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            const colorboxes = document.querySelectorAll(".color-box");
            const taskTextArea = document.getElementById("task-text-input");
            const text = taskTextArea.value;
            const div = document.createElement("div");
            div.classList.add("task-container");
            div.innerHTML = ` <div class="task-filter ${selectedColor}"></div>
            <div class="task">
                <div class="task-id">#randomID</div>
                <div class="task-text--div" contenteditable="true">${text}</div>
            </div>`;
            contentContainer.appendChild(div);

            taskTextArea.value = "";
            resetColor(colorboxes);
            taskCreator.classList.add("hidden");
            overlay.classList.add("hidden");

            const taskFilter = div.querySelector(".task-filter");
            taskFilter.addEventListener("click", changeColor);
        }
    });
})();

function changeColor(e) {
    let taskFilter = e.currentTarget;
    let colors = ["purple", "green", "yellow", "red"];
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);
}
