const sucursalInputs = document.querySelectorAll('input[name="sucursal"]');
const sucursalContainer = document.getElementById('sucursal-container');
const brandContainer = document.getElementById('brand-container');
const modelContainer = document.getElementById('model-container');
const accessoryContainer = document.getElementById('accessory-container');
const paymentContainer = document.getElementById('payment-container');

const modelSelect = document.getElementById("modelSelect");
const paymentSelect = document.getElementById("paymentSelect");
const accessorySelect = document.getElementById("accessorySelect");

let jsonSucursal = JSON.parse(document.getElementById('sucursal-json').textContent);
let jsonCarBrand = JSON.parse(document.getElementById('carbrand-json').textContent);
let jsonCarModel = JSON.parse(document.getElementById('carmodel-json').textContent);
let jsonPayment = JSON.parse(document.getElementById('payment-json').textContent);
let jsonCarAccessory = JSON.parse(document.getElementById('caraccessory-json').textContent);

const btnContainer = document.getElementById('btn-container');
const btn = document.getElementById('btn-output');
const btnOff = document.getElementById('btn-output-off');
const btnPresupuesto = document.getElementById('btn-output-presupuesto');
const btnPresupuestoOff = document.getElementById('btn-output-presupuesto-off');
const btnTotal = document.getElementById('btn-output-total');
const btnTotalOff = document.getElementById('btn-output-total-off');

const message = document.getElementById('output');


// DISPLAY SUCURSAL
jsonSucursal.forEach(sucursal => {

    const inputSucursal = document.createElement('input');
    inputSucursal.type = 'radio';
    inputSucursal.id = `sucursal-${sucursal.id}`;
    inputSucursal.name = 'sucursal';
    inputSucursal.value = sucursal.name;

    const labelSucursal = document.createElement('label');
    labelSucursal.htmlFor = `sucursal-${sucursal.id}`;
    labelSucursal.textContent = sucursal.name;

    sucursalContainer.appendChild(inputSucursal);
    sucursalContainer.appendChild(labelSucursal);
    sucursalContainer.appendChild(document.createElement('br'));

    inputSucursal.addEventListener('click', () => {

        accessoryContainer.classList.remove('color-jeep')
        accessoryContainer.classList.remove('color-nissan')
        accessoryContainer.classList.remove('color-renault')
        accessoryContainer.classList.remove('color-vw')

        brandContainer.textContent = '';
        modelContainer.textContent = '';
        message.textContent = '';

        displayBrands();

    });
})


// DISPLAY BRANDS
function displayBrands() {

    accessoryContainer.classList.remove('color-jeep')
    accessoryContainer.classList.remove('color-nissan')
    accessoryContainer.classList.remove('color-renault')
    accessoryContainer.classList.remove('color-vw')

    modelContainer.textContent = '';
    paymentContainer.textContent = '';
    accessoryContainer.textContent = '';
    message.textContent = '';

    jsonCarBrand.forEach(brand => {

        const inputBrand = document.createElement('input');
        inputBrand.type = 'radio';
        inputBrand.id = `brand-${brand.id}`;
        inputBrand.name = 'brand';
        inputBrand.value = brand.name;

        const labelBrand = document.createElement('label');
        labelBrand.htmlFor = `brand-${brand.id}`;
        labelBrand.textContent = brand.name;

        brandContainer.appendChild(inputBrand);
        brandContainer.appendChild(labelBrand);
        brandContainer.appendChild(document.createElement('br'));

        inputBrand.addEventListener('click', () => {
            displayModels(brand);
            displayPayment();
        });
    });
}


// DISPLAY MODELS
function displayModels(brand) {

    accessoryContainer.classList.remove('color-jeep')
    accessoryContainer.classList.remove('color-nissan')
    accessoryContainer.classList.remove('color-renault')
    accessoryContainer.classList.remove('color-vw')

    modelContainer.textContent = '';
    paymentContainer.textContent = '';
    accessoryContainer.textContent = '';
    message.textContent = '';

    jsonCarModel.forEach(model => {

        const inputModel = document.createElement('input');
        inputModel.type = 'radio';
        inputModel.id = `model-${model.id}`;
        inputModel.name = 'model';
        inputModel.value = model.model_name;

        const labelModel = document.createElement('label');
        labelModel.htmlFor = `model-${model.id}`;
        labelModel.textContent = model.model_name;

        if (model.brand_id == brand.id) {

            modelContainer.appendChild(inputModel);
            modelContainer.appendChild(labelModel);
            modelContainer.appendChild(document.createElement('br'));

            inputModel.addEventListener('click', () => {

                displayPayment(brand, model);
                displayAccessories(model);

            });

        }
    })
}


