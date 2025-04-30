import About from "@/Components/About";
import Footer from "@/Components/Footer";
import MediaUploader from "@/Components/MediaUploader";
import Navbar from "@/Components/Navbar";


export default function Home() {
  return (
   <>
  <Navbar/>
   <About/>
   <MediaUploader/>
   <Footer/>
   </>
  );
}
