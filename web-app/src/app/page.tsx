import { NavBar } from "./components/NavBar";
import { MainPage } from "./components/MainPage";

export default function Home() {
  return (
    <main className="h-screen">
      <NavBar />
   
        <MainPage />
    
        <div className="bg-[#343290] h-96"/>
    </main>
  );
}
