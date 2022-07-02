import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    console.log('hooks name params', name)
    async function fetchData(name) {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      )
      const datas = await response.json()
      const data = datas[0]
      // console.log(data)
      setCountry(data)
    }
    fetchData(name)
  }, [name])

  return country
}
