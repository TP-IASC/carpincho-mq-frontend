const randomDate = () => {
  const current = new Date().getTime()
  return new Date(current + Math.random() * (current + 2*60*60*1000 - current));
}

const randomPayload = () => {
  const size = Math.floor(Math.random() * 100)
  return Math.random().toString(16).substr(2, size);
}

const randomMessage = async () => {
  const payload = randomPayload();
  const timeStamp = randomDate();
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder("utf-8").encode(payload + timeStamp.toString()));
  const array = Array.from(new Uint8Array(buffer));
  const id = array.map(b => b.toString(16).padStart(2, '0')).join('').substr(0, 16);
  return {
    id,
    payload,
    timeStamp
  }
}


const randomElement = async () => {
  return {
    message: await randomMessage(),
    consumers_that_did_not_ack: []
  }
}


const randomElements = async () => {
  const size = Math.floor(Math.random() * 10)
  return await Promise.all(Array.from(Array(size)).map(async _ => await randomElement()));
}


const randomQueue = async name => {
  return {
    name,
    subscribers: [],
    elements: await randomElements()
  }
}


export default randomQueue