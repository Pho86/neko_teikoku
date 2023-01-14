import axios from 'axios';

export default async function handler(req, res) {
   const { data } = await axios({
      method: 'GET',
      url: 'https://animals-by-api-ninjas.p.rapidapi.com/v1/animals',
      headers: {
         'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
         'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
      },
      params: { name: 'cat' },
   })
   const results = data;

   res.status(200).json(results);
}