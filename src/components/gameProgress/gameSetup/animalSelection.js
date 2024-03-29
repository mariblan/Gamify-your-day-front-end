import './animalSelection.css';
import { useState, useRef, useEffect } from 'react';
import renderApples from '../../../utils/generateApples';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../../taskContext';
import { toast } from 'react-toastify';

export default function AnimalSelection(index, id) {
  const {
    pets,
    selectedPet,
    setSelectedPet,
    userSettings,
    toastErrorSettings,
  } = useTask();
  let animalContainer = useRef();
  let animalbtn = useRef();
  const [animal, setAnimal] = useState(false);
  const navigate = useNavigate();

  const goToGame = () => {
    if (selectedPet) setTimeout(navigate('../mytasks'), 150);
    if (!selectedPet)
      toast.error('Please select a pet before proceeding', toastErrorSettings);
  };

  const pickPetClick = ({ target, currentTarget }) => {
    for (let i = 1; i < animalContainer.current.children.length; i++) {
      if (currentTarget !== animalContainer.current.children[i])
        animalContainer.current.children[i].className = 'petbtn';
    }
    currentTarget.className === 'petbtn'
      ? (currentTarget.className = 'petbtnactive')
      : (currentTarget.className = 'petbtn');
    pets.forEach((pet) => {
      if (pet.name === target.name) {
        setSelectedPet(pet);
      }
      return selectedPet;
    });
  };

  useEffect(() => {
    if (selectedPet) {
      let animal = document.getElementById(selectedPet.btn);
      if (animal.className === 'petbtn') {
        animal.className = 'petbtnactive';
      }
    }
  }, []);

  const navigateToTasks = () => setTimeout(navigate('../alltasks'), 350);

  return (
    <>
      <div className='bodyselection'>
        <button className='menu' type='menu' onClick={navigateToTasks}>
          {/* <button className="menu" type="menu"> */}
          Tasks
        </button>
        <div className='animalselection'>
          <div className='petselection' ref={animalContainer}>
            <h6 className='pets'>Pets</h6>
            {pets.map((pet, index) => {
              return (
                <button
                  ref={animalbtn}
                  onClick={pickPetClick}
                  selected={pet.petId}
                  key={index}
                  className={`petbtn`}
                  name={pet.name}
                  id={pet.btn}
                >
                  <img
                    key={index}
                    className='petselect'
                    id={pet.petId}
                    name={pet.name}
                    src={pet.mood[0]}
                    alt={pet.name}
                  />
                </button>
              );
            })}
          </div>
          <div className='hungerlevel'>
            <h6 className='class'>Hunger level</h6>
            <div className='petfoodtortoise'>
              {renderApples('applehunger', pets[0].hungerlevel)}
            </div>
            <div className='petfoodcanary'>
              {renderApples('applehunger', pets[1].hungerlevel)}
            </div>
            <div className='petfoodwrap'>
              {renderApples('applehungerwrap', pets[2].hungerlevel)}
            </div>
          </div>
        </div>
        <button className='confirmbtn' onClick={goToGame}>
          My task list
        </button>
      </div>
    </>
  );
}
