import axios from 'axios';
import CatBreed from './backup/catbreed.json'
// limited to 100 requests per day, so have multiple keys to bypass the limit requests if limit is reached, just in case

export default async function handler(req, res) {
   try {
      let { data } = await axios({
         method: 'GET',
         url: 'https://catbreeddb.p.rapidapi.com/',
         headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
         },
      })
      const results = data;
      res.status(200).json(results);
   }
   catch {
      try {
         let { data } = await axios({
            method: 'GET',
            url: 'https://catbreeddb.p.rapidapi.com/',
            headers: {
               'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY_BACKUP,
               'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
            },
         })
         const results = data;
         res.status(200).json(results);
      }
      catch {
         try {
            let { data } = await axios({
               method: 'GET',
               url: 'https://catbreeddb.p.rapidapi.com/',
               headers: {
                  'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY_SECOND_BACKUP,
                  'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
               },
            })
            const results = data;
            res.status(200).json(results);
         }
         catch (error) {
            try {
               let { data } = await axios({
                  method: 'GET',
                  url: 'https://catbreeddb.p.rapidapi.com/',
                  headers: {
                     'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY_THIRD_BACKUP,
                     'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
                  },
               })
               const results = data;
               res.status(200).json(results);
            }
            catch (error) {
               res.status(200).json(CatBreed)
            }
         }
      }
   }
}
