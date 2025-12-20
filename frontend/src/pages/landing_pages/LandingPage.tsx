import Navbar from "@/components/landing/Navbar";
import image from "@/assets/images/landing_image.png";
import { Button } from "@/components/ui/button";
import Events from "@/components/landing/Events";

const LandingPage = () => {
  return (
    <div className="w-full h-full bg-black">
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <Navbar />
        <div className="h-full w-full flex justify-center items-center ">
          <div className="text-center ">
            <div className="text-5xl font-bold pb-10">
              Host & Attend <br /> Amazing Events
            </div>
            <div className="text-xl font-semibold pb-2">
              Discover events, book tickets instantly, <br /> manage
              registrations effortlessly
            </div>
            <div className="flex justify-center">
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </div>
      <Events />
      Hosting and button <br />
      build for organizer and attendees <br />
      fottor
    </div>
  );
};

export default LandingPage;
