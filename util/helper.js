/**
 * @desc selectRandomFromArray(), selects a random value from an array of values
 * @param {*} array takes in an array
 * @returns a random value from the array
 */
export function selectRandomFromArray(array) {
   let randomValue = array[Math.floor(Math.random() * array.length)]
   return randomValue
}