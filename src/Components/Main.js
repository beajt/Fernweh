import React, { useEffect, useState } from "react";
import firebase from "./firebase";
// import firebase modules
import { getDatabase, onValue, push, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

function Main() {
  // create country state that will store database info to Firebase
  const [entries, setEntries] = useState([]);
  // create stateful value that is bound to input
  const [userInput, setUserInput] = useState("");
  // create login state
  const [userlogin, setUserLogin] = useState(false);

  // event that will fire every time there is a change in our input
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    // prevent default behaviour on submit
    event.preventDefault();

    // create a reference to our database
    const database = getDatabase(firebase);
    const auth = getAuth(firebase);

    const dbRef = ref(database);
    // get the information from our userInput State
    // send it off to our database using push
    push(dbRef, {
      country: userInput,
      userId: auth.currentUser.uid,
    });
    // reset the input after submitting by changing the state to empty string
    setUserInput("");
  };

  const handleRemoveCountry = (entryId) => {
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
    const auth = getAuth(firebase);

    // create a variable that makes a reference to our database
    const dbRef = ref(database);

    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var currentUserId = auth.currentUser.uid;
        onValue(dbRef, (response) => {
          // use Firebase's .val() to parse our database info into the format we need
          const data = response.val();
          // create an empty array

          const newState = [];
          // data is an object, so we iterate through it using a for in loop to access each country name
          for (let key in data) {
            // inside the loop, we push each country name to the empty array
            if (currentUserId === data[key].userId) {
              newState.push({
                key: key,
                country: data[key].country,
                userId: data[key].userId,
              });
            }
            // 1. make an object {}
            // 2. build a property called "key" that has a value of the objects key
            // 3. build a property called "name that has a value of the key's value"
          }
          // set state to match no-longer-empty array
          setEntries(newState);
          setUserLogin(true);
        });
      }
    });
  }, []);

  return (
    <div>
      {userlogin ? (
        <div className="app">
          <form className="form" action="submit">
            <label htmlFor="newCountry">Countries I want to visit:</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="newCountry"
              value={userInput}
            />
            <button
              className="countryButton"
              disabled={userInput.length === 0}
              // || entries.length >= 10
              onClick={handleSubmit}
            >
              Add Country
            </button>
          </form>
          <ul className="countriesFlex">
            {entries.map((entry) => {
              return (
                <li className="countriesList" key={entry.key}>
                  <p>{entry.country}</p>
                  <button onClick={() => handleRemoveCountry(entry.key)}>
                    x
                  </button>
                </li>
              );
            })}
          </ul>
          
        </div>
      ) : <p className="app">Please sign in to start using the app</p>}
    </div>
  );
}

export default Main;