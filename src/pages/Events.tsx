import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Header } from "@/components/Header";

const EventsPage = () => {
  const [shareCount, setShareCount] = useState(3);

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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <Card className="max-w-3xl mx-auto bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-6">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={`${imageUrl}`}
                    alt="Event"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <h1 className="text-2xl font-mono">ETH Denver 2024</h1>
                </div>

                <div className="font-mono">
                  <p className="mb-4 text-gray-600">23-11-2024 9:56pm</p>
                  <p className="mb-8 text-gray-600">
                    Join us at ETH Denver, the largest and longest-running ETH
                    event in the world! This year's event will feature keynote
                    speakers, workshops, and hackathons focused on blockchain
                    innovation and web3 development.
                  </p>

                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Total Shares:{" "}
                      <span className="text-black font-semibold">1000</span>
                    </p>
                    <p className="text-gray-600">
                      Tokens Minted:{" "}
                      <span className="text-black font-semibold">650</span>
                    </p>
                    <p className="text-gray-600">
                      Tokens Left:{" "}
                      <span className="text-black font-semibold">350</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-80">
                <Card className="border border-gray-200">
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        Collateral:{" "}
                        <span className="text-black font-semibold">
                          0.1 sui
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Coverage Required:{" "}
                        <span className="text-black font-semibold">
                          0.5 sui
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">
                        Buy Shares
                      </p>
                      <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={decrementShares}
                          className="h-8 w-8 text-gray-600"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-black font-semibold">
                          {shareCount}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={incrementShares}
                          className="h-8 w-8 text-gray-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-600">
                        Avg. buys:{" "}
                        <span className="text-black font-semibold">50</span>
                      </p>
                      <p className="text-gray-600">
                        Potential Return:{" "}
                        <span className="text-black font-semibold">
                          0.001 sui
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Buy {shareCount} worth{" "}
                        <span className="text-black font-semibold">
                          0.0017 sui
                        </span>
                      </p>
                    </div>

                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                      BUY
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EventsPage;
