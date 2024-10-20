import { gql } from '@apollo/client';

export const GET_VEHICLE_BY_ID = gql`
  query GetVehicleById($id: ID!) {
    getVehicleById(id: $id) {
      id
      name
      description
      price
      quantity
      image
      images
    }
  }
`;
