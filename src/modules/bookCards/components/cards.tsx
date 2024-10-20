"use client";
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import CustomButton from '../../../utils/customButton'; 
import styles from './cards.module.css'; 
import { GET_VEHICLES } from '../services/cardQueries'; 

interface Vehicle {
  id: string;
  name: string; 
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const RentCard: React.FC = () => {
  const router = useRouter();
  // Fetching all vehicles
  const { data, loading, error } = useQuery<{ getAllVehicles: Vehicle[] }>(GET_VEHICLES);

  // Rent Car Handler
  const handleRent = (vehicleId: string) => {
    router.push(`/bookCar?id=${encodeURIComponent(vehicleId)}`);
    console.log(`Rent car with ID: ${vehicleId}`);
  };

  // Handling loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading vehicles: {error.message}</p>;

  return (
    //car card contents fetch from database using graphql
    <div className={styles.vehicleContainer}>
      {data?.getAllVehicles.map((vehicle: Vehicle) => (
        <div key={vehicle.id} className={styles.vehicleCard}>
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className={styles.vehicleImage}
            width={200}
            height={200}
          />
          <h2 className={styles.vehicleName}>{vehicle.name}</h2>
          {/* <p className={styles.vehicleDescription}>{vehicle.description}</p> */}
          <p className={styles.vehiclePrice}>Price: {vehicle.price} /day</p>
          <p className={styles.vehicleQuantity}> 5 Seater, Manual, Petrol </p>
          <div className={styles.actions}>
            <CustomButton type="submit" className={styles.rentButton} onClick={() => handleRent(vehicle.id)}>
              Rent Car
            </CustomButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentCard;
