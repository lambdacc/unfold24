// src/pages/CreateRisk.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";
import { storeObjectChanges } from "@/lib/utils";

interface RiskFormData {
  title: string;
  description: string;
  coverageAmount: string;
  collateralAmount: string;
  profileImage: File | null;
}

export const CreateRiskPage = () => {
  const navigate = useNavigate();
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });
  const [waitingForTxn, setWaitingForTxn] = useState("");
  const currentAccount = useCurrentAccount();
  const counterPackageId = useNetworkVariable("counterPackageId");

  // sui to minst
  function suiToMist(sui: number): number {
    return sui * 1_000_000_000; // 1 SUI = 1,000,000,000 Mist
  }

  const riskCreate = async (riskCoverage, collateralAmount) => {
    const totalShares = Math.ceil(riskCoverage / 100);
    console.log("new_risk fun called call");

    const tx = new Transaction();
    console.log("new_risk tx", tx);

    try {
      const coin = coinWithBalance({ balance: suiToMist(collateralAmount) });
      console.log("new_risk coin", coin);

      tx.moveCall({
        target: `${counterPackageId}::contract::new_risk`,
        arguments: [
          tx.pure.u64(suiToMist(riskCoverage)),
          tx.pure.u64(totalShares),
          tx.object(coin),
        ],
      });

      tx.setSender(currentAccount?.address);
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (tx) => {
            suiClient
              .waitForTransaction({ digest: tx.digest })
              .then(async () => {
                setWaitingForTxn("");
                console.log(`Transaction successful: ${tx.digest}`);
                console.log("object changes", tx.objectChanges);
                storeObjectChanges(tx?.objectChanges[1]?.objectId);
                // Redirect to /explore after successful transaction
                navigate("/explore");
              });
          },
          onError: (error) => {
            console.error("Transaction failed:", error);
          },
        },
      );
    } catch (error) {
      console.error("Error during transaction setup or execution:", error);
    }
  };

  const [formData, setFormData] = useState<RiskFormData>({
    title: "",
    description: "",
    coverageAmount: "",
    collateralAmount: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    riskCreate(formData.coverageAmount, formData.collateralAmount);
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Risk</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div>
              <p className="mb-2 text-sm text-gray-600">
                Upload a profile photo for the Risk
              </p>
              <div className="flex items-center space-x-4">
                <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter risk title"
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter risk description"
                className="mt-1"
                rows={4}
              />
            </div>

            {/* Coverage Amount */}
            <div>
              <label
                htmlFor="coverageAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Coverage Amount Required? (In SUI)
              </label>
              <Input
                id="coverageAmount"
                name="coverageAmount"
                type="number"
                value={formData.coverageAmount}
                onChange={handleInputChange}
                placeholder="Enter coverage amount"
                className="mt-1"
              />
            </div>

            {/* Collateral Amount */}
            <div>
              <label
                htmlFor="collateralAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount of collateral willing to put (In SUI)
              </label>
              <Input
                id="collateralAmount"
                name="collateralAmount"
                type="number"
                value={formData.collateralAmount}
                onChange={handleInputChange}
                placeholder="Enter collateral amount"
                className="mt-1"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              Deposit
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};
