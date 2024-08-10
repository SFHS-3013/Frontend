const urlParams = new URLSearchParams(window.location.search);
let deviceID = urlParams.get('device');

let url = "http://127.0.0.1:3069/devices"
function load(){
fetch(url).then(
    response => response.json()
).then(
    data => {
        data.forEach(device => {
            if(device.id === deviceID){
                let deviceTypeString = device.type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                let statusText = device.status.split("_")
                statusText = statusText.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                if(statusText === "Ok") statusText = "Online";
                if(device.type === "street_light"){
                    document.getElementById("overviewIcon").src = "./assets/" + device.type + ".svg";
                    document.getElementById("deviceName").innerHTML = device.name;
                    document.getElementById("deviceStatus").innerHTML = statusText;
                    document.getElementById("devicePowerUsage").innerHTML = device.power_usage + "%";
                    document.getElementById("uniqueFieldHeading").innerHTML = "<strong>Lamp Count</strong>";
                    document.getElementById("deviceId").innerHTML = device.lamp_count;
                    document.getElementById("uniqueFieldHeading2").innerHTML = "<strong>Power Usage</strong>";
                    document.getElementById("deviceType").innerHTML = deviceTypeString;
                    document.getElementById("deviceLocation").innerHTML = device.location;
                    
                }
                if(device.type === "battery"){
                    document.getElementById("overviewIcon").src = "./assets/" + device.type + ".svg";
                    document.getElementById("deviceName").innerHTML = device.name;
                    document.getElementById("deviceStatus").innerHTML = statusText;
                    document.getElementById("devicePowerUsage").innerHTML = device.charge_level + "%";
                    document.getElementById("uniqueFieldHeading").innerHTML = "<strong>Capacity</strong>";
                    document.getElementById("deviceId").innerHTML = 1000;
                    document.getElementById("uniqueFieldHeading2").innerHTML = "<strong>Charge Level</strong>";
                    document.getElementById("deviceType").innerHTML = deviceTypeString;
                    document.getElementById("deviceLocation").innerHTML = device.location;
                    
                }

                if(device.type === "solar"){
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
                if(device.type === "wind"){
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
                if(device.type === "hydro"){
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

function openai(){
    document.getElementById("suggestions").style.display = "flex";
    fetch("http://127.0.0.1:3069/suggestions", 
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