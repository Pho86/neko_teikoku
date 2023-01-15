import axios from 'axios';

export default async function handler(req, res) {
   const { data } = await axios({
      method: 'GET',
      url: 'https://cat-breeds.p.rapidapi.com/cat_breeds',
      headers: {
         'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
         'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
      },
   })
   const results = data;

   res.status(200).json(results);
}