// DISPLAY PAYMENT
function displayPayment() {

    accessoryContainer.classList.remove('color-jeep')
    accessoryContainer.classList.remove('color-nissan')
    accessoryContainer.classList.remove('color-renault')
    accessoryContainer.classList.remove('color-vw')

    paymentContainer.textContent = '';
    accessoryContainer.textContent = '';
    message.textContent = '';

    jsonPayment.forEach(payment => {

        const inputPayment = document.createElement('input');
        inputPayment.type = 'radio';
        inputPayment.id = `payment-${payment.id}`;
        inputPayment.name = 'payment';
        inputPayment.value = payment.name;

        const labelPayment = document.createElement('label');
        labelPayment.htmlFor = `payment-${payment.id}`;
        labelPayment.textContent = payment.name;

        paymentContainer.appendChild(inputPayment);
        paymentContainer.appendChild(labelPayment);
        paymentContainer.appendChild(document.createElement('br'));

    })
}


// DISPLAY ACCESSORIES
function displayAccessories(model) {

    accessoryContainer.classList.remove('color-jeep')
    accessoryContainer.classList.remove('color-nissan')
    accessoryContainer.classList.remove('color-renault')
    accessoryContainer.classList.remove('color-vw')

    accessoryContainer.textContent = '';
    message.textContent = '';

    const checkedSucursal = document.querySelector('input[type="radio"]:checked');

    // SORTING ACCESSORIES
    jsonCarAccessory.sort((a, b) => {
        if (a.name < b.name) { return -1 }
        if (a.name > b.name) { return 1 }
        return 0;
    }).forEach(accessory => {

        const inputAccessory = document.createElement('input');
        inputAccessory.type = 'checkbox';
        inputAccessory.id = `accessory-${accessory.id}`;
        inputAccessory.name = 'accessory';
        inputAccessory.value = accessory.name;

        const labelAccessory = document.createElement('label');
        labelAccessory.htmlFor = `accessory-${accessory.id}`;
        labelAccessory.textContent = `${accessory.code} ${accessory.name} - $ ${accessory.price.toFixed(2)}`;

        if (model.brand_id == 1) {
            accessoryContainer.classList.add('color-jeep')
        } else if (model.brand_id == 2) {
            accessoryContainer.classList.add('color-nissan')
        } else if (model.brand_id == 3) {
            accessoryContainer.classList.add('color-renault')
        } else if (model.brand_id == 4) {
            accessoryContainer.classList.add('color-vw')
        }

        if (accessory.model_id == model.id) {

            const sucursalName = checkedSucursal.value;
            const pattern = new RegExp(sucursalName, 'i')

            if (!accessory.name.match(pattern)) {

                accessoryContainer.appendChild(inputAccessory);
                accessoryContainer.appendChild(labelAccessory);
                accessoryContainer.appendChild(document.createElement('br'));

            }

        }

    })

}


// MESSAGE
btn.addEventListener('click', () => {

    const [accessoryNamePriceCode, finalPrice, formattedFinalPrice] = gettingInputData()

    const formattedFutureDate = gettingDate()

    message.innerHTML = '';
    message.innerHTML = `Queda confirmada la colocación de accesorios, te envío el detalle de tu compra:\n
<ul>${accessoryNamePriceCode}</ul>
Total a abonar: $${formattedFinalPrice}
\nEl monto de tu orden se congela por 48hs hábiles y podés abonar hasta el ${formattedFutureDate} inclusive.
\n${paymentMethodChecked()}
\n¡Gracias por tu compra!`;

    // COPYING TEXT
    const copyText = document.getElementById('output');
    const copiedText = copyText.textContent;
    navigator.clipboard.writeText(copiedText)

    clearButton();

});


// 10% OFF
btnOff.addEventListener('click', () => {

    const [accessoryNamePriceCode, finalPrice, formattedFinalPrice] = gettingInputData()

    const formattedFutureDate = gettingDate()

    message.innerHTML = '';
    message.innerHTML = `Queda confirmada la colocación de accesorios, te envío el detalle de tu compra:\n
<ul>${accessoryNamePriceCode}</ul>
Total del pedido: $${formattedFinalPrice}
Descuento: -$${((applyDiscount(finalPrice) - finalPrice) * (-1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
Total a abonar: $${applyDiscount(finalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
\nEl monto de tu orden se congela por 48hs hábiles y podés abonar hasta el ${formattedFutureDate} inclusive.
\n${paymentMethodChecked()}
\n¡Gracias por tu compra!`;

    // COPYING TEXT
    const copyText = document.getElementById('output');
    const copiedText = copyText.textContent;
    navigator.clipboard.writeText(copiedText)

    clearButton();

});


