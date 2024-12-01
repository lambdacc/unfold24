// src/pages/CreateRisk.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Header } from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface RiskFormData {
  title: string;
  description: string;
  coverageAmount: string;
  collateralAmount: string;
  profileImage: File | null;
}

export const CreateRiskPage = () => {
  const [formData, setFormData] = useState<RiskFormData>({
    title: "",
    description: "",
    coverageAmount: "",
    collateralAmount: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  // Handle text input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    // Add your form submission logic here
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
