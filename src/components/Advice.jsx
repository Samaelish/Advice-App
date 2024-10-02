import { useEffect, useState } from 'react'
import './Advice.css'

const Advice = () => {
  const [currentAdvice, setCurrentAdvice] = useState('Loading...')
  const [nextAdvice, setNextAdvice] = useState('')
  const [prevAdvice, setPrevAdvice] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const adviceUrl = 'https://api.adviceslip.com/advice'

  useEffect(() => {
    fetchAdvice(adviceUrl)
  }, [])

  const fetchAdvice = async endpoint => {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        setErrorMessage('Error in response')
        return
      }

      const data = await response.json()
      setCurrentAdvice(data.slip.advice)
      setErrorMessage('')
    } catch (error) {
      console.error(error)
      setErrorMessage('Error in connection. Try again later.')
    }
  }

  const handlePrevAdvice = () => {
    setNextAdvice(currentAdvice)
    setCurrentAdvice(prevAdvice)
    setPrevAdvice('')
  }

  const handleNextAdvice = () => {
    setPrevAdvice(currentAdvice)
    if (nextAdvice) {
      setCurrentAdvice(nextAdvice)
      setNextAdvice('')
    } else {
      fetchAdvice(adviceUrl)
    }
  }

  return (
    <div className='advice'>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      <p className='advice-text'>{currentAdvice}</p>
      <button onClick={handlePrevAdvice} disabled={!prevAdvice}>
        Prev Advice
      </button>
      <button onClick={handleNextAdvice}>Next Advice</button>
    </div>
  )
}

export default Advice
