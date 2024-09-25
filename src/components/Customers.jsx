import { useState, useEffect } from 'react'
import '../App.css'

function Popup({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="popup-overlay">
      <div className='popup-content'>
        <button className='close-button' onClick={onClose}>Close</button>
        <h2>{customer.name}</h2>
        <img src={customer.img} alt={customer.name} className='customer-image' />
        <p><strong>Age:</strong> {customer.age}</p>
        <p><strong>Breed:</strong> {customer.breed}</p>
        <p><strong>Chip Number:</strong> {customer.chipNumber}</p>
        <p><strong>Sex:</strong> {customer.sex}</p>
        <p><strong>Present:</strong> {customer.present ? 'Yes' : 'No'}</p>
        <h3>Owner Information:</h3>
        <p><strong>Name:</strong> {customer.owner.name } {customer.owner.lastName } </p>
        <p><strong>Phone Number:</strong> {customer.owner.phoneNumber}</p>
      </div>
    </div>
  );
}

function Customers() {
  const url = "https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758"
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const filteredCustomer = customers.filter((customer) => {
    const matchSearchQuery = customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBreed = selectedBreed === '' || customer.breed === selectedBreed; 
    const matchAge = selectedAge === '' || customer.age === Number(selectedAge); 
    return matchSearchQuery && matchBreed && matchAge;
  });
  
  const uniqBreeds = [...new Set(customers.map(customer => customer.breed))].sort();
  const uniqAge = [...new Set(customers.map(customer => Number(customer.age)))].sort((a, b) => a - b);


  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.record);
        console.log(data.record);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, []);
  
const openPopup = (customer) => {
  setSelectedCustomer(customer);
};

const closePopup = () => {
  setSelectedCustomer(null);
};

  return (
    <>
      <h1 className='header'>DogCare customers</h1>
      <input type="text" placeholder='Search by dogs name' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className='search-field' />
      <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)} className='dropdown'>
        <option value="">All Breeds</option>
        {uniqBreeds.map((breed, index) => (<option key={index} value={breed}>{breed}</option>))}
      </select>
      <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)} className='dropdown'>
        <option value="">All ages</option>
        {uniqAge.map((age, index) => (<option key={index} value={age}>{age}</option>))}

      </select>
        
      {customers && customers.length > 0 ? (
          <div className='customer-list'>
          {filteredCustomer.map((customer, index) => (
            <p key={index} onClick={() => openPopup(customer)} className='customer-name'>{customer.name}</p>
          ))}
        </div>
        ) : (
          <p>No data recived</p>
        )}
        
  { selectedCustomer && (
      <Popup customer={selectedCustomer} onClose={closePopup} />
    )}
  
    </>
  );
}

export default Customers