// PRESUPUESTO 
btnPresupuesto.addEventListener('click', () => {

    const [accessoryNamePriceCode, finalPrice, formattedFinalPrice] = gettingInputData()

    message.innerHTML = '';
    message.innerHTML = `Te paso el presupuesto de los accesorios de tu interés:\n
<ul>${accessoryNamePriceCode}</ul>
Total: $${formattedFinalPrice}
\nEl presupuesto tiene validez por 48hs hábiles, pasado este plazo los valores quedan sujetos a modificación hasta el momento de su confirmación.`;

    // COPYING TEXT
    const copyText = document.getElementById('output');
    const copiedText = copyText.textContent;
    navigator.clipboard.writeText(copiedText)

    clearButton();
});


// PRESUPUESTO 10% OFF
btnPresupuestoOff.addEventListener('click', () => {

    const [accessoryNamePriceCode, finalPrice, formattedFinalPrice] = gettingInputData()

    message.innerHTML = '';
    message.innerHTML = `Te paso el presupuesto de los accesorios de tu interés:\n
<ul>${accessoryNamePriceCode}</ul>
Total del pedido: $${formattedFinalPrice}
Descuento: -$${((applyDiscount(finalPrice) - finalPrice) * (-1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
Total a abonar: $${applyDiscount(finalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
\nEl presupuesto tiene validez por 48hs hábiles, pasado este plazo los valores quedan sujetos a modificación hasta el momento de su confirmación.`;

    // COPYING TEXT
    const copyText = document.getElementById('output');
    const copiedText = copyText.textContent;
    navigator.clipboard.writeText(copiedText)

    clearButton();

});


btnTotal.addEventListener('click', () => {

    const [accessoryNamePriceCode, finalPrice, formattedFinalPrice] = gettingInputData()

    message.innerHTML = '';
    message.innerHTML = `TOTAL: $ ${formattedFinalPrice}`

    // COPYING TEXT
    const copyText = document.getElementById('output');
    const copiedText = copyText.textContent;
    navigator.clipboard.writeText(copiedText)

    clearButton();

})


btnTotalOff.addEventListener('click', () => {

    const [accessoryNamePriceCode, finalPrice, formattedFinalPrice] = gettingInputData()

    message.innerHTML = '';
    message.innerHTML = `
Total del pedido: $${formattedFinalPrice} || 
Descuento: -$${((applyDiscount(finalPrice) - finalPrice) * (-1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')} || 
TOTAL: $${applyDiscount(finalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}`;

    // COPYING TEXT
    const copyText = document.getElementById('output');
    const copiedText = copyText.textContent;
    navigator.clipboard.writeText(copiedText)

    clearButton();

})


// DISCOUNT
function applyDiscount(originalPrice) {

    const price = Number(originalPrice)

    const discount = price * 0.10;

    const discountedPrice = price - discount;

    return discountedPrice;

}


// GETTING INPUT DATA
function gettingInputData() {

    // FILTERING CHECKED BOXES
    // Getting model id
    const checkboxModel = document.querySelectorAll('input[name="model"]')
    let checkedModelId;

    checkboxModel.forEach(checkbox => {
        if (checkbox.checked) {
            checkedModelId = checkbox.id.split('-')[1]
        }
    })

    // Getting accessory
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    const checkedAccessoriesCode = [];
    const checkedAccessoriesName = [];
    const checkedAccessoriesPrice = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {

            checkedAccessoriesCode.push(jsonCarAccessory.filter(item => item.id == checkbox.id.split('-')[1] && item.model_id == checkedModelId)[0].code)
            checkedAccessoriesName.push(checkbox.value.split(' (-')[0]);
            checkedAccessoriesPrice.push(jsonCarAccessory.filter(item => item.id == checkbox.id.split('-')[1] && item.model_id == checkedModelId)[0].price)

        }
    })

    let accessoryNamePriceCode = ''
    for (const item in checkedAccessoriesName) {
        accessoryNamePriceCode += `<li> - ${checkedAccessoriesCode[item]} ${checkedAccessoriesName[item]}: $${checkedAccessoriesPrice[item].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}\n</li>`
    }

    const finalPrice = checkedAccessoriesPrice.reduce((acc, currVal) => acc + currVal, 0);
    const formattedFinalPrice = finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')

    return [accessoryNamePriceCode, finalPrice, formattedFinalPrice]

}


// GETTING DATE
function gettingDate() {

    // GETTING DATE
    const currentDate = new Date();

    // Add 48 hours to the current date
    const futureDate = new Date(currentDate.getTime() + (48 * 60 * 60 * 1000));

    // Check if the future date falls on a Saturday or Monday
    if (futureDate.getDay() === 6) { // Saturday
        futureDate.setDate(futureDate.getDate() + 2); // Add 2 days to skip Saturday
    } else if (futureDate.getDay() === 0) { // Monday
        futureDate.setDate(futureDate.getDate() + 2); // Add 1 day to skip Monday
    }

    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dayName = days[futureDate.getDay()];
    const dayNumber = futureDate.getDate();
    const month = futureDate.getMonth() + 1; // Note: January is month 0, so we add 1

    const formattedFutureDate = `${dayName} ${dayNumber < 10 ? '0' + dayNumber : dayNumber}/${month < 10 ? '0' + month : month}`;

    return formattedFutureDate

}


