import { gql } from '@apollo/client';

export const SEARCH_VEHICLES = gql`
query SearchVehicles($searchTerm: String, $priceRange: PriceRangeInput) {
  searchVehicles(searchTerm: $searchTerm, priceRange: $priceRange) {
    id
    name
    price
    quantity
    seats
    fuel
    gear
    primaryimage{
            images
        }
  }
}
`;