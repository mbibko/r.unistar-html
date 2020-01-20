import { forEach } from './helpers'
import {controls} from "./controls";

(function() {

    const init = form => {
        if (!form) return;
        controls(form);
        forEach(form.querySelectorAll('input.form-control'), control => {
            control.addEventListener('change', () => {
                console.log('control changed');
                updateCalcSum(form);
            });
            control.addEventListener('counter-changed', () => {
                console.log('counter changed');
                updateCalcSum(form);
            })
        });
        forEach(form.querySelectorAll('#city-select, #type-select, #period-select'), select => {
            select.addEventListener('change', () => selectChanged(form, select))
        });
        forEach(form.querySelectorAll('.js-select-time-choose'), select => {
            const timesEls = select.parentNode.querySelectorAll('.b-times');
            select.addEventListener('change', () => {
                forEach(timesEls, el => {
                    el.classList.remove('active')
                });
                timesEls[select.value].classList.add('active')
            })
        });
    };
    init(document.querySelector('.form-calculator'));

    function selectChanged(form, select) {
        var city_id_ind = form.querySelector("#city-select").selectedIndex;
        var city_id = form.querySelector("#city-select").options[city_id_ind].dataset.id;

        var type_id_ind = form.querySelector("#type-select").selectedIndex;
        var type_id = form.querySelector("#type-select").options[type_id_ind].dataset.id;

        var period_id_ind = form.querySelector("#period-select").selectedIndex;
        var period_id = form.querySelector("#period-select").options[period_id_ind].dataset.id;

        var data = "";
        if (select.id === "city-select") {
            data =  "CITY_ID="+city_id+"&TYPE_ID="+type_id;
        } else {
            data =  "CITY_ID="+city_id+"&TYPE_ID="+type_id+"&PERIOD_ID="+period_id;
        }
        var request = new XMLHttpRequest();
        request.open('POST', '/bitrix/templates/partnership/calc.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                const formParent = form.parentNode;
                formParent.innerHTML = this.response;
                init(formParent.children[0]);
            }
        };
        request.send(data);
    }
    function updateCalcSum(form) {
        //получить значения для формулы
        const chronEl = form.querySelector("#chron");
        if (!chronEl) return;
        var chron = chronEl.value;
        var perday = form.querySelector("#perday").value;
        var time = form.querySelector("#period-select").selectedIndex;
        var price = form.querySelector("#period-select").options[time].dataset.price;
        var nds = form.querySelector("#nds").value;
        var city = form.querySelector("#city-select").selectedIndex;
        var city_coef = form.querySelector("#city-select").options[city].dataset.coef;
        var period = form.querySelector("#period").value;
        var type = form.querySelector("#type-select").selectedIndex;
        var type_coef = form.querySelector("#type-select").options[type].dataset.coef;

        var sum = chron * perday / 60 * price * nds * city_coef * period * type_coef;
        var sum_int = chron * perday * period;
        var sum_sale = 0;
        forEach(form.querySelectorAll('.sale_value'), sale => {
            var min_time = sale.dataset.min;
            var max_time = sale.dataset.max;
            var val = sale.dataset.val;
            if (sum_int >= min_time && sum_int <= max_time) sum_sale = val;
        });
        form.querySelector(".calc-form-order__discount").innerHTML = "-" + sum_sale + "%";
        var itog = sum/100*(100 - sum_sale);
        form.querySelector(".calc-form-order__newprice").innerHTML = itog.toFixed() + "<span>BYN</span>";
        form.querySelector(".calc-form-order__oldprice span").innerHTML = sum.toFixed() + " BYN";
    }

}());


