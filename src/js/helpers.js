/**
 * A wrapper for Array.prototype.forEach() for non-arrays
 * @param  {Array-like} arr      The array-like object
 * @param  {Function}   callback The callback to run
 */
export function forEach(arr, callback) {
  Array.prototype.forEach.call(arr, callback);
}
// forEach(document.querySelectorAll(els), item => {
//     // do some things
// });

export function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export function setContainerHeight(container) {
  const setHeight = (el) => {
    if (!el) return;
    el.style.height = window.innerHeight + 'px';

  }
  setHeight(container);

  window.addEventListener("resize", function () {
    setHeight(container);
  })
}

export const windowSidesResize = {
  oldWWidth: window.innerWidth,
  oldWHeight: window.innerHeight,
  updateOldSizes: function () {
    this.oldWWidth = window.innerWidth;
    this.oldWHeight = window.innerHeight;
  },
  check: function () {
    if ((this.oldWWidth != window.innerWidth) && (this.oldWHeight != window.innerHeight)) {
      this.updateOldSizes();
      return true
    } else {
      this.updateOldSizes();
      return false
    }
  }
}

export function checkVisible(el, threshold, mode) {
  threshold = threshold || 0;
  mode = mode || 'visible';

  var rect = el.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var above = rect.bottom - threshold < 0;
  var below = rect.top - viewHeight + threshold >= 0;

  return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
}

export const sxsw = {

  full_bleed: function (browserWidth, browserHeight, videoWidth, videoHeight) {

    // Calculate new height and width...
    var ratio = videoHeight / videoWidth;

    videoWidth = browserWidth;
    videoHeight = browserWidth * ratio;

    // If the video is not the right height, then make it so...  
    if (videoHeight < browserHeight) {
      videoHeight = browserHeight;
      videoWidth = videoHeight / ratio;
    }

    return {
      width: videoWidth,
      height: videoHeight
    };

  },

  init: function (video, videoWidth, videoHeight) {
    var new_size = sxsw.full_bleed(window.innerWidth, window.innerHeight, videoWidth, videoHeight);

    video.style.width = new_size.width + 'px';
    video.style.height = new_size.height + 'px';
  }

};

export function onlyNumber(elements) {
  [].forEach.call(elements, function (el, i) {
    el.addEventListener('keyup', () => {
      el.value = el.value.replace(/[^0-9.]/g, '');
    });
  });
}

export function maxValue(elements) {
  [].forEach.call(elements, function (el, i) {
    const max = el.getAttribute('max')
    el.addEventListener('keyup', () => {
      if (+el.value > max) el.value = max
    });
  });
}

export function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function(){
      if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval); 
  },15);
}

export function move(moreContainer, lessContainer, size) {
  if(window.innerWidth < size) {
    if (!moreContainer.children[0]) return;
    lessContainer.appendChild(moreContainer.children[0])
  } else {
    if (!lessContainer.children[0]) return;
    moreContainer.appendChild(lessContainer.children[0])
  }
  
}

export function moveTingleClose(modal) {
  const close = modal.querySelector(".tingle-modal__close");
  const modalContent = modal.querySelector(".tingle-modal-box__content");
  modalContent.appendChild(close);
}

export function invertColor(hexTripletColor) {
  var color = hexTripletColor;
  color = color.substring(1); // remove #
  color = parseInt(color, 16); // convert to integer
  color = 0xFFFFFF ^ color; // invert three bytes
  color = color.toString(16); // convert to hex
  color = ("000000" + color).slice(-6); // pad with leading zeros
  color = "#" + color; // prepend #
  return color;
}

export function mobileDevice() {
  if (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent)) {
    return true;
  }
}