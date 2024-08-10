let url = "http://127.0.0.1:3069/auditlog"
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'auth': 'real'
  }
}).then(response => response.json())
  .then(data => {
    data.forEach(log => {
        document.getElementById('auditLog').innerHTML += `
            <div class="log">
            <div class="user">
            <img src="./assets/profileIcon-Dark.svg">
            ${log.user}</div>
            <div class="action"><p>${log.action}</p><p>${log.details}</p></div>
            <div class="time">${log.time}</div>
            </div>
        `;
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });