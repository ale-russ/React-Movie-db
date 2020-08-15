import React, { useState } from 'react'
import axios from 'axios'

import Search from './component/Search'
import Results from './component/Results'
import Popup from './component/Popup'

function App() {

  const [state, setState] = useState({
    srch: "",
    results: [],
    selected: {},
  })

  //omdb movie store api key
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=6c68ec5d";

  //handle the search request
  const search = (e) => {
    if (e.key === 'Enter') {
      axios(apiurl + "&s=" + state.srch).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results };

        })
        console.log(data);
      });
    }
  }

  //handles the input from the user
  const handleInput = (e) => {
    let srch = e.target.value;

    setState(prevState => {
      return { ...prevState, srch: srch };
    });

    console.log(state.srch);
  }

  //handle popups
  const openPopup = id => {
    axios(apiurl + '&i=' + id).then(({ data }) => {
      let result = data;

      console.log(result)

      setState(prevState => {
        return { ...prevState, selected: result }
      });

    });
  }


  //
  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != 'undefined') ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;