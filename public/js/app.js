//console.log('Client side app');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMsg = document.querySelector('#errorMsg')
const weatherMsg = document.querySelector('#weatherMsg')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const forecast = (location) => {
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            errorMsg.textContent = ''
            weatherMsg.textContent = ''
            if (data.error) {
                errorMsg.textContent = data.error
                return console.log(data.error);
            }
            weatherMsg.textContent = data.location + ', Weather Forecast: ' + data.forecast
            return console.log(data.location + ', Weather Forecast: ' + data.forecast)
        })
    })
}


//errorMsg.textContent = 'From Java Script'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    errorMsg.textContent = 'Loading...'
    weatherMsg.textContent = ''
    forecast(location)
})