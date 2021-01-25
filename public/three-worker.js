importScripts('three.js')
// Example POST method implementation:
async function getData(url) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  })
  return response.json() // parses JSON response into native JavaScript objects
}

async function allUrls(){
  let dataA = []
  for (let i=1;i<30;i++){
    d = await getData(`cube${i}.json`)
    dataA.push(d)
  }
  return dataA
}



onmessage = (e) => {
  console.log('Message received from main script', e)
  allUrls().then(d=>{
    let j = 1
    let final = []
    for (let data of d){
      final.push({j, data})
      j++
    }
    postMessage(final)
  })
}
