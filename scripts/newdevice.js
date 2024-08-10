function addCustomParam() {
    const customParamsDiv = document.getElementById('customParams');
    const newParamDiv = document.createElement('div');
    newParamDiv.classList.add('customParam');
    newParamDiv.innerHTML = `
        <label for="paramName">Property Name:</label>
        <input type="text" class="paramName" name="paramName"><br>
        <label for="paramValue">Property Value:</label>
        <input type="text" class="paramValue" name="paramValue"><br>
    `;
    customParamsDiv.appendChild(newParamDiv);
}

function submitForm() {
    const form = document.getElementById('deviceForm');
    const formData = new FormData(form);
    const jsonData = {
        user: '',
        auth: '',
        device: {}
    };

    formData.forEach((value, key) => {
        if (key === 'username') {
            jsonData.user = value;
        } else if (key === 'auth') {
            jsonData.auth = value;
        } else if (key !== 'paramName' && key !== 'paramValue') {
            jsonData.device[key] = value;
        }
    });

    const customParams = document.querySelectorAll('.customParam');
    customParams.forEach(param => {
        const paramName = param.querySelector('.paramName').value;
        const paramValue = param.querySelector('.paramValue').value;
        if (paramName && paramValue) {
            jsonData.device[paramName] = paramValue;
        }
    });
    console.log(jsonData);
    fetch('http://127.0.0.1:3069/newdevice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}