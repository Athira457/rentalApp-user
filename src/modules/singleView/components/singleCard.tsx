"use client";
import { useSearchParams, useRouter } from 'next/navigation'; 
import { useQuery } from '@apollo/client';
import { GET_VEHICLE_BY_ID } from '../services/carQueries'; 
import styles from './singleCard.module.css';
import Image from 'next/image';

const VehicleDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('id');
  const router = useRouter(); 
  console.log('Vehicle ID:', vehicleId);

  // Query to fetch vehicle details by ID
  const { data, error } = useQuery(GET_VEHICLE_BY_ID, {
    variables: { id: vehicleId },
  });

  // Handling loading and error states
  if (error) return <p>Error loading vehicle details: {error.message}</p>;
  if (!data || !data.getVehicleImageById) return <p>No vehicle found.</p>;

  const vehicle = data.getVehicleImageById;

  const handleRent = (id: string) => {
    // Redirect to order page with vehicleId in the query params
    const encodedId = encodeURIComponent(id);
    router.push(`/orderCar?id=${encodedId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.vehicleName}>{vehicle.name}</h2>
      <div className={styles.imageGallery}>
        {vehicle.secondaryimages?.map((imageObj: { images: string }, index: number) => (
          <Image
            key={index}
            src={imageObj.images[0]}
            alt={`${vehicle.name} image ${index + 1}`}
            className={`${styles.vehicleImage} ${index === 1 ? styles.centerImage : ''}`} 
            width={200}
            height={200}
          />
        ))}
      </div>
      <p className={styles.vehicleDescription}>{vehicle.description}</p>
      <p className={styles.vehiclePrice}>Price: {vehicle.price} /day</p>
      <button onClick={() => handleRent(vehicle.id)} className={styles.rentButton}>
        Rent Now
      </button>
    </div>
  );
};

export default VehicleDetails;