// PAYMENT TRANSFER MESSAGE
function paymentTransferMessage() {

    try {

        const brandPaymentData = jsonCarBrand[document.querySelectorAll('input[type="radio"]:checked')[1].id.split('-')[1] - 1].paymentData;

        const paymentText = `A continuación te envío los datos para realizar la transferencia/depósito:
        \n${brandPaymentData}
        \nUna vez realizada, te pido que me envíes el comprobante por este canal para reportarlo al área responsable. Al procesar el pago, te enviaremos el recibo de compra a la casilla registrada ... y el día de la entrega del vehículo te entregaremos la factura.`

        return paymentText
    } catch (error) {

        console.log("Seleccionar una marca!")

    }

}


// PAYMENT METHOD CHECKED
function paymentMethodChecked() {

    const link = `A continuación te envío el link de pago, el mismo tiene una vigencia de 24hs en caso de que vayas a realizar el pago pasado ese plazo tendrás que pedírmelo nuevamente por esta vía.

...

Al realizar el pago se va a generar automáticamente el recibo de compra  y el día de la entrega del vehículo te entregaremos la factura.`


    const presencial = `Para abonar de forma presencial en nuestro concesionario presentá la orden de pago que te envío a continuación (recordá que en caso de abonar con tarjeta de crédito en cuotas se aplicará el recargo correspondiente según la tarjeta).`

    try {
        const checkboxPayment = jsonPayment[document.querySelectorAll('input[type="radio"]:checked')[3].id.split('-')[1] - 1].id

        switch (checkboxPayment) {
            case 1:
                return paymentTransferMessage();
            case 2:
                return link;
            case 3:
                return presencial;
            default:
                alert('Seleccionar medio de pago');
        }
    } catch (error) {

        alert('Modelo de auto o medio de pago sin seleccionar')

    }

}

// CREATING A CLEAR MESSAGE BUTTON
function clearButton() {

    if (btnContainer.lastElementChild.className === 'btn-clear') {
        btnContainer.lastElementChild.remove()
    }
 
    const btnClearCreate = '<button class="btn-clear" id="btn-clear">BORRAR</button>';
    btnTotalOff.insertAdjacentHTML('afterend', btnClearCreate);
    
    const btnClear = document.getElementById('btn-clear')
    
    btnClear.addEventListener('click', () => { message.innerHTML = '' });
    
}


// // COPY AND CLEAR FUNCTION
// function copyAndClear() {

//     // CHECKING IF A COPY BUTTON ALREADY EXISTS
//     const existingCopyBtn = btnContainer.lastElementChild.previousElementSibling;
//     const lastElement = btnContainer.lastElementChild;

//     if (existingCopyBtn.className === 'btn-copy'
//         || existingCopyBtn.className === 'btn-copied'
//         && lastElement.className === 'btn-clear'
//     ) {
//         //    IF IT DOES, REMOVE IT (TO AVOID MULTIPLE COPY BUTTONS)
//         existingCopyBtn.remove();
//         lastElement.remove();
//     };

//     // CREATING A COPY BUTTON
//     const btnCopyCreate = '<button class="btn-copy" id="btn-copy">COPIAR</button>';
//     btnPresupuestoOff.insertAdjacentHTML('afterend', btnCopyCreate)


//     const btnCopy = document.getElementById('btn-copy')

//     btnCopy.addEventListener('click', () => {

//         const copyText = document.getElementById('output');
//         const copiedText = copyText.textContent;

//         navigator.clipboard.writeText(copiedText)
//             .then(() => {
//                 btnCopy.classList.remove('btn-copy');
//                 btnCopy.classList.add('btn-copied');
//                 setTimeout(() => {
//                     btnCopy.classList.remove('btn-copied');
//                     btnCopy.classList.add('btn-copy');
//                 }, 500)
//             })
//             .catch(err => {
//                 console.error('Error copying message to clipboard: ', err);
//             });
//     });

//     // CREATING A CLEAR MESSAGE BUTTON
//     const btnClearCreate = '<button class="btn-clear" id="btn-clear">BORRAR</button>';
//     btnCopy.insertAdjacentHTML('afterend', btnClearCreate);

//     const btnClear = document.getElementById('btn-clear')

//     btnClear.addEventListener('click', () => { message.innerHTML = '' });
// }