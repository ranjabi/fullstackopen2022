import axios from 'axios';
import { useState, useEffect } from 'react';
import personService from './services/persons'

const isExists = (name, persons) => {
  for (let person of persons) {
    if (name === person.name) {
      return true;
    }
  }
  return false;
};

const Notification = ({message}) => {
  if (message === null) {
    return null 
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const PersonForm = ({
  submitHandler,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, deleteHandler }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteHandler(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('Everything worked perfectly')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (isExists(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    personService.create(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));

      setErrorMessage(
        `Person '${newPerson.name}' successfully added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNewName('');
      setNewNumber('');
    });
  };

  const deleteHandler = (id) => {
    if (window.confirm('Do you want do delete this person number?')) {
      personService.deletePerson(id)
      setPersons(persons.filter(e => e.id !== id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <h3>Add a new number</h3>
      <PersonForm
        submitHandler={submitHandler}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;