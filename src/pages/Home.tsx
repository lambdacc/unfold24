import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const navigate = useNavigate();
  const handleLaunchClick = () => {
    navigate("/explore");
  };
  const features = [
    {
      title: "Decentralized Governance",
      description:
        "Participate in decision-making processes through our DAO structure.",
    },
    {
      title: "StarkNet Integration",
      description:
        "Leverage the power of StarkNet for scalable and efficient operations.",
    },
    {
      title: "Community-Driven Innovation",
      description:
        "Shape the future of decentralized applications with community input.",
    },
    {
      title: "Reward Distribution",
      description:
        "Profit from tokens received will be delivered to users from RH's Airdrops interface.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/40 blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/40 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[30%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/40 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/30 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <a href="/" className="text-2xl font-bold text-gray-900 mr-6">
              Risk <span className="text-pink-700">Harbor</span>
            </a>
            <nav className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-800 hover:text-pink-700 transition-colors"
              >
                Overview
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-pink-700 transition-colors"
              >
                Roadmap
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-pink-700 transition-colors"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-pink-700 transition-colors"
              >
                Social
              </a>
            </nav>
            <Button
              onClick={handleLaunchClick}
              className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/50 ml-6 transition-all duration-300 ease-in-out hover:scale-105"
            >
              Launch App
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 my-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            DAO-Based Ecosystem
            <br />
            Catalyst for Starknet
          </h1>
          <p className="text-xl text-gray-800 mb-12 max-w-3xl mx-auto">
            Risk Harbor is a DAO Based Ecosystem Catalyst for projects built on
            the StarkNet Network, aiming to be the future of decentralized
            innovation.
          </p>
          <Button
            onClick={handleLaunchClick}
            className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-6 shadow-lg shadow-pink-500/50 transition-all duration-300 ease-in-out hover:scale-105"
          >
            Launch App
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Features of Risk Harbor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 backdrop-blur-xl bg-white/50 border border-gray-200/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-800">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="relative z-10 py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Stay updated on the latest Risk Harbor
          </h2>
          <div className="flex justify-center gap-8">
            <a
              href="#"
              className="text-gray-800 hover:text-pink-700 transition-colors"
            >
              <Twitter className="w-8 h-8" />
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-pink-700 transition-colors"
            >
              <Github className="w-8 h-8" />
            </a>
            <svg
              className="w-8 h-8 text-gray-800 hover:text-pink-700 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.2647 2.42778C22.0936 2.28604 21.8821 2.19931 21.6592 2.17723C21.4364 2.15515 21.2118 2.19856 21.0135 2.30223L2.46466 11.5045C2.25594 11.6137 2.08414 11.7827 1.97048 11.9904C1.85682 12.1981 1.80577 12.4349 1.82351 12.6712C1.84125 12.9075 1.92695 13.1336 2.0702 13.3191C2.21345 13.5047 2.40818 13.6416 2.62919 13.7133L7.72794 15.3177L9.72544 21.2905C9.78612 21.4841 9.89157 21.6598 10.0321 21.8005C10.1727 21.9413 10.3434 22.0424 10.5291 22.0945C10.7148 22.1466 10.9094 22.1481 11.0959 22.0988C11.2824 22.0496 11.4546 21.9511 11.5973 21.8124L15.9559 17.5506L20.2254 20.7791C20.4203 20.9299 20.6556 21.0156 20.8992 21.0253C21.1427 21.0349 21.3837 20.9681 21.5895 20.8338C21.7952 20.6995 21.9559 20.5037 22.0516 20.2729C22.1473 20.042 22.1737 19.7871 22.1275 19.5405L22.9853 3.39576C23.0115 3.17147 22.9755 2.94387 22.8814 2.73783C22.7873 2.53178 22.6386 2.35616 22.4514 2.22903L22.2647 2.42778ZM10.5404 15.0939L11.7859 18.8478L9.78844 16.8809L10.5404 15.0939ZM20.6275 19.1344L13.5332 13.8412L19.1897 6.21723C19.2687 6.11427 19.3072 5.98544 19.2981 5.85546C19.289 5.72549 19.2328 5.60375 19.1401 5.51301C19.0474 5.42227 18.9246 5.36863 18.7946 5.36173C18.6646 5.35483 18.5368 5.39519 18.435 5.47473L8.46169 13.3975L3.81169 11.9452L20.8041 3.57903L20.6275 19.1344Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
