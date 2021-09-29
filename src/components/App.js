import React, {useState, useEffect} from "react";
import DogBar from "./DogBar"

function App() {

  const [fetchedDogs, setFetchedDogs] = useState([])
  const [selectedDog, setSelectedDog] = useState("")
  // KEEP TRACK OF ARRAY OF GOOD DOGS, AND HAVE SETTER FOR GOOD DOGS
  const [goodDogFilter, setGoodDogFilter] = useState("off")
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then(response => response.json())
    .then(json => setFetchedDogs(json))
  }, [clicked])

  const updateDogGoodnessStatus = (event) => {
    let clickedDogName = event.target.parentElement.children[1].innerText
    let clickedDogObject = fetchedDogs.filter(dog => {
      return dog.name === clickedDogName
    })[0];
    let removedClickedDog = fetchedDogs.filter(dog => {
      return dog.name !== clickedDogName
    })
    clickedDogObject = {...clickedDogObject, isGoodDog: !clickedDogObject.isGoodDog}
    removedClickedDog.push(clickedDogObject)
    setFetchedDogs(removedClickedDog)
    if (event.target.innerText === "Good Dog!") {
      event.target.innerText = "Bad Dog!"
    } else {
      event.target.innerText = "Good Dog!"
    }
  }

  const renderDogDetails = () => {
    if (!!selectedDog) {
      return(
          <>
            <img src={selectedDog.image} alt={selectedDog.name}/>
            <h2>{selectedDog.name}</h2>
            <button onClick={updateDogGoodnessStatus}>{selectedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
          </>
      )
    }
  }

  const filterGoodDogs = () => {
    if (goodDogFilter === "off") {
      setGoodDogFilter("on")
      setFetchedDogs(fetchedDogs.filter(dog => {
        return dog.isGoodDog
      }));
    } else {
      setClicked(clicked === true ? false : true)
      setGoodDogFilter("off")
    }
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={filterGoodDogs} id="good-dog-filter">Filter good dogs: {goodDogFilter.toUpperCase()}</button>
      </div>
      <div id="dog-bar">
        <DogBar arrayOfFetchedDogs={fetchedDogs} updateSelectedDogState={setSelectedDog}/>
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {renderDogDetails()}
        </div>
      </div>
    </div>
  );
}

export default App;
