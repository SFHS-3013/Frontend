const urlParams = new URLSearchParams(window.location.search);
let deviceID = urlParams.get('device');
let loadedData;
function load() {
    fetch(url + '/devices').then(
        response => response.json()
    ).then(
        data => {
            loadedData = data;
            data.forEach(device => {
                if (device.id === deviceID) {
                    let deviceTypeString = device.type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                    let statusText = device.status.split("_")
                    statusText = statusText.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                    if (statusText === "Ok") statusText = "Online";
                    document.getElementById("toggleButton").innerHTML = device.status !== "off" ? "Turn Off" : "Turn On";
                    if (device.type === "street_light") {
                        document.getElementById("overviewIcon").src = "./assets/" + device.type + ".svg";
                        document.getElementById("deviceName").innerHTML = device.name;
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("devicePowerUsage").innerHTML = device.power_usage + "W";
                        document.getElementById("uniqueFieldHeading").innerHTML = "<strong>Lamp Count</strong>";
                        document.getElementById("deviceId").innerHTML = device.lamp_count;
                        document.getElementById("uniqueFieldHeading2").innerHTML = "<strong>Power Usage</strong>";
                        document.getElementById("deviceType").innerHTML = deviceTypeString;
                        document.getElementById("deviceLocation").innerHTML = device.location;

                    }
                    if (device.type === "battery") {
                        document.getElementById("overviewIcon").src = "./assets/" + device.type + ".svg";
                        document.getElementById("deviceName").innerHTML = device.name;
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("devicePowerUsage").innerHTML = device.charge_level + "%";
                        document.getElementById("uniqueFieldHeading").innerHTML = "<strong>Capacity</strong>";
                        document.getElementById("deviceId").innerHTML = device.capacity + "kWh";
                        document.getElementById("uniqueFieldHeading2").innerHTML = "<strong>Charge Level</strong>";
                        document.getElementById("deviceType").innerHTML = deviceTypeString;
                        document.getElementById("deviceLocation").innerHTML = device.location;

                    }

                    if (device.type === "solar") {
                        document.getElementById("overviewIcon").src = "./assets/" + device.type + ".svg";
                        document.getElementById("deviceName").innerHTML = device.name;
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("uniqueFieldHeading").innerHTML = "<strong>Power Production</strong>";
                        document.getElementById("deviceId").innerHTML = device.power_production + "kW";
                        document.getElementById("uniqueFieldHeading2").innerHTML = "<strong>Efficiency</strong>";
                        document.getElementById("devicePowerUsage").innerHTML = device.efficiency;
                        document.getElementById("deviceType").innerHTML = deviceTypeString;
                        document.getElementById("deviceLocation").innerHTML = device.location;

                    }
                    if (device.type === "wind") {
                        document.getElementById("overviewIcon").src = "./assets/" + device.type + ".svg";
                        document.getElementById("deviceName").innerHTML = device.name;
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("uniqueFieldHeading").innerHTML = "<strong>Power Production</strong>";
                        document.getElementById("deviceId").innerHTML = device.power_production + "kW";
                        document.getElementById("uniqueFieldHeading2").innerHTML = "<strong>Turbine Height</strong>";
                        document.getElementById("devicePowerUsage").innerHTML = device.turbine_height + "m";
                        document.getElementById("deviceType").innerHTML = deviceTypeString;
                        document.getElementById("deviceLocation").innerHTML = device.location;
                    }
                    if (device.type === "hydro") {
                        document.getElementById("overviewIcon").src = "./assets/" + device.type + ".svg";
                        document.getElementById("deviceName").innerHTML = device.name;
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("uniqueFieldHeading").innerHTML = "<strong>Power Production</strong>";
                        document.getElementById("deviceId").innerHTML = device.power_production + "kW";
                        document.getElementById("uniqueFieldHeading2").innerHTML = "<strong>Water Flow</strong>";
                        document.getElementById("devicePowerUsage").innerHTML = device.water_flow + "m";
                        document.getElementById("deviceType").innerHTML = deviceTypeString;
                        document.getElementById("deviceLocation").innerHTML = device.location;
                    }
                }
            })
            document.getElementById("loading").style.display = "none";
        }
    ).catch(
        err => console.log(err)
    )
}
load()

function openai() {
    document.getElementById("suggestions").style.display = "flex";
    fetch(url + '/suggestions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": deviceID
            })
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                document.getElementById("suggestions").style.flexDirection = "column";
                document.getElementById("suggestions").innerHTML = data.message;
            }
        ).catch(
            err => console.log(err)
        )
}

function update() {
    fetch(url + '/devices').then(
        response => response.json()
    ).then(
        data => {

            loadedData = data;
            data.forEach(device => {

                if (device.id === deviceID) {
                    document.getElementById("toggleButton").innerHTML = device.status !== "off" ? "Turn Off" : "Turn On";
                    let statusText = device.status.split("_")
                    statusText = statusText.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                    if (statusText === "Ok") statusText = "Online";
                    if (device.type === "street_light") {
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("devicePowerUsage").innerHTML = device.power_usage + "W";
                    }
                    if (device.type === "battery") {
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("devicePowerUsage").innerHTML = device.charge_level + "%";
                    }
                    if (device.type === "solar") {
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("devicePowerUsage").innerHTML = device.efficiency;
                        document.getElementById("deviceId").innerHTML = device.power_production + "kW";
                    }
                    if (device.type === "wind") {
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("deviceId").innerHTML = device.power_production + "kW";
                    }
                    if (device.type === "hydro") {
                        document.getElementById("deviceStatus").innerHTML = statusText;
                        document.getElementById("deviceId").innerHTML = device.power_production + "kW";
                        document.getElementById("devicePowerUsage").innerHTML = device.water_flow + "m";
                    }
                }
            })
        }
    ).catch(
        err => console.log(err)
    )
}

setInterval(update, 5000)

function toggle() {
    let device = loadedData.find(device => device.id === deviceID);
    fetch(url + '/setdevicestatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": "user",
            "auth": "SFHS3013",
            "deviceID": deviceID,
            "status": device.status !== "off" ? "off" : "ok"
        })
    }).then(res=> res.json()).then(data => {
        update();
    })
}
