const sucursalInputs = document.querySelectorAll('input[name="sucursal"]');
const sucursalContainer = document.getElementById('sucursal-container')
const brandContainer = document.getElementById('brand-container');
const modelContainer = document.getElementById('model-container');
const accessoryContainer = document.getElementById('accessory-container');
const modelSelect = document.getElementById("modelSelect");
const accessorySelect = document.getElementById("accessorySelect");

let jsonSucursal = JSON.parse(document.getElementById('sucursal-json').textContent)
let jsonCarBrand = JSON.parse(document.getElementById('carbrand-json').textContent)
let jsonCarModel = JSON.parse(document.getElementById('carmodel-json').textContent)
let jsonCarAccessory = JSON.parse(document.getElementById('caraccessory-json').textContent)

const btn = document.getElementById('btn-output');
const btnOff = document.getElementById('btn-output-off');
const btnPresupuesto = document.getElementById('btn-output-presupuesto');
const btnPresupuestoOff = document.getElementById('btn-output-presupuesto-off');

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

        inputBrand.addEventListener('click', () => displayModels(brand))
    })

}


// DISPLAY MODELS
function displayModels(brand) {

    accessoryContainer.classList.remove('color-jeep')
    accessoryContainer.classList.remove('color-nissan')
    accessoryContainer.classList.remove('color-renault')
    accessoryContainer.classList.remove('color-vw')

    modelContainer.textContent = '';
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

            inputModel.addEventListener('click', () => displayAccessories(model));

        }
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

    console.log(model.brand_id)


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
        labelAccessory.textContent = `${accessory.name} - $ ${accessory.price.toFixed(2)}`;

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
    const checkedAccesoriesName = [];
    const checkedAccesoriesPrice = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {

            checkedAccesoriesName.push(checkbox.value.split(' (EXCEPTO')[0]);
            checkedAccesoriesPrice.push(jsonCarAccessory.filter(item => item.id == checkbox.id.split('-')[1] && item.model_id == checkedModelId)[0].price)

        }
    })


    let accesoryNameAndPrice = ''
    for (const item in checkedAccesoriesName) {
        accesoryNameAndPrice += `<li> - ${checkedAccesoriesName[item]}: $${checkedAccesoriesPrice[item].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}\n</li>`
    }


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

    const finalPrice = checkedAccesoriesPrice.reduce((acc, currVal) => acc + currVal, 0);
    const formattedFinalPrice = finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')

    message.innerHTML = '';
    message.innerHTML = `Queda confirmada la colocación de accesorios, te envío el detalle de tu compra:\n
<ul>${accesoryNameAndPrice}</ul>
Total a abonar: $${formattedFinalPrice}
\nEl monto de tu orden se congela por 48hs hábiles y podés abonar hasta el ${formattedFutureDate} inclusive.`;

    // CHECKING IF A COPY BUTTON ALREADY EXISTS
    const btnGenerateNextElement = btn.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    const messagePreviousElement = message.previousElementSibling;

    if (btnGenerateNextElement
        && btnGenerateNextElement.className === 'btn-copy'
        || btnGenerateNextElement.className === 'btn-copied'
        && messagePreviousElement.className === 'btn-clear'
    ) {
        // IF IT DOES, REMOVE IT (TO AVOID MULTIPLE COPY BUTTONS)
        btnGenerateNextElement.remove();
        messagePreviousElement.remove();
    };

    // CREATING A COPY BUTTON
    const btnCopyCreate = '<button class="btn-copy" id="btn-copy">COPIAR</button>';
    message.insertAdjacentHTML('beforebegin', btnCopyCreate)


    const btnCopy = document.getElementById('btn-copy')

    btnCopy.addEventListener('click', () => {

        const copyText = document.getElementById('output');
        const copiedText = copyText.textContent;

        navigator.clipboard.writeText(copiedText)
            .then(() => {
                btnCopy.classList.remove('btn-copy');
                btnCopy.classList.add('btn-copied');
                setTimeout(() => {
                    btnCopy.classList.remove('btn-copied');
                    btnCopy.classList.add('btn-copy');
                }, 500)
            })
            .catch(err => {
                console.error('Error copying message to clipboard: ', err);
            });
    });

    // CREATING A CLEAR MESSAGE BUTTON
    const btnClearCreate = '<button class="btn-clear" id="btn-clear">BORRAR</button>';
    message.insertAdjacentHTML('beforebegin', btnClearCreate);

    const btnClear = document.getElementById('btn-clear')

    btnClear.addEventListener('click', () => { message.innerHTML = '' });
});


// 10% OFF
btnOff.addEventListener('click', () => {

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
    const checkedAccesoriesName = [];
    const checkedAccesoriesPrice = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {

            checkedAccesoriesName.push(checkbox.value.split(' (EXCEPTO')[0]);
            checkedAccesoriesPrice.push(jsonCarAccessory.filter(item => item.id == checkbox.id.split('-')[1] && item.model_id == checkedModelId)[0].price)

        }
    })


    let accesoryNameAndPrice = ''
    for (const item in checkedAccesoriesName) {
        accesoryNameAndPrice += `<li> - ${checkedAccesoriesName[item]}: $${checkedAccesoriesPrice[item].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}\n</li>`
    }


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

    const finalPrice = checkedAccesoriesPrice.reduce((acc, currVal) => acc + currVal, 0);
    const formattedFinalPrice = finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')

    message.innerHTML = '';
    message.innerHTML = `Queda confirmada la colocación de accesorios, te envío el detalle de tu compra:\n
<ul>${accesoryNameAndPrice}</ul>
Total del pedido: $${formattedFinalPrice}
Descuento: -$${((applyDiscount(finalPrice)-finalPrice)*(-1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
Total a abonar: $${applyDiscount(finalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
\nEl monto de tu orden se congela por 48hs hábiles y podés abonar hasta el ${formattedFutureDate} inclusive.`;

    // CHECKING IF A COPY BUTTON ALREADY EXISTS
    const btnGenerateNextElement = btnOff.nextElementSibling.nextElementSibling.nextElementSibling;
    const messagePreviousElement = message.previousElementSibling;

    if (btnGenerateNextElement
        && btnGenerateNextElement.className === 'btn-copy'
        || btnGenerateNextElement.className === 'btn-copied'
        && messagePreviousElement.className === 'btn-clear'
    ) {
        // IF IT DOES, REMOVE IT (TO AVOID MULTIPLE COPY BUTTONS)
        btnGenerateNextElement.remove();
        messagePreviousElement.remove();
    };

    // CREATING A COPY BUTTON
    const btnCopyCreate = '<button class="btn-copy" id="btn-copy">COPIAR</button>';
    message.insertAdjacentHTML('beforebegin', btnCopyCreate)


    const btnCopy = document.getElementById('btn-copy')

    btnCopy.addEventListener('click', () => {

        const copyText = document.getElementById('output');
        const copiedText = copyText.textContent;

        navigator.clipboard.writeText(copiedText)
            .then(() => {
                btnCopy.classList.remove('btn-copy');
                btnCopy.classList.add('btn-copied');
                setTimeout(() => {
                    btnCopy.classList.remove('btn-copied');
                    btnCopy.classList.add('btn-copy');
                }, 500)
            })
            .catch(err => {
                console.error('Error copying message to clipboard: ', err);
            });
    });

    // CREATING A CLEAR MESSAGE BUTTON
    const btnClearCreate = '<button class="btn-clear" id="btn-clear">BORRAR</button>';
    message.insertAdjacentHTML('beforebegin', btnClearCreate);

    const btnClear = document.getElementById('btn-clear')

    btnClear.addEventListener('click', () => { message.innerHTML = '' });
});


// PRESUPUESTO 
btnPresupuesto.addEventListener('click', () => {

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
    const checkedAccesoriesName = [];
    const checkedAccesoriesPrice = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {

            checkedAccesoriesName.push(checkbox.value.split(' (EXCEPTO')[0]);
            checkedAccesoriesPrice.push(jsonCarAccessory.filter(item => item.id == checkbox.id.split('-')[1] && item.model_id == checkedModelId)[0].price)

        }
    })


    let accesoryNameAndPrice = ''
    for (const item in checkedAccesoriesName) {
        accesoryNameAndPrice += `<li> - ${checkedAccesoriesName[item]}: $${checkedAccesoriesPrice[item].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}\n</li>`
    }

    // GET DATE: copy from line 225 to 243

    const finalPrice = checkedAccesoriesPrice.reduce((acc, currVal) => acc + currVal, 0);
    const formattedFinalPrice = finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')

    message.innerHTML = '';
    message.innerHTML = `Te paso el presupuesto de los accesorios de tu interés:\n
<ul>${accesoryNameAndPrice}</ul>
- Total: $${formattedFinalPrice}
\nEl presupuesto tiene validez por 48hs hábiles, pasado este plazo los valores quedan sujetos a modificación hasta el momento de su confirmación.`;

    // CHECKING IF A COPY BUTTON ALREADY EXISTS
    const btnGenerateNextElement = btnPresupuesto.nextElementSibling.nextElementSibling;
    const messagePreviousElement = message.previousElementSibling;

    if (btnGenerateNextElement
        && btnGenerateNextElement.className === 'btn-copy'
        || btnGenerateNextElement.className === 'btn-copied'
        && messagePreviousElement.className === 'btn-clear'
    ) {
        // IF IT DOES, REMOVE IT (TO AVOID MULTIPLE COPY BUTTONS)
        btnGenerateNextElement.remove();
        messagePreviousElement.remove();
    };

    // CREATING A COPY BUTTON
    const btnCopyCreate = '<button class="btn-copy" id="btn-copy">COPIAR</button>';
    message.insertAdjacentHTML('beforebegin', btnCopyCreate)


    const btnCopy = document.getElementById('btn-copy')

    btnCopy.addEventListener('click', () => {

        const copyText = document.getElementById('output');
        const copiedText = copyText.textContent;

        navigator.clipboard.writeText(copiedText)
            .then(() => {
                btnCopy.classList.remove('btn-copy');
                btnCopy.classList.add('btn-copied');
                setTimeout(() => {
                    btnCopy.classList.remove('btn-copied');
                    btnCopy.classList.add('btn-copy');
                }, 500)
            })
            .catch(err => {
                console.error('Error copying message to clipboard: ', err);
            });
    });

    // CREATING A CLEAR MESSAGE BUTTON
    const btnClearCreate = '<button class="btn-clear" id="btn-clear">BORRAR</button>';
    message.insertAdjacentHTML('beforebegin', btnClearCreate);

    const btnClear = document.getElementById('btn-clear')

    btnClear.addEventListener('click', () => { message.innerHTML = '' });
});


// PRESUPUESTO 10% OFF
btnPresupuestoOff.addEventListener('click', () => {

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
    const checkedAccesoriesName = [];
    const checkedAccesoriesPrice = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {

            checkedAccesoriesName.push(checkbox.value.split(' (EXCEPTO')[0]);
            checkedAccesoriesPrice.push(jsonCarAccessory.filter(item => item.id == checkbox.id.split('-')[1] && item.model_id == checkedModelId)[0].price)

        }
    })


    let accesoryNameAndPrice = ''
    for (const item in checkedAccesoriesName) {
        accesoryNameAndPrice += `<li> - ${checkedAccesoriesName[item]}: $${checkedAccesoriesPrice[item].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}\n</li>`
    }


    const finalPrice = checkedAccesoriesPrice.reduce((acc, currVal) => acc + currVal, 0);
    const formattedFinalPrice = finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')

    // GET DATE: copy from line 225 to 243

    message.innerHTML = '';
    message.innerHTML = `Te paso el presupuesto de los accesorios de tu interés:\n
<ul>${accesoryNameAndPrice}</ul>
Total del pedido: $${formattedFinalPrice}
Descuento: -$${((applyDiscount(finalPrice)-finalPrice)*(-1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
Total a abonar: $${applyDiscount(finalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
\nEl presupuesto tiene validez por 48hs hábiles, pasado este plazo los valores quedan sujetos a modificación hasta el momento de su confirmación.`;

    // CHECKING IF A COPY BUTTON ALREADY EXISTS
    const btnGenerateNextElement = btnPresupuesto.nextElementSibling.nextElementSibling;
    const messagePreviousElement = message.previousElementSibling;

    if (btnGenerateNextElement
        && btnGenerateNextElement.className === 'btn-copy'
        || btnGenerateNextElement.className === 'btn-copied'
        && messagePreviousElement.className === 'btn-clear'
    ) {
        // IF IT DOES, REMOVE IT (TO AVOID MULTIPLE COPY BUTTONS)
        btnGenerateNextElement.remove();
        messagePreviousElement.remove();
    };

    // CREATING A COPY BUTTON
    const btnCopyCreate = '<button class="btn-copy" id="btn-copy">COPIAR</button>';
    message.insertAdjacentHTML('beforebegin', btnCopyCreate)


    const btnCopy = document.getElementById('btn-copy')

    btnCopy.addEventListener('click', () => {

        const copyText = document.getElementById('output');
        const copiedText = copyText.textContent;

        navigator.clipboard.writeText(copiedText)
            .then(() => {
                btnCopy.classList.remove('btn-copy');
                btnCopy.classList.add('btn-copied');
                setTimeout(() => {
                    btnCopy.classList.remove('btn-copied');
                    btnCopy.classList.add('btn-copy');
                }, 500)
            })
            .catch(err => {
                console.error('Error copying message to clipboard: ', err);
            });
    });

    // CREATING A CLEAR MESSAGE BUTTON
    const btnClearCreate = '<button class="btn-clear" id="btn-clear">BORRAR</button>';
    message.insertAdjacentHTML('beforebegin', btnClearCreate);

    const btnClear = document.getElementById('btn-clear')

    btnClear.addEventListener('click', () => { message.innerHTML = '' });
});


function applyDiscount(originalPrice) {

    const price = Number(originalPrice)

    const discount = price * 0.10;

    const discountedPrice = price - discount;

    return discountedPrice;

}