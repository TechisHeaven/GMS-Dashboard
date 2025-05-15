import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Store, Building, UserPlus } from "lucide-react";
import { StoreService } from "../service/store.service";
import toast from "react-hot-toast";

// Zod schema for form validation
const storeSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  contactNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  openingTime: z.string().min(1, "Opening time is required"),
  closingTime: z.string().min(1, "Closing time is required"),
  type: z.enum(["grocery", "convenience", "supermarket"]),
  storeCode: z.string().optional(), // Required only when joining a store
});

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [storeType, setStoreType] = useState<"create" | "join" | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(storeSchema),
  });

  const mutation = useMutation({
    mutationFn: StoreService.saveStore,
    onSuccess: () => {
      toast.success("Store Created SuccessFully");
      queryClient.invalidateQueries({ queryKey: ["store"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error("Error Occured");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Store className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to GMS
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Choose your path
              </h3>

              <button
                onClick={() => setStoreType("create")}
                className={`w-full flex items-center justify-between p-4 border rounded-lg ${
                  storeType === "create"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
              >
                <Building className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Create a new store
                  </p>
                  <p className="text-sm text-gray-500">
                    Start fresh with your own store
                  </p>
                </div>
              </button>

              <button
                onClick={() => setStoreType("join")}
                className={`w-full flex items-center justify-between p-4 border rounded-lg ${
                  storeType === "join"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
              >
                <UserPlus className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Join existing store
                  </p>
                  <p className="text-sm text-gray-500">
                    Join your team's store
                  </p>
                </div>
              </button>
            </div>
          )}

          {step === 2 && storeType === "create" && (
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-lg font-medium text-gray-900">
                Store Details
              </h3>

              <input
                {...register("name")}
                placeholder="Store Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <input
                {...register("description")}
                placeholder="Store Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}

              <input
                {...register("contactNumber")}
                type="tel"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">
                  {errors.contactNumber.message}
                </p>
              )}

              <div className="flex gap-2">
                <input
                  {...register("openingTime")}
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  {...register("closingTime")}
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {(errors.openingTime || errors.closingTime) && (
                <p className="text-red-500 text-sm">
                  Opening and closing times are required
                </p>
              )}

              <select
                {...register("type")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="grocery">Grocery</option>
                <option value="convenience">Convenience</option>
                <option value="supermart">Supermart</option>
              </select>

              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
              >
                Save Store
              </button>
            </form>
          )}

          {step === 2 && storeType === "join" && (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-lg font-medium text-gray-900">Join Store</h3>

              <input
                {...register("storeCode")}
                placeholder="Enter Store Code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.storeCode && (
                <p className="text-red-500">{errors.storeCode.message}</p>
              )}

              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
              >
                Join Store
              </button>
            </form>
          )}

          <div className="mt-6 flex justify-between">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="text-sm font-medium text-indigo-600"
              >
                Back
              </button>
            )}
            <button
              onClick={() => setStep(2)}
              disabled={!storeType}
              className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
