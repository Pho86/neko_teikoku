import axios from 'axios';

export default async function handler(req, res) {
    const query = req.query;
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY
    const { location, units, language, } = query;
    const { data } = await axios({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${language}`
    })
    const results = data;

    res.status(200).json(results);
}