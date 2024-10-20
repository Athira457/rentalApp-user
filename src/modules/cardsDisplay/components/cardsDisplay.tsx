"use client";
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_VEHICLES } from '../services/cardQueries';
import styles from './cardsDisplay.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CustomButton from '@/utils/customButton';
import seat from '../../../themes/images/seat.svg';
import fuel from '../../../themes/images/fuel.svg';
import gear from '../../../themes/images/gear.svg';

interface Vehicle {
  id: string;
  name: string;
  price: number;
  quantity: number;
  seats: number;
  fuel: string;
  gear: string;
  primaryimage?: {
    images: string;
  };
};

// Predefined price ranges
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under 4,000', min: 0, max: 4000 },
  { label: '4,000 - 5,000', min: 4000, max: 5000 },
  { label: '5,000 - 6,000', min: 5000, max: 6000 },
  { label: 'Above 6,000', min: 7000, max: Infinity },
];

const VehicleCards = () => {
  const { data, loading } = useQuery<{ getAllVehiclesNew: Vehicle[] }>(GET_ALL_VEHICLES);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);

  if (loading) return <p>Loading...</p>;

  // Rent Car Handler
  const handleRent = (vehicleId: string) => {
    router.push(`/bookCar?id=${encodeURIComponent(vehicleId)}`);
    console.log(`Rent car with ID: ${vehicleId}`);
  };

  // Filter vehicles based on search term and price range
  const filteredVehicles = data?.getAllVehiclesNew.filter((vehicle: Vehicle) =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    vehicle.price >= selectedPriceRange.min && vehicle.price <= selectedPriceRange.max
  );

  return (
    <div>
      {/* Search and Price Filter Fields */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search vehicles..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Price Filter Dropdown */}
        <select
          className={styles.priceDropdown}
          value={selectedPriceRange.label}
          onChange={(e) => {
            const selectedRange = priceRanges.find(range => range.label === e.target.value);
            setSelectedPriceRange(selectedRange || priceRanges[0]);
          }}
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Cards */}
      <div className={styles.vehicleContainer}>
        {filteredVehicles?.length ? (
          filteredVehicles.map((vehicle: Vehicle) => (
            <div key={vehicle.id} className={styles.vehicleCard}>
              {vehicle.primaryimage?.images && (
                <Image
                  src={vehicle.primaryimage.images}
                  alt={vehicle.name}
                  className={styles.vehicleImage}
                  width={200}
                  height={200}
                />
              )}
              <h2 className={styles.vehicleName}>{vehicle.name}</h2>
              <p className={styles.vehiclePrice}>Price: {vehicle.price}</p>
              <p className={styles.vehicleQuantity}>Quantity: {vehicle.quantity}</p>
              <div className={styles.features}>
                <p className={styles.vehicleSeatCapacity}>
                  <Image src={seat} alt="seat" width={20} height={20} className={styles.searchIcon} /> {vehicle.seats}
                </p>
                <p className={styles.vehicleFuelType}>
                  <Image src={fuel} alt="fuel" width={20} height={20} className={styles.searchIcon} /> {vehicle.fuel}
                </p>
                <p className={styles.vehicleGearType}>
                  <Image src={gear} alt="gear" width={20} height={20} className={styles.searchIcon} /> {vehicle.gear}
                </p>
              </div>
              <div className={styles.actions}>
                <CustomButton type="submit" className={styles.rentButton} onClick={() => handleRent(vehicle.id)}>
                  Rent Car
                </CustomButton>
              </div>
            </div>
          ))
        ) : (
          <p>No vehicles found matching `{searchTerm}` in the selected price range</p>
        )}
      </div>
    </div>
  );
};

export default VehicleCards;
