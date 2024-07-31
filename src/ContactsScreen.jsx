import PropTypes from "prop-types";

const AddressList = ({ addresses }) => (
  <ul>
    <h4>{addresses.length > 1 ? "Addresses:" : "Address:"}</h4>
    {addresses.map((address, index) => (
      <ul key={index}>
        <li>{address.line_1 || "N/A"}</li>
        <li>{address.line_2 || "N/A"}</li>
        <li>{address.zip_code || "N/A"}</li>
        <li>{address.city || "N/A"}</li>
        <li>{address.state || "N/A"}</li>
      </ul>
    ))}
  </ul>
);

AddressList.propTypes = {
  addresses: PropTypes.array.isRequired,
};

const ContactCard = ({ contact }) => (
  <div>
    <div>
      <img src={contact.avatar_url} alt={`${contact.full_name}'s avatar`} />
      <h3>{contact.full_name}</h3> - <h4>{contact.company || "N/A"}</h4>
    </div>
    <p>{contact.details}</p>
    <ul>
      <li>email: {contact.email || "N/A"}</li>
      <li>phone: {contact.phone_number || "N/A"}</li>
      <li>
        <AddressList addresses={contact.addresses} />
      </li>
    </ul>
  </div>
);

ContactCard.propTypes = {
  contact: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    addresses: PropTypes.arrayOf(
      PropTypes.shape({
        line_1: PropTypes.string.isRequired,
        line_2: PropTypes.string.isRequired,
        zip_code: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const ContactsScreen = ({ contacts, cities, states }) => {
  if (
    !Array.isArray(contacts) ||
    !Array.isArray(cities) ||
    !Array.isArray(states)
  ) {
    return <p>Error: Formato de datos inválido.</p>;
  }

  const contactsToDisplay = contacts.map((contact) => {
    if (!contact || !contact.addresses || !Array.isArray(contact.addresses)) {
      return { error: true, message: "Invalid contact data" };
    }
    return {
      id: contact.id,
      avatar_url: contact.avatar_url,
      full_name: `${contact.first_name} ${contact.last_name}`,
      company: contact.company,
      details: truncate(contact.details, 100),
      email: contact.email,
      phone_number: `(${contact.phone.area_code}) ${contact.phone.number}`,
      addresses: contact.addresses.map((address) => ({
        line_1: address.line_1,
        line_2: address.line_2,
        zip_code: address.zip_code,
        city: findById(cities, address.city_id),
        state: findById(states, address.state_id),
      })),
    };
  });

  const truncate = (string, length) => string.slice(0, length);

  const findById = (array, id) => array.find((i) => i.id == id);

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/contacts">My Contacts</a></li>
        </ul>
      </nav>
      <h1>Contacts 👥</h1>
      {contactsToDisplay.map((contact, index) => 
        contact.error ? (
          <p key={index} style={{ color: 'red' }}>{contact.message}</p>
        ) : (
          <ContactCard key={contact.id} contact={contact} />
        )
      )}
    </div>
  );
};

ContactsScreen.propTypes = {
  contacts: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
};

export default ContactsScreen;
