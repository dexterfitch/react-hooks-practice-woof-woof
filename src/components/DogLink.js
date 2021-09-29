function DogLink({name, setSelectedDogState, allFetchedDogs}) {

    const handleClick = (event) => {
        let selectedDogName = event.target.innerText
        setSelectedDogState(allFetchedDogs.filter(dog => dog.name === selectedDogName)[0])
    }

    return(
        <span onClick={handleClick}>{name}</span>
    )
}

export default DogLink;