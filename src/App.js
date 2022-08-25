import { useEffect,useState } from 'react'

const width = 8
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]


const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState()
  
  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      // checking if each of the colors are the same as the first square
      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      // checking if each of the colors are the same as the first square
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

      if (notValid.includes(i)) continue
      // checking if each of the colors are the same as the first square
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

      if (notValid.includes(i)) continue
      // checking if each of the colors are the same as the first square
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  
  // Function to move squares down
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      if ((currentColorArrangement[i] + width) === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i]
      }
    }
  }


  // Function expression to create the gameboard with 64 random colors from the candyColors array
  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForColumnOfFour()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 1000)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour,checkForColumnOfThree,checkForRowOfFour,checkForRowOfThree,moveIntoSquareBelow,currentColorArrangement])

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img key={index} style={{backgroundColor: candyColor}} alt={candyColor}>

          </img>
        ))}
      </div>
    </div>
  );
}

export default App;
