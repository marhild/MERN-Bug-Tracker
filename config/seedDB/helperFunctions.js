exports.pickMultipleRandomElements = (array, size) => {
  if (array.length < size) {
    size = array.length
  }
  const shuffled = array.sort(() => 0.5 - Math.random())
  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, size)
  return selected
}

exports.waitForSeeder = (t, val) =>{
  return new Promise(function(resolve) {
      setTimeout(function() {
          resolve(val);
      }, t);
  });
}