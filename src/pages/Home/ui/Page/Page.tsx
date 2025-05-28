import { FC } from "react";
import Hero from "../../sections/hero";
import Features from "../../sections/features";
import Pricing from "../../sections/pricing";
import Footer from "@/app/components/ui/footer";
import ChatBot from "../../sections/chatbot";

const Home: FC = () => {
  return (
    <div className="mx-auto space-y-8">
      <Hero />
      {/* <ChatBot /> */}
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;