let url = "http://127.0.0.1:3069/devices"
function load() {
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            document.getElementById("totalDevices").innerHTML = data.length;
            document.getElementById("onlineDevices").innerHTML = data.filter(device => device.status !== "off").length;
            document.getElementById("offlineDevices").innerHTML = data.filter(device => device.status === "off").length;
            let notOkDevicesList = []
            data.forEach(device => {
                let statusText = device.status.split("_")
                statusText = statusText.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                if(statusText === "Ok") statusText = "Online";
                if(statusText === "Off") statusText = "Offline";
                document.getElementById("deviceList").innerHTML += `
                    <div class="deviceDiv clickable" onclick="window.location.href = './device.html?device=${device.id}'">
                    <div class="deviceIcon">
                    <img class="icon" src="./assets/placeholderDeviceIcon.svg">
                    <div class="greySeparator"></div>
                    <div class="deviceName">${device.name}</div>
                    <div class="greySeparator"></div>
                    <div class="statusIcons" id="statusIcons${device.id}">
                    <div class="deviceStatus">
                    <img src="./assets/${device.status}Dot.svg">${statusText}
                    </div>
                    ${device.charge_level && device.status !== "off" ? `
                    <div class="battery">
                    <img src="./assets/batteryIcon.svg">
                    <div class="batteryLevel">&nbsp;&nbsp;${device.charge_level.toString().split(".")[0]}%</div>
                    </div>
                    ` : ""}
                    ${device.power_production && device.status !== "off" ? `
                    <div class="battery">
                    <img src="./assets/powerIcon.svg">
                    <div class="batteryLevel">&nbsp;&nbsp;${device.power_production.toString().split(".")[0]}kW</div>
                    </div>
                    ` : ""}
                    ${device.efficiency && device.status !== "off" ? `
                    <div class="battery">
                    <img src="./assets/efficiencyIcon.svg">
                    <div class="batteryLevel">&nbsp;&nbsp;${device.efficiency.toString()}</div>
                    </div>
                    ` : ""}
                    </div>
                    </div>
                    <div class="deviceActions">
                    <div class="greySeparator"></div>
                    <div class="deviceAction restart clickable">
                    <img class="icon" src="./assets/restartIcon.svg">
                    </div>
                    <div class="deviceAction moreInfo clickable">
                    <img class="icon" src="./assets/moreInfoIcon.svg">
                    </div>
                    </div>
                    </div>`
                if(device.status !== "ok"){
                    notOkDevicesList.push(device)
                }
                if(notOkDevicesList.length === 1){
                    document.getElementById("statusText").innerHTML = `${notOkDevicesList[0].name} requires your attention`;
                    document.getElementById("overviewStatusIcon").src = "./assets/offlineDot.svg";
                }
                else if(notOkDevicesList.length > 1){
                    document.getElementById("statusText").innerHTML = `${notOkDevicesList.length} devices require your attention`;
                    document.getElementById("overviewStatusIcon").src = "./assets/offlineDot.svg";
                }
            })
            document.getElementById("loading").style.display = "none";
        }
    ).catch(
        error => console.log(error)
    )
}
load()

function updateStatus(){
    fetch(url).then(
        response => response.json()
    ).then(data => {
        let notOkDevicesList = []
        data.forEach(device => {
            document.getElementById(`statusIcons${device.id}`).innerHTML = "";
            let statusText = device.status.split("_")
            statusText = statusText.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            if(statusText === "Ok") statusText = "Online";
            if(statusText === "Off") statusText = "Offline";
            document.getElementById(`statusIcons${device.id}`).innerHTML += `
                    <div class="deviceStatus">
                    <img src="./assets/${device.status}Dot.svg">${statusText}
                    </div>
                    ${device.charge_level ? `
                    <div class="battery">
                    <img src="./assets/batteryIcon.svg">
                    <div class="batteryLevel">&nbsp;&nbsp;${device.charge_level.toString().split(".")[0]}%</div>
                    </div>
                    ` : ""}
                    ${device.power_production ? `
                    <div class="battery">
                    <img src="./assets/powerIcon.svg">
                    <div class="batteryLevel">&nbsp;&nbsp;${device.power_production.toString().split(".")[0]}kW</div>
                    </div>
                    ` : ""}
                    ${device.efficiency ? `
                    <div class="battery">
                    <img src="./assets/efficiencyIcon.svg">
                    <div class="batteryLevel">&nbsp;&nbsp;${device.efficiency.toString()}</div>
                    </div>
                    ` : ""}
            `
            if(device.status !== "ok"){
                notOkDevicesList.push(device)
            }
            if(notOkDevicesList.length === 1){
                document.getElementById("statusText").innerHTML = `${notOkDevicesList[0].name} requires your attention`;
                document.getElementById("overviewStatusIcon").src = "./assets/offlineDot.svg";
            }
            else if(notOkDevicesList.length > 1){
                document.getElementById("statusText").innerHTML = `${notOkDevicesList.length} devices require your attention`;
                document.getElementById("overviewStatusIcon").src = "./assets/offlineDot.svg";
            }
            else{
                document.getElementById("statusText").innerHTML = "Everything Operational";
                document.getElementById("overviewStatusIcon").src = "./assets/okDot.svg";
            }
            document.getElementById("totalDevices").innerHTML = data.length;
            document.getElementById("onlineDevices").innerHTML = data.filter(device => device.status !== "off").length;
            document.getElementById("offlineDevices").innerHTML = data.filter(device => device.status === "off").length;
        })
    })
}
setInterval(updateStatus, 5000)