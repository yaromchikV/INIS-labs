const workSpace = document.querySelector('#workspace');
const targets = document.querySelectorAll('.target');
let positionX;
let positionY;
let zoom = null;
let isTwoMove = true;
let touchPositionX;
let touchPositionY;
let position = false;
let element;

for (let i = 0; i < targets.length; i++) {
    targets[i].draggable = true;

    workSpace.addEventListener('click', (e) => {
        console.log('workspace click');

        workSpace.ontouchmove = null;
        targets[i].style.background = 'red';
    });
    workSpace.addEventListener('touchstart', (e) => {
        console.log('workspace touchstart (position = ' + position + ')');

        if (position) {
            element.style.top = touchPositionY;
            element.style.left = touchPositionX;
            position = false;
            e.targetTouches[0] = null;
            e.targetTouches[1] = null;
        }
    });
    workSpace.addEventListener("dragover", (e) => {
        console.log('workspace dragover');

        e.preventDefault();
    });
    workSpace.addEventListener("drop", () => {
        console.log('workspace drop');

        drop = true;
    });


    targets[i].addEventListener('click', (e) => {
        console.log('target ' + i + ' click');

        e.stopPropagation();
        workSpace.onmousemove = null;
        for (let j = 0; j < targets.length; ++j) {
            if (j == i)
                targets[j].style.background = 'blue';
            else
                targets[j].style.background = 'red';
        }
    });
    targets[i].addEventListener('dblclick', (e) => {
        console.log('target ' + i + ' dblclick');

        positionX = e.offsetX;
        positionY = e.offsetY;
        workSpace.onmousemove = (e) => {
            targets[i].style.top = e.pageY - positionY + 'px';
            targets[i].style.left = e.pageX - positionX + 'px';
        }
    });
    targets[i].addEventListener('touchmove', (e) => {
        var touch1 = e.targetTouches[0];
        var touch2 = e.targetTouches[1];
        var touch3 = e.targetTouches[2];

        if (touch1) {
            console.log('target ' + i + ' touchmove 1');
            if (touch2 && isTwoMove) {
                console.log('target ' + i + ' touchmove 2');
                const scale = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
                if (zoom) {
                    targets[i].style.transform = "scale(" + Math.abs(scale / zoom) + ")";
                }
                else {
                    zoom = scale;
                }
                if (touch3) {
                    console.log('target ' + i + ' touchmove 3');
                    targets[i].style.transform = "scale(1)";
                }
            }
            else {
                console.log('target ' + i + ' touchmove (position = false)');
                if (!position) {
                    element = targets[i];
                    touchPositionX = targets[i].style.left;
                    touchPositionY = targets[i].style.top;
                    position = true;
                }
                targets[i].style.top = e.targetTouches[0].pageY - targets[i].offsetHeight / 2 + 'px';
                targets[i].style.left = e.targetTouches[0].pageX - targets[i].offsetWidth / 2 + 'px';
            }
        }
    });
    targets[i].addEventListener('touchstart', (e) => {
        console.log('target ' + i + ' touchstart');

        if (e.target.style.background == 'blue') {
            workSpace.ontouchmove = (e) => {
                targets[i].style.top = e.targetTouches[0].pageY - targets[i].offsetHeight / 2 + 'px';
                targets[i].style.left = e.targetTouches[0].pageX - targets[i].offsetWidth / 2 + 'px';
            }
        }
    });
    targets[i].addEventListener('touchend', (e) => {
        console.log('target ' + i + ' touchend');

        if (e.targetTouches.length == 2) {
            workSpace.ontouchmove = null;
            isTwoMove = false;
        }
        else {
            isTwoMove = true;
        }
        position = false;
    });
    targets[i].addEventListener('dragstart', (e) => {
        console.log('target ' + i + ' dragstart');

        positionX = e.offsetX;
        positionY = e.offsetY;
    });
    targets[i].addEventListener('dragend', (e) => {
        console.log('target ' + i + ' dragend');

        if (drop) {
            targets[i].style.top = e.pageY - positionY + 'px';
            targets[i].style.left = e.pageX - positionX + 'px';
            drop = false;
        }
    });
}