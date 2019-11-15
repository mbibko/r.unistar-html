import CustomSelect from './customSelect';
import counter from './b-counter.js';
import { forEach } from './helpers'

(function() {

    const init = form => {
        if (!form) return
        counter(form.querySelectorAll('.b-counter'))
        CustomSelect(form.querySelectorAll('.select'))
        forEach(document.querySelectorAll('.js-select-time-choose'), select => {
            const timesEls = select.parentNode.querySelectorAll('.b-times')
            select.addEventListener('change', () => {
                forEach(timesEls, el => {
                    el.classList.remove('active')
                });
                timesEls[select.value].classList.add('active')
            })
        });
        ready( function selectInit () {
            forEach(document.querySelectorAll('.b-counter__control input'), input => {
                input.addEventListener('input', () => {
                    var max_val = input.getAttribute("max");
                    var min_val = input.getAttribute("min");
                    if(parseInt(input.value) < min_val ) {
                        input.value = min_val
                    }
                    if(parseInt(input.value) > max_val) {
                        input.value = max_val
                    }
                    //получить значения для формулы
                    var chron = document.querySelector("#chron").value;
                    var perday = document.querySelector("#perday").value;
                    var time = document.querySelector("#period-select").selectedIndex;
                    var price = document.querySelector("#period-select").options[time].dataset.price;
                    var nds = document.querySelector("#nds").value;
                    var city = document.querySelector("#city-select").selectedIndex;
                    var city_coef = document.querySelector("#city-select").options[city].dataset.coef;
                    var period = document.querySelector("#period").value;
                    var type = document.querySelector("#type-select").selectedIndex;
                    var type_coef = document.querySelector("#type-select").options[type].dataset.coef;

                    var sum = chron * perday / 60 * price * nds * city_coef * period * type_coef;
                    var sum_int = chron * perday * period;
                    var sum_sale = 0;
                    forEach(document.querySelectorAll('.sale_value'), sale => {
                        var min_time = sale.dataset.min;
                        var max_time = sale.dataset.max;
                        var val = sale.dataset.val;
                        if (sum_int >= min_time && sum_int <= max_time) sum_sale = val;
                    });
                    document.querySelector(".calc-form-order__discount").innerHTML = "-" + sum_sale + "%";
                    var itog = sum/100*(100 - sum_sale);
                    document.querySelector(".calc-form-order__newprice").innerHTML = itog.toFixed() + "<span>BYN</span>";
                    document.querySelector(".calc-form-order__oldprice span").innerHTML = sum.toFixed() + " BYN";
                })
            });
            forEach(document.querySelectorAll('#city-select, #type-select, #period-select'), select => {
                select.addEventListener('change', () => {
                    var city_id_ind = document.querySelector("#city-select").selectedIndex;
                    var city_id = document.querySelector("#city-select").options[city_id_ind].dataset.id;

                    var type_id_ind = document.querySelector("#type-select").selectedIndex;
                    var type_id = document.querySelector("#type-select").options[type_id_ind].dataset.id;

                    var period_id_ind = document.querySelector("#period-select").selectedIndex;
                    var period_id = document.querySelector("#period-select").options[period_id_ind].dataset.id;

                    var data = "";
                    if (select.id == "city-select") {
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
                            var resp = this.response;
                            document.querySelector('.b-calc__content').innerHTML = resp;
                            init(document.querySelector('.calc-form'));
                        }
                    };
                    request.send(data);
                })
            });
        });
    }
    // init() //after Ajax success
    function ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready( function selectInit () {
        forEach(document.querySelectorAll('.b-counter__control input'), input => {
            input.addEventListener('input', () => {
                var max_val = input.getAttribute("max");
                var min_val = input.getAttribute("min");
                if(parseInt(input.value) < min_val ) {
                    input.value = min_val
                }
                if(parseInt(input.value) > max_val) {
                    input.value = max_val
                }
                //получить значения для формулы
                var chron = document.querySelector("#chron").value;
                var perday = document.querySelector("#perday").value;
                var time = document.querySelector("#period-select").selectedIndex;
                var price = document.querySelector("#period-select").options[time].dataset.price;
                var nds = document.querySelector("#nds").value;
                var city = document.querySelector("#city-select").selectedIndex;
                var city_coef = document.querySelector("#city-select").options[city].dataset.coef;
                var period = document.querySelector("#period").value;
                var type = document.querySelector("#type-select").selectedIndex;
                var type_coef = document.querySelector("#type-select").options[type].dataset.coef;

                var sum = chron * perday / 60 * price * nds * city_coef * period * type_coef;
                var sum_int = chron * perday * period;
                var sum_sale = 0;
                forEach(document.querySelectorAll('.sale_value'), sale => {
                    var min_time = sale.dataset.min;
                    var max_time = sale.dataset.max;
                    var val = sale.dataset.val;
                    if (sum_int >= min_time && sum_int <= max_time) sum_sale = val;
                });
                document.querySelector(".calc-form-order__discount").innerHTML = "-" + sum_sale + "%";
                var itog = sum/100*(100 - sum_sale);
                document.querySelector(".calc-form-order__newprice").innerHTML = itog.toFixed() + "<span>BYN</span>";
                document.querySelector(".calc-form-order__oldprice span").innerHTML = sum.toFixed() + " BYN";
            })
        });
        forEach(document.querySelectorAll('#city-select, #type-select, #period-select'), select => {
            select.addEventListener('change', () => {
                var city_id_ind = document.querySelector("#city-select").selectedIndex;
                var city_id = document.querySelector("#city-select").options[city_id_ind].dataset.id;

                var type_id_ind = document.querySelector("#type-select").selectedIndex;
                var type_id = document.querySelector("#type-select").options[type_id_ind].dataset.id;

                var period_id_ind = document.querySelector("#period-select").selectedIndex;
                var period_id = document.querySelector("#period-select").options[period_id_ind].dataset.id;

                var data = "";
                if (select.id == "city-select") {
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
                        var resp = this.response;
                        document.querySelector('.b-calc__content').innerHTML = resp;
                        init(document.querySelector('.calc-form'));
                    }
                };
                request.send(data);
            })
        });
    });
}());


