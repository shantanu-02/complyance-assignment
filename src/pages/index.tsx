import Navbar from "@/components/Navbar";
import Posts from "@/components/Posts";
import Footer from '@/components/Footer'
import ProfileModal from "@/components/ProfileModal";
import AddStoryModal from "@/components/AddStoryModal";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Posts />
      <ProfileModal />
      <AddStoryModal /> 
      <Footer />
    </div>
  );
}
