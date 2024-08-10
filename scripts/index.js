function openNotifPane() {
    document.getElementById("notifPane").style.display = "flex";
}

let url = "http://127.0.0.1:3069/devices"
function closeNotifPane() {
    document.getElementById("notifPane").style.display = "none";
}

function notifier(){
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            data.forEach(device => {
                if(device.status === "low_power"){
                    if(document.getElementById("notifications").innerHTML.includes("No Notifications")){
                        document.getElementById("notifications").innerHTML = "";
                    }
                    if(document.getElementById("notifications").innerHTML.includes(`Low Power in ${device.name}`)) return;
                    document.getElementById("notifications").innerHTML += `
                    <div class="notification">
                    <div class="notificationText">
                    <h1>Low Power</h1>
                    <p>Low Power in ${device.name}</p>
                    </div>
                    </div>
                    `;
                }
                if(device.status === "low_energy"){
                    if(document.getElementById("notifications").innerHTML.includes("No Notifications")){
                        document.getElementById("notifications").innerHTML = "";
                    }
                    if(document.getElementById("notifications").innerHTML.includes(`Low Energy in ${device.name}`)) return;
                    document.getElementById("notifications").innerHTML += `
                    <div class="notification">
                    <div class="notificationText">
                    <h1>Low Energy</h1>
                    <p>Low Energy in ${device.name}</p>
                    </div>
                    </div>
                    `;
                }
                if(device.status === "offline"){
                    if(document.getElementById("notifications").innerHTML.includes("No Notifications")){
                        document.getElementById("notifications").innerHTML = "";
                    }
                    if(document.getElementById("notifications").innerHTML.includes(`${device.name} is offline`)) return;
                    document.getElementById("notifications").innerHTML += `
                    <div class="notification">
                    <div class="notificationText">
                    <h1>Device Offline</h1>
                    <p>${device.name} is offline</p>
                    </div>
                    </div>
                    `;
                }
            })
        }
    ).catch(
        error => console.log(error)
    )
}

setInterval(notifier, 5000);

function load() {
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            console.log(data)
            document.getElementById("totalDevices").innerHTML = data.length;
            document.getElementById("onlineDevices").innerHTML = data.filter(device => device.status === "ok").length;
            document.getElementById("offlineDevices").innerHTML = data.filter(device => device.status !== "ok").length;
            let notOkDevicesList = []
            data.forEach(device => {
                let statusText = device.status.split("_")
                statusText = statusText.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                if(statusText === "Ok") statusText = "Online";
                document.getElementById("deviceList").innerHTML += `
                    <div class="deviceDiv clickable">
                    <div class="deviceIcon">
                    <img class="icon" src="./assets/placeholderDeviceIcon.svg">
                    <div class="greySeparator"></div>
                    <div class="deviceName">${device.name}</div>
                    <div class="greySeparator"></div>
                    <div class="statusIcons" id="statusIcons${device.id}">
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
        })
    })
}
setInterval(updateStatus, 5000)