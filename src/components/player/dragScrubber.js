export default function(elmnt) {
    var oldDistance = 0,
        newDistance = 0;
    elmnt.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
        console.log('dragMouseDown');
        e = e || window.event;
        e.preventDefault();
        if (e.target !== elmnt) return;

        // get the mouse cursor position at startup:
        oldDistance = e.clientX;
        document.addEventListener('mouseup', closeDragElement);

        // call a function whenever the cursor moves:
        document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e) {
        console.log('elementDrag');
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        newDistance = e.clientX - oldDistance;
        oldDistance = e.clientX;

        // set the element's new position:
        const newWidth = (elmnt.offsetWidth + newDistance) + 'px';
        elmnt.style.width = (elmnt.offsetWidth >= elmnt.parentElement.offsetWidth) && newDistance > 0 ? '100%' : newWidth
    }

    function closeDragElement() {
        console.log('closeDragElement');
        /* stop moving when mouse button is released:*/
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}
