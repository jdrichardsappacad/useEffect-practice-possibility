const User = (props) => {
  const { name, email, picture, location } = props.data;
  return (
    <div className='render-wrapper' key={email}>
      <img src={picture.large} alt={email} />
      <p>
        <span className='name'>
          {name.first} {name.last}
        </span>
      </p>
      <p>{`${location.city}, ${location.state}`}</p>
      <p>{email}</p>
      <button onClick={() => props.setLogout(false)}>Log Out</button>
    </div>
  );
};
export default User;
