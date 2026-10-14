/*jslint browser */

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

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("calc-button");
    let form = document.getElementById("calc-form");
    button.addEventListener("click", calculateCost);
    form.addEventListener("submit", calculateCost);
});
