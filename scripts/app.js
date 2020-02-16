const cityForm = document.querySelector('form');  
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
 



cityForm.addEventListener('submit', (event)=> {
  // Prevent default action (to avoid refreshing page)
  event.preventDefault();

  // Get city
  const cityName = cityForm.city.value.trim();
  cityForm.reset();

  // Update ui with city Info 
  updateCity(cityName)
    .then((data) => {
      updateUI(data);
    }).catch((error) => {
      console.log(error);
    })
 
})




const updateCity = async (cityName) => { 
  const cityDets = await getCity(cityName);
  const whetherInfo = await getWhether(cityDets.Key);
 
  return { cityDets: cityDets, whetherInfo: whetherInfo }
  
}


const updateUI = (data) => {

  const { cityDets, whetherInfo } = data;
 
  // Update details 
  details.innerHTML =  `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${whetherInfo.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${whetherInfo.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;


  // Day or night
  let timeSrc = null;
  if(whetherInfo.IsDayTime) {
    timeSrc = './images/day.svg'
  } else {
    timeSrc = './images/night.svg'
  }
  time.setAttribute('src',timeSrc);

  // Icon
  const iconSrc = `./images/icons/${whetherInfo.WeatherIcon}.svg`;
  icon.setAttribute('src',iconSrc);


  // Remove d-none class
  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  } 
  

  setTimeout(closeUI, 60000);
}

function closeUI() { 
  card.style.display = "none";
}