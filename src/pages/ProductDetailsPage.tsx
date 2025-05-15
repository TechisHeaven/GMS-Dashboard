import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.utils";
import { ProductInfoType } from "../types/product";
import { useAuth } from "../provider/auth.provider";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState(["Internet Of Things"]);

  const fetchProduct = async (id: string) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  };
  const fetchCatogeries = async () => {
    const response = await api.get(`/api/categories`);
    return response.data.categories;
  };
  const {
    data: fetchedProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id, // Only fetch if id exists
    staleTime: 0, // Disable caching
    gcTime: 0,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCatogeries(),
    staleTime: 0, // Disable caching
  });

  const [product, setProduct] = useState<typeof fetchedProduct | null>(
    id
      ? fetchedProduct
      : {
          price: 0,
          categories: [],
          description: "",
          discountPercentage: 0,
          images: [],
          name: "",
          sku: "",
          tags: [],
          weight: 0,
          isFeatured: false,
        }
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct: ProductInfoType) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const payload = {
      name: product?.name,
      description: product?.description,
      price:
        typeof product?.price === "string"
          ? parseFloat(product.price)
          : product?.price ?? 0,
      discountPercentage: product?.discountPercentage,
      sku: product?.sku,
      stock: product?.stock,
      categories: product?.categories,
      tags: selectedTags,
      images: product?.images,
      weight: product?.weight,
      isFeatured: product?.isFeatured,
    };

    try {
      if (id) {
        // Update existing product
        await api.put(`/api/products/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product Updated Successfully");
      } else {
        // Create new product
        await api.post(`/api/products`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product Created Successfully");
      }
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  useEffect(() => {
    if (fetchedProduct) {
      setSelectedTags(fetchedProduct.tags || []);
      setProduct(fetchedProduct);
    }
  }, [fetchedProduct]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching product details.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/products")}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              {id ? "Edit Product" : "Add Product"}
            </h1>
          </div>
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-main-text text-white rounded-lg hover:bg-main-text/90"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Product Details */}
          <div className="col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                General Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                    defaultValue={product?.name || ""}
                    id="name"
                    name="name"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                    defaultValue={product?.description || ""}
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Pricing
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Base Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-6 p-2 outline-0"
                      defaultValue={product?.price}
                      id="price"
                      name="price"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                    defaultValue={product?.discountPercentage}
                    id="discountPercentage"
                    name="discountPercentage"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Inventory
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                    defaultValue={product?.sku || ""}
                    id="sku"
                    name="sku"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                    placeholder="Type product quantity"
                    defaultValue={product?.stock || null}
                    id="stock"
                    name="stock"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                  placeholder="Type product quantity"
                  defaultValue={product?.weight || null}
                  id="weight"
                  name="weight"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Product Media */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Product Media
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {product?.images?.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setProduct((prevProduct: any) => ({
                          ...prevProduct,
                          images: prevProduct?.images?.filter(
                            (_: any, i: number) => i !== index
                          ),
                        }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className="col-span-3">
                  <input
                    type="text"
                    id="image"
                    placeholder="Enter image URL"
                    className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        setProduct((prevProduct: any) => ({
                          ...prevProduct,
                          images: [
                            ...(prevProduct?.images || []),
                            e.currentTarget.value,
                          ],
                        }));
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>
              <button
                className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-bg"
                onClick={() => {
                  const inputField =
                    document.querySelector<HTMLInputElement>("#image");
                  if (inputField && inputField.value) {
                    const imageUrl = inputField.value.trim();
                    setProduct((prevProduct: any) => ({
                      ...prevProduct,
                      images: [...(prevProduct?.images || []), imageUrl],
                    }));
                    inputField.value = "";
                  }
                }}
              >
                Add More Image
              </button>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Category
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Category
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                    value={product?.categories[0]?._id || ""}
                    onChange={(e) => {
                      const selectedCategory = categories?.find(
                        (cat: { _id: string; name: string }) =>
                          cat._id === e.target.value
                      );
                      setProduct((prevProduct: ProductInfoType) => ({
                        ...prevProduct,
                        categories: selectedCategory
                          ? [
                              {
                                _id: selectedCategory._id,
                                name: selectedCategory.name,
                              },
                            ]
                          : [],
                      }));
                    }}
                  >
                    {categories?.map((cat: { _id: string; name: string }) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Tags
                  </label>
                  <div className="mt-2 space-y-2">
                    {selectedTags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => {
                            const updatedTags = [...selectedTags];
                            updatedTags[index] = e.target.value;
                            setSelectedTags(updatedTags);
                          }}
                          className="rounded-md border-gray-300 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTags(
                              selectedTags.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedTags([...selectedTags, ""])}
                      className="mt-2 py-1 px-3 bg-main-text text-white rounded-lg hover:bg-main-text/90"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Featured */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Extra Information
              </h2>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <label
                    htmlFor="isFeatured"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Featured Product
                  </label>
                  <input
                    id="isFeatured"
                    name="isFeatured"
                    type="checkbox"
                    className="mt-1"
                    checked={product?.isFeatured || false}
                    onChange={(e) =>
                      setProduct((prevProduct: any) => ({
                        ...prevProduct,
                        isFeatured: e.target.checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
