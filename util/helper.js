export function selectRandomFromArray(array) {
   let randomValue = array[Math.floor(Math.random() * array.length)]
   return randomValue
}