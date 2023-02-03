import "./App.css";
import { useState, useEffect } from "react";
import firebase from "./firebase";
// import firebase modules
import { getDatabase, onValue, push, ref, remove } from "firebase/database";

function App() {
  // create country state that will store database info to Firebase
  const [entries, setEntries] = useState([]);
  // create stateful value that is bound to input
  const [userInput, setUserInput] = useState("");

  // event that will fire every time there is a change in our input
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    // prevent default behaviour on submit
    event.preventDefault();
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // get the information from our userInput State
    // send it off to our database using push
    push(dbRef, {
      name: userInput,
      landmark: "",
    });
    // reset the input after submitting by changing the state to empty string
    setUserInput("");
  };

  const handleRemoveCountry = (entryId) => {
    console.log = "removing country";
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${entryId}`);
    // call remove() with the referenced node
    remove(dbRef);
  };

  // get useEffect function to run side effects on component mount
  useEffect(() => {
    // create a variable that holds our database details
    const database = getDatabase(firebase);
    // create a variable that makes a reference to our database
    const dbRef = ref(database);
    // get database info on load or on change
    // use event listener onValue
    onValue(dbRef, (response) => {
      // use Firebase's .val() to parse our database info into the format we need
      const data = response.val();
      // create an empty array

      const newState = [];
      // data is an object, so we iterate through it using a for in loop to access each country name
      for (let key in data) {
        // inside the loop, we push each country name to the empty array
        newState.push({
          key: key,
          name: data[key].name,
          landmark: data[key].landmark,
        });
        // 1. make an object {}
        // 2. build a property called "key" that has a value of the objects key
        // 3. build a property called "name that has a value of the key's value"
      }
      // set state to match no-longer-empty array
      setEntries(newState);
    });
  }, []);

  return (
    <div class="background">
      <div className="app">
        <h1>Fernweh</h1>
        <h2>/FEIRN-veyh/ - noun</h2>
        <h3>A longing for distant places</h3>
        <form action="submit">
          <label htmlFor="newCountry">Countries I want to visit:</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="newCountry"
            value={userInput}
          />
          <button class="countryButton" disabled={entries.length >= 10} onClick={handleSubmit}>
            Add Country
          </button>
        </form>
        <ul class="countriesFlex">
          {entries.map((entry) => {
            return (
              <li class="countriesList" key={entry.key}>
                <p>{entry.name}</p>
                <button onClick={() => handleRemoveCountry(entry.key)}>
                  x
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
