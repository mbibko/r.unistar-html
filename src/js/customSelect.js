import Select from 'vanilla-js-dropdown';
import SimpleBar from 'simplebar';

export default function(selectEls) {
    [].forEach.call(selectEls, item => {
      if (item.offsetWidth == 0 && item.offsetHeight == 0) return;

      new Select({
        elem: item
      });
      const selectWrapper = item.previousElementSibling
      const content = selectWrapper.querySelector('.js-Dropdown-list');
      item.addEventListener('change', () => {
        selectWrapper.classList.add('is-changed')
      });
      new SimpleBar(content, {
        forceVisible: true
      });
    })
}
