import CustomSelect from 'vanilla-js-dropdown';
import SimpleBar from 'simplebar';

export default function(selectEls) {
    [].forEach.call(selectEls, item => {
      new CustomSelect({
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
