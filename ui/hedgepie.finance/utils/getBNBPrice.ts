import axios from 'axios'
export const getBNBPrice = async () => {
  try {
    const res = await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDC')
    if (res?.data?.price) {
      return Number(res.data.price)
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
}
