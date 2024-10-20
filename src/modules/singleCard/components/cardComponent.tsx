"use client";
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_VEHICLE_BY_ID } from '../services/carQueries'; 
import styles from './cardComponent.module.css';

const VehicleDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('id'); 
  console.log('Vehicle ID:', vehicleId);

  // Query to fetch vehicle details by ID
  const { data, error } = useQuery(GET_VEHICLE_BY_ID, {
    variables: { id: vehicleId },
  });

  // Handling loading and error states
  if (error) return <p>Error loading vehicle details: {error.message}</p>;

  if (!data || !data.getVehicleById) return <p>No vehicle found.</p>;

  const vehicle = data.getVehicleById;

  return (
    <div className={styles.container}>
      <h2 className={styles.vehicleName}>{vehicle.name}</h2>
      <div className={styles.imageGallery}>
        {/* Map through the images array and display each image */}
            {vehicle.images.map((image: string, index: number) => (
            <img
                key={index}
                src={image}
                alt={`${vehicle.name} image ${index + 1}`}
                className={`${styles.vehicleImage} ${index === 1 ? styles.centerImage : ''}`} 
            />
            ))}
        </div>
      <p className={styles.vehicleDescription}>{vehicle.description}</p>
      <p className={styles.vehiclePrice}>Price: {vehicle.price} /day</p>
      <button onClick={() => alert(`Rented ${vehicle.name}`)} className={styles.rentButton}>
        Rent Now
      </button>
    </div>
  );
};

export default VehicleDetails;
