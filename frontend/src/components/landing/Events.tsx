import { Calendar, MapIcon, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Events = () => {
  const events: {
    title: string;
    description: string;
    date: string;
    location: string;
    link: string;
  }[] = [
    {
      title: "Tech Innovation Summit 2026",
      description:
        "Join us for an exciting technology summit featuring keynote speakers from leading tech companies. Explore the latest innovations in AI, cloud computing, and cybersecurity. Network with industry professionals and discover emerging trends shaping the future of technology.",
      date: "2026-01-31",
      location: "Vishwanadh Conventions",
      link: "/event",
    },
    {
      title: "Tech Innovation Summit 2026",
      description:
        "Join us for an exciting technology summit featuring keynote speakers from leading tech companies. Explore the latest innovations in AI, cloud computing, and cybersecurity. Network with industry professionals and discover emerging trends shaping the future of technology.",
      date: "2026-01-31",
      location: "Vishwanadh Conventions",
      link: "/event",
    },
    {
      title: "Tech Innovation Summit 2026",
      description:
        "Join us for an exciting technology summit featuring keynote speakers from leading tech companies. Explore the latest innovations in AI, cloud computing, and cybersecurity. Network with industry professionals and discover emerging trends shaping the future of technology.",
      date: "2026-01-31",
      location: "Vishwanadh Conventions",
      link: "/event",
    },
  ];
  return (
    <div className=" w-full justify-center md:px-20 px-4 gap-10 pt-10">
      <div className="text-center text-2xl font-bold">Events</div>
      <div className="text-center font-sm">see what happening this year</div>
      <div className="md:flex gap-10 py-10">
        {events.map((component) => (
          <Card className="m-4">
            <CardContent>
              <img
                src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-2.png?height=280&format=auto"
                alt="Banner"
                className="aspect-video rounded-t-xl object-cover"
              />
            </CardContent>
            <CardHeader>
              <CardTitle>{component.title}</CardTitle>
              <CardDescription>
                <div className="flex justify-between">
                  <div className="flex gap-2 justify-center items-center">
                    <Calendar />
                    {component.date}
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <MapPin />
                    {component.location}
                  </div>
                </div>
              </CardDescription>
              <Button variant={"link"} >view details</Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
