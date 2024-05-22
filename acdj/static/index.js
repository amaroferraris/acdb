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

        brandContainer.textContent = '';
        modelContainer.textContent = '';
        message.textContent = '';

        displayBrands();

    });
})


// DISPLAY BRANDS
function displayBrands() {

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

    accessoryContainer.textContent = '';
    message.textContent = '';

    const checkedSucursal = document.querySelector('input[type="radio"]:checked');

    jsonCarAccessory.forEach(accessory => {

        const inputAccessory = document.createElement('input');
        inputAccessory.type = 'checkbox';
        inputAccessory.id = `accessory-${accessory.id}`;
        inputAccessory.name = 'accessory';
        inputAccessory.value = accessory.name;

        const labelAccessory = document.createElement('label');
        labelAccessory.htmlFor = `accessory-${accessory.id}`;
        labelAccessory.textContent = `${accessory.name} - $ ${accessory.price.toFixed(2)}`;

        if (accessory.model_id == model.id) {

            const sucursalName = checkedSucursal.value;
            const pattern = new RegExp('.*EXCEPTO.*' + sucursalName, 'i')

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

            checkedAccesoriesName.push(checkbox.value.split(' (')[0]);
            checkedAccesoriesPrice.push(jsonCarAccessory.filter(item => item.id == checkbox.id.split('-')[1] && item.model_id == checkedModelId)[0].price)

        }
    })

    console.log(checkedAccesoriesPrice)


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
        futureDate.setDate(futureDate.getDate() + 1); // Add 1 day to skip Monday
    }

    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dayName = days[futureDate.getDay()];
    const dayNumber = futureDate.getDate();
    const month = futureDate.getMonth() + 1; // Note: January is month 0, so we add 1

    const formattedFutureDate = `${dayName} ${dayNumber < 10 ? '0' + dayNumber : dayNumber}/${month < 10 ? '0' + month : month}`;

    message.innerHTML = '';
    message.innerHTML = `Queda confirmada la colocación de accesorios, te envío el detalle de tu compra:\n
<ul>${accesoryNameAndPrice}</ul>
- Total a abonar: $${checkedAccesoriesPrice.reduce((acc, currVal) => acc + currVal, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
\nEl monto de tu orden se congela por 48hs hábiles y podés abonar hasta el ${formattedFutureDate} inclusive.`;

    // CHECKING IF A COPY BUTTON ALREADY EXISTS
    const btnGenerateNextElement = btn.nextElementSibling;
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
    const btnCopyCreate = '<button class="btn-copy" id="btn-copy">COPY MESSAGE</button>';
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
    const btnClearCreate = '<button class="btn-clear" id="btn-clear">CLEAR MESSAGE</button>';
    message.insertAdjacentHTML('beforebegin', btnClearCreate);

    const btnClear = document.getElementById('btn-clear')

    btnClear.addEventListener('click', () => { message.innerHTML = '' });
});