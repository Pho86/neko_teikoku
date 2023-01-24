/**
 * @desc selectRandomFromArray(), selects a random value from an array of values
 * @param {*} array takes in an array
 * @returns a random value from the array
 */
export function selectRandomFromArray(array) {
   let randomValue = array[Math.floor(Math.random() * array.length)]
   return randomValue
}


/**
 * @desc generates a random number between the 2 parameters  
 * @param {*} min integer, lowest value
 * @param {*} max integer, highest value
 * @returns a random integer
 */
export function generateRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}