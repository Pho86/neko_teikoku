import axios from 'axios';

export default async function handler(req, res) {
   const { data } = await axios({
      method: 'GET',
      url: 'https://daily-cat-facts.p.rapidapi.com/facts/random',
      params: {amount: '1'},
      headers: {
         'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
         'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST_CAT_FACTS,
      },
   })
   const results = data;

   res.status(200).json(results);
}