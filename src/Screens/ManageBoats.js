import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css'; 

export default function ManageBoats() {
  const [boatName, setBoatName] = useState('');
  const [boatCapacity, setBoatCapacity] = useState('');
  const [boatDescription, setBoatDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedSafetyFeatures, setSelectedSafetyFeatures] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [boatPrice, setBoatPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCheckboxChange = (e, setFunction, selectedValues) => {
    const { value, checked } = e.target;
    if (checked) {
      setFunction([...selectedValues, value]);
    } else {
      setFunction(selectedValues.filter((item) => item !== value));
    }
  };

  const handleSave = async () => {
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    try {
      // Upload the image to Firebase Storage------------------
      const imageRef = ref(storage, `boats/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Save boat data to Firestore-------------------
      await addDoc(collection(db, 'boats'), {
        name: boatName,
        capacity: boatCapacity,
        description: boatDescription,
        imageUrl: imageUrl,
        amenities: selectedAmenities,
        safetyFeatures: selectedSafetyFeatures,
        meals: selectedMeals,
        price: boatPrice,
      });
      setSuccessMessage("Boat Added Successfully!");

      console.log("Boat added successfully!");
    } catch (error) {
      console.error("Error adding boat: ", error);
    }
  };

  return (
    <div className="manage-boats-container">
      <h3>Add Boat</h3>
      <div className="form-group">
      {successMessage && alert('Boat Added Succesfully')}
        <label>Name</label>
        <input type="text" placeholder="Enter the name of the boat..." onChange={(e) => setBoatName(e.target.value)} required />

        <label>Capacity</label>
        <input type="number" placeholder="Enter the number of seats..." onChange={(e) => setBoatCapacity(e.target.value)} required />

        <label>Description</label>
        <input type="text" placeholder="Enter some description of the boat..." onChange={(e) => setBoatDescription(e.target.value)} required />

        <label>Photo</label>
        <div className="upload-container">
          <div className="upload-box" onClick={() => document.getElementById('fileInput').click()}>
            <div className="upload-icon">📁</div>
            <p>Drag and drop files here or click to select files</p>
            <p className="file-support">Supports JPG, PNG, and SVG files up to 1MB</p>
          </div>
          <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleImageChange} required />
        </div>
        <br></br>
        <label>Amenities</label>
        <p>Select the amenities available on your boat to enhance passenger comfort and experience.</p>
        <div className="checkbox-group">
          <label><input type="checkbox" value="Clean Restrooms" onChange={(e) => handleCheckboxChange(e, setSelectedAmenities, selectedAmenities)} /> Clean Restrooms</label>
          <label><input type="checkbox" value="Comfortable Sitting Arrangements" onChange={(e) => handleCheckboxChange(e, setSelectedAmenities, selectedAmenities)} /> Comfortable Sitting Arrangements</label>
          <label><input type="checkbox" value="Onboarding Dining" onChange={(e) => handleCheckboxChange(e, setSelectedAmenities, selectedAmenities)} /> Onboarding Dining</label>
          <label><input type="checkbox" value="Wi-Fi Access" onChange={(e) => handleCheckboxChange(e, setSelectedAmenities, selectedAmenities)} /> Wi-Fi Access</label>
          <label><input type="checkbox" value="Entertainment System" onChange={(e) => handleCheckboxChange(e, setSelectedAmenities, selectedAmenities)} /> Entertainment System</label>
          <label><input type="checkbox" value="Air Conditioning/Climate Control" onChange={(e) => handleCheckboxChange(e, setSelectedAmenities, selectedAmenities)} /> Air Conditioning/Climate Control</label>
        </div>

        <label>Safety Features</label>
        <p>Select the safety features available on your boat to enhance passenger safety.</p>
        <div className="checkbox-group">
          <label><input type="checkbox" value="Live food provided to all passengers" onChange={(e) => handleCheckboxChange(e, setSelectedSafetyFeatures, selectedSafetyFeatures)} /> Live food provided to all passengers</label>
          <label><input type="checkbox" value="Emergency Kit onboard" onChange={(e) => handleCheckboxChange(e, setSelectedSafetyFeatures, selectedSafetyFeatures)} /> Emergency Kit onboard</label>
          <label><input type="checkbox" value="Fire Extinguishers" onChange={(e) => handleCheckboxChange(e, setSelectedSafetyFeatures, selectedSafetyFeatures)} /> Fire Extinguishers</label>
        </div>

        <label>Meals</label>
        <p>Select the available meals on your boat.</p>
        <div className="checkbox-group">
          <label><input type="checkbox" value="Veg/Non-Veg" onChange={(e) => handleCheckboxChange(e, setSelectedMeals, selectedMeals)} /> Veg/Non-Veg</label>
          <label><input type="checkbox" value="Pure Veg" onChange={(e) => handleCheckboxChange(e, setSelectedMeals, selectedMeals)} /> Pure Veg</label>
        </div>

        <label>Price</label>
        <input type="number" placeholder="Enter the price..." onChange={(e) => setBoatPrice(e.target.value)} required />

        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
}
