import axios from 'axios'

const baseURl = process.env.REACT_APP_BASE_URL

async function getMapData(lat, lng) {
    try {
            // const response = await axios({
            // url : `localhost:3003/stamp/sniffer`,
            // method : 'POST',
            // data : {
            //     "distance":300000,
            //     "latitude":lat, 
            //     "longitude":lng,
            //     "promotions" : true,
            //     "events" : true
            //     }
            // })
            const response = await axios.get('https://raw.githubusercontent.com/ivansabik/ubicajeros-api/master/cajeros.json');
        console.log("jajajaja :C",response)
        return response
    } catch (e) {
        console.log(e)
    }
}

export { getMapData }