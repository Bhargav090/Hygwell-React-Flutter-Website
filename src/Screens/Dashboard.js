import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../App.css';


export default function Dashboard() {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    const fetchBoats = async () => {
      const boatsCollection = collection(db, 'boats');
      const boatsSnapshot = await getDocs(boatsCollection);
      const boatsList = boatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBoats(boatsList);
    };

    fetchBoats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Boat Dashboard</h2>
      <div className="boat-cards-container">
        {boats.map((boat) => (
          <div key={boat.id} className="boat-card">
            <img src={boat.imageUrl} alt={boat.name} className="boat-image" onError={() => console.log("Error loading image:", boat.imageUrl)} />
            <h3>{boat.name}</h3>
            <p><strong>Capacity:</strong> {boat.capacity} seats</p>
            <p><strong>Description:</strong> {boat.description}</p>
            <p><strong>Amenities:</strong> {boat.amenities.join(', ')}</p>
            <p><strong>Safety Features:</strong> {boat.safetyFeatures.join(', ')}</p>
            <p><strong>Meals:</strong> {boat.meals.join(', ')}</p>
            <p><strong>Price:</strong> ${boat.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
