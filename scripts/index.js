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
                if(device.status !== "ok"){
                    if(document.getElementById("notifications").innerHTML.includes("No Notifications")){
                        document.getElementById("notifications").innerHTML = "";
                    }
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

setInterval(notifier(), 5000);

function load() {
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            console.log(data)
            document.getElementById("totalDevices").innerHTML = data.length;
            document.getElementById("onlineDevices").innerHTML = data.filter(device => device.status === "ok").length;
            document.getElementById("offlineDevices").innerHTML = data.filter(device => device.status !== "ok").length;
            data.forEach(device => {
                document.getElementById("deviceList").innerHTML += `
                    <div class="deviceDiv clickable">
                    <div class="deviceIcon">
                    <img class="icon" src="./assets/placeholderDeviceIcon.svg">
                    <div class="deviceName">${device.name}</div>
                    <div class="greySeparator"></div>
                    <div class="deviceStatus"><img src="./assets/${device.status = "ok" ? "online" : "offline"}Dot.svg">${device.status = "ok" ? "Online" : "Offline"}</div>
                    </div>
                    <div class="deviceActions">
                    <div class="deviceAction restart clickable">
                    <img class="icon" src="./assets/restartIcon.svg">
                    </div>
                    <div class="deviceAction moreInfo clickable">
                    <img class="icon" src="./assets/moreInfoIcon.svg">
                    </div>
                    </div>
                    </div>`
            })
            document.getElementById("loading").style.display = "none";
        }
    ).catch(
        error => console.log(error)
    )
}
load()