import PropTypes from 'prop-types';

const UserProfile = ({ user }) => (
  <div>
    <img src={user.avatar_url} alt={`${user.first_name} ${user.last_name}'s avatar`} />
    <h1>{user.first_name} {user.last_name}</h1>
    <h3>{user.company}</h3>
    <p>Email: {user.email}</p>
    <h4>Address:</h4>
    <p>{user.address.line_1}</p>
    <p>{user.address.line_2}</p>
    <p>{user.address.zip_code}</p>
    <p>{user.address.city}</p>
    <p>{user.address.state}</p>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      line_1: PropTypes.string,
      line_2: PropTypes.string,
      zip_code: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
  }),
};

export default UserProfile;