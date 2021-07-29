import { useState, useEffect } from 'react';

import User from './User';

const RandomUserFunc = () => {
  const [searchChange, setSearchChange] = useState('');
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem('user') || 'foobar'
  );
  const [data, setData] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://randomuser.me/api/?seed=${searchWord}`);
      const data = await res.json();
      setData(data.results);
    };

    fetchUser();
  }, [searchWord]);

  useEffect(() => {
    localStorage.setItem('user', searchWord);
  }, [searchWord]);

  let renderUser = (
    <div className='person'>
      {data?.map((data) => (
        <User key={data.id.value} setLogout={setLogged} data={data} />
      ))}
    </div>
  );

  let login = (
    <div className='person login'>
      <h1> Please Log In</h1>
      <button onClick={() => setLogged(true)}>Log In</button>
    </div>
  );

  return (
    <div className='container'>
      {!logged ? login : renderUser}
      <div className='form-wrapper'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchWord(searchChange);
            setSearchChange('');
          }}
        >
          <label htmlFor='search'>Search:</label>
          <input
            id='search'
            onChange={(e) => setSearchChange(e.target.value)}
            value={searchChange}
            name='searchWord'
            placeholder='Username'
          />
          <button disabled={!logged} type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RandomUserFunc;
