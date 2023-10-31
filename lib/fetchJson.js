export default async function fetchJson(...args) {
    try {
      const response = await fetch(...args)

      if (response.status !== 200) {
        throw new Error(response.status)
      }
  
      // if the server replies, there's always some data in json
      // if there's a network error, it will throw at the previous line
      const data = await response.json()  
      if (data.ok) {
        return data.data
      }

      if (data.err) {
        const error = new Error(data.reason)
        error.data = data
        throw error  
      }
  
      return data
    } 
    catch (error) {
      if (!error.data) {
        error.data = { message: error.message }
      }
      throw error
    }
}