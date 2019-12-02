import axios from 'axios'

const baseURl = process.env.REACT_APP_BASE_URL

async function getMapData(lat, lng) {
    try {
        console.log("entro al mapsClusterService")
            const response = await axios({
            url : `localhost:3003/stamp/sniffer`,
            method : 'POST',
            data : {
                "distance":300000,
                "latitude":lat, 
                "longitude":lng,
                "promotions" : true,
                "events" : true
                }
            })
        
        return response
    } catch (e) {
        console.log(e)
    }
}

export { getMapData }