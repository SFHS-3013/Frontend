function openNotifPane() {
    document.getElementById("notifPane").style.display = "flex";
}
function closeNotifPane() {
    document.getElementById("notifPane").style.display = "none";
}
let audio = new Audio("./assets/notificationSound.mp3");
function notifier(){
    fetch(url + '/devices').then(
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
                    <div class='upper'>
                    <h1>Low Power</h1><div class="close clickable" onclick="this.parentElement.parentElement.parentElement.style.display='none'">X</div>
                    </div>
                    <p>Low Power in ${device.name}</p>
                    </div>
                    </div>
                    `;
                    audio.play();
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
                    audio.play();
                }
                if(device.status === "off"){
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
                    audio.play();
                }
            })
        }
    ).catch(
        error => console.log(error)
    )
}

setInterval(notifier, 5000);