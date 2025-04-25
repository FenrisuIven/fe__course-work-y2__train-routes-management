import Axios from 'axios';

Axios.get("http://localhost:3000").then((response) => {
  console.log({response});
}).catch(() => {
})

const DisplayTable = () => {
  return <></>
}

export {DisplayTable}