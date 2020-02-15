const key = 'RNEwdTfW4xbpSRHieT6rxRSxNR5guyAq'

// GEt city info  
const getCity = async (city) => { 
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`; 
  const response = await fetch(`${base}${query}`);
  const data = await response.json();
  return data[0];
}


// Get whether info with using citycode  
const getWhether = async (citycode) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${citycode}?apikey=${key}`; 
  const response = await fetch(base+query);
  const whetherInfo = await response.json();

  // console.log(whetherInfo);
  return whetherInfo[0];
  
};
 

