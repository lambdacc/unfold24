// @ts-nocheck

import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
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
  profileImage: File | "";
  eventEndDate: Date | undefined;
  eventEndTime: string;
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

  const riskCreate = async (
    name,
    description,
    ipfshash,
    riskCoverage,
    collateralAmount,
    endDate,
    endTime,
  ) => {
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
          tx.pure.string(name),
          tx.pure.string(description),
          tx.pure.string(ipfshash.name),
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
    profileImage: "",
    eventEndDate: undefined,
    eventEndTime: "",
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

  function suiToMist(sui: number): number {
    return sui * 1_000_000_000;
  }

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, eventEndDate: date }));
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, eventEndTime: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    riskCreate(
      formData.title,
      formData.description,
      formData.profileImage,
      formData.coverageAmount,
      formData.collateralAmount,
      formData.eventEndDate,
      formData.eventEndTime,
    );
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Risk Event</h1>

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

            {/* Event End Date and Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event End Date
              </label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.eventEndDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.eventEndDate ? (
                          format(formData.eventEndDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.eventEndDate}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="time"
                      name="eventEndTime"
                      value={formData.eventEndTime}
                      onChange={handleTimeChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
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
