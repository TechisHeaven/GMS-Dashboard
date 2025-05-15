import { useState } from "react";
import { Upload } from "lucide-react";

const General = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "Himanshu verma",
    email: "test@gmail.com",
    language: "English",
    timezone: "",
    shippingAddress: "House no. 25, Gali no 7, Vipin Garden Extension",
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Avatar
        </label>
        <p className="text-sm text-gray-500">
          Choose an image that best reflects your identity or brand.
        </p>
        <div className="mt-2 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 aspect-square overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="bg-center bg-cover"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">
          Personal Information
        </h3>
        <p className="text-sm text-gray-500">Edit your personal information</p>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={userInfo.fullName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, fullName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            />
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">Language & Region</h3>
        <p className="text-sm text-gray-500">
          Choose your preferred language and region
        </p>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              value={userInfo.language}
              onChange={(e) =>
                setUserInfo({ ...userInfo, language: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select
              value={userInfo.timezone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, timezone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
            >
              <option>UTC-07:00 - Los Angeles</option>
              <option>UTC-05:00 - New York</option>
              <option>UTC+00:00 - London</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">Shipping Address</h3>
        <p className="text-sm text-gray-500">Change shipping address</p>
        <div className="mt-4">
          <textarea
            rows={4}
            value={userInfo.shippingAddress}
            onChange={(e) =>
              setUserInfo({ ...userInfo, shippingAddress: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-main-text text-white rounded-md hover:bg-main-text/90 transition-colors cursor-pointer">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default General;
