import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";

export const EventsPage: React.FC = () => {
  const [shareCount, setShareCount] = useState(3);
  const navigate = useNavigate();
  const handleExplore = () => {
    navigate("/explore");
  };

  const imageUrl =
    "https://imgs.search.brave.com/IzHtSVyIKjNLnMlKCnLZobLZNaBph_0zBwPWk-jhA-s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi81LzU2L0Rv/bmFsZF9UcnVtcF9v/ZmZpY2lhbF9wb3J0/cmFpdC5qcGcvNTEy/cHgtRG9uYWxkX1Ry/dW1wX29mZmljaWFs/X3BvcnRyYWl0Lmpw/Zw";

  const incrementShares = () => {
    setShareCount((prev) => prev + 1);
  };

  const decrementShares = () => {
    if (shareCount > 0) {
      setShareCount((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <button
          onClick={handleExplore}
          className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Explore other events
        </button>
        <Card className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <CardContent className="p-0">
            <div className="md:flex">
              {/* Left Section */}
              <div className="flex-1 p-8 md:border-r border-gray-200">
                <div className="flex items-center gap-6 mb-8">
                  <img
                    src={imageUrl}
                    alt="Event"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <h1 className="text-3xl font-bold text-gray-800">
                    ETH Denver 2024
                  </h1>
                </div>

                <div className="space-y-6">
                  <p className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    23-11-2024 9:56pm
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Join us at ETH Denver, the largest and longest-running ETH
                    event in the world! This year's event will feature keynote
                    speakers, workshops, and hackathons focused on blockchain
                    innovation and web3 development.
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Total Shares</p>
                      <p className="text-2xl font-bold text-gray-800">1000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tokens Minted</p>
                      <p className="text-2xl font-bold text-gray-800">650</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tokens Left</p>
                      <p className="text-2xl font-bold text-gray-800">350</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="md:w-96 bg-gray-50 p-8">
                <Card className="bg-white shadow-inner">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Collateral</p>
                        <p className="text-lg font-semibold text-gray-800">
                          0.1 sui
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Coverage Required
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          0.5 sui
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Buy Shares
                      </p>
                      <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={decrementShares}
                          className="h-8 w-8 text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-2xl font-bold text-gray-800">
                          {shareCount}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={incrementShares}
                          className="h-8 w-8 text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">Avg. buys</p>
                        <p className="text-lg font-semibold text-gray-800">
                          50
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          Potential Return
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          0.001 sui
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          Buy {shareCount} worth
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          0.0017 sui
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                      BUY NOW
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};