/*jslint browser */
/*global $ */

function calculateCost(event) {
    let field = document.getElementById("product-quantity");
    let item = document.getElementById("product-select");
    let match = field.value.trim().match(/^\d+$/);
    let price = parseInt(item.value, 10);
    let quantity = parseInt(field.value.trim(), 10);
    let result = document.getElementById("calc-result");
    let total = price * quantity;

    event.preventDefault();

    if (match === null || quantity <= 0) {
        result.className = "mt-3 alert alert-danger";
        result.textContent = "Ошибка: введите целое положительное число!";
    } else {
        result.className = "mt-3 alert alert-success fw-bold";
        result.textContent = "Стоимость заказа: " + String(total) + " руб.";
    }
}

function getPrices() {
    return {
        prodOptions: {
            opt1: 0,
            opt2: 4000,
            opt3: 7500
        },
        prodProperties: {
            prop1: 2000,
            prop2: 1500
        },
        prodTypes: [3000, 10000, 5000]
    };
}

function updateServicePrice() {
    let checkBlock = document.getElementById("properties-block");
    let checkboxes = document.querySelectorAll("#properties-block input");
    let match = null;
    let optionPrice = 0;
    let optionSelect = document.getElementById("service-option");
    let price = 0;
    let prices = getPrices();
    let qtyField = document.getElementById("service-quantity");
    let qtyStr = qtyField.value.trim();
    let quantity = parseInt(qtyStr, 10);
    let radios = document.getElementsByName("serviceType");
    let result = document.getElementById("service-result");
    let selectBlock = document.getElementById("options-block");
    let selectedType = "1";
    let total = 0;
    let typeIndex = 0;

    radios.forEach(function (radio) {
        if (radio.checked) {
            selectedType = radio.value;
        }
    });

    typeIndex = parseInt(selectedType, 10) - 1;
    if (typeIndex >= 0) {
        price = prices.prodTypes[typeIndex];
    }

    if (selectedType === "2") {
        selectBlock.style.display = "block";
        optionPrice = prices.prodOptions[optionSelect.value];
        if (optionPrice !== undefined) {
            price += optionPrice;
        }
    } else {
        selectBlock.style.display = "none";
    }

    if (selectedType === "3") {
        checkBlock.style.display = "block";
        checkboxes.forEach(function (checkbox) {
            let propPrice = prices.prodProperties[checkbox.name];
            if (checkbox.checked && propPrice !== undefined) {
                price += propPrice;
            }
        });
    } else {
        checkBlock.style.display = "none";
    }

    match = qtyStr.match(/^\d+$/);
    if (match === null || quantity <= 0) {
        result.className = "mt-3 alert alert-danger";
        result.textContent = "Ошибка: введите целое положительное число!";
    } else {
        total = price * quantity;
        result.className = "mt-3 alert alert-success fw-bold";
        result.textContent = "Стоимость услуги: " + String(total) + " руб.";
    }
}

function updatePager(slick, currentSlide) {
    let current = (currentSlide || 0) + 1;
    let pager = document.getElementById("gallery-pager");
    let show = slick.options.slidesToShow;
    let total = slick.slideCount - show + 1;

    if (total < 1) {
        total = 1;
    }
    if (current > total) {
        current = total;
    }

    pager.textContent = (
        "Страница " + String(current) + " из " + String(total)
    );
}

function initGallery() {
    let slider = $(".gallery-slider");

    slider.on(
        "init reInit afterChange",
        function (ignore, slick, currentSlide) {
            updatePager(slick, currentSlide);
        }
    );

    slider.slick({
        arrows: true,
        dots: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            }
        ],
        slidesToScroll: 1,
        slidesToShow: 3
    });
}

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("calc-button");
    let checkboxes = document.querySelectorAll("#properties-block input");
    let form = document.getElementById("calc-form");
    let optionSelect = document.getElementById("service-option");
    let qtyField = document.getElementById("service-quantity");
    let radios = document.getElementsByName("serviceType");
    let serviceForm = document.getElementById("service-form");

    button.addEventListener("click", calculateCost);
    form.addEventListener("submit", calculateCost);

    qtyField.addEventListener("input", updateServicePrice);
    qtyField.addEventListener("change", updateServicePrice);
    optionSelect.addEventListener("change", updateServicePrice);

    radios.forEach(function (radio) {
        radio.addEventListener("change", updateServicePrice);
    });

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateServicePrice);
    });

    serviceForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateServicePrice();
    });

    updateServicePrice();
    initGallery();
});