console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

// msg1.textContent = 'From JavaScript with Love'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    msg1.textContent = ''
    msg2.textContent = 'Loading'
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if(data.error){
                msg2.textContent = data.error
                // console.log(data.error)
            }else{
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
    
})