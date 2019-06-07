const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//var messageThree = document.getElementById('message-3')
var tbody = document.getElementById('message-3');
var table = document.getElementById('table');
table.style.display = "none";
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    tbody.innerHTML = "";
    table.style.display = "none";
    const location = search.value

    messageOne.textContent = 'Loading ....'
    messageTwo.textContent = ''

    fetch('/explore?address='+location).then((response)=>{
    response.json().then((data) => {

        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            table.style.display = 'block';
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            var poi = data.pointOfInterest;
            for(var i= 0 ; i < poi.length ; i++){
                var tr = document.createElement('tr');
                var title = document.createTextNode(poi[i].title);
                var address = document.createTextNode(poi[i].address);
                var rate = document.createTextNode(poi[i].rating);
                var td1 = document.createElement('td');
                td1.appendChild(title);
                var td2 = document.createElement('td');
                td2.appendChild(address);
                var td3 = document.createElement('td');
                td3.appendChild(rate);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tbody.appendChild(tr);
            }
            
        }

    })
})

})