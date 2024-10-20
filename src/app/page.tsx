import HomeView from "./(root)/home/page";
import VehicleCards from "@/modules/cardsDisplay/views/index";
import Header from "@/modules/header/components/header";

export default function Home() {
  return (
    <>
    <Header/>
    <HomeView/>
    <VehicleCards/> 
   </>
  );
}
