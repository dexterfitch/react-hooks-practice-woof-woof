import DogLink from "./DogLink"

function DogBar({arrayOfFetchedDogs, updateSelectedDogState}) {

    const dogLinkFactory = () => {
        return arrayOfFetchedDogs.map(dog => {
            return (
                <DogLink key={dog.id} name={dog.name} setSelectedDogState={updateSelectedDogState} allFetchedDogs={arrayOfFetchedDogs}/>
            )
        })
    }

    return (
        <>
            {dogLinkFactory()}
        </>
    )
}

export default DogBar;