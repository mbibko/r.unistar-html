export default function(elmnt) {
    var oldDistance = 0,
        newDistance = 0;
    elmnt.onmousedown = dragMouseDown;  

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.target != elmnt) return

        // get the mouse cursor position at startup:
        oldDistance = e.clientX;
        document.onmouseup = closeDragElement;

        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        newDistance = e.clientX - oldDistance;
        oldDistance = e.clientX;

        // set the element's new position:
        const newWidth = (elmnt.offsetWidth + newDistance) + 'px'
        elmnt.style.width = (elmnt.offsetWidth >= elmnt.parentElement.offsetWidth) && newDistance > 0 ? '100%' : newWidth
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
