fetch(url + '/auditlog', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'auth': 'SFHS3013'
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
    document.getElementById('loading').style.display = 'none';
  })
  .catch((error) => {
    console.error('Error:', error);
  });