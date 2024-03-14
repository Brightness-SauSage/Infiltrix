import Link from 'next/link';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import TrainPage from './components/TrainPage';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="h-screen">
      <NavBar />
      <div>
        <Link href="/"><a>Main Page</a></Link>
        <Link href="/train"><a>Train Page</a></Link>
      </div>
      <MainPage />
      <TrainPage />
      <Footer />
    </main>
  );
}
