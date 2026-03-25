import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../../api/Productapi";
import type { Products } from "../../../Types/product";
import { ChevronDown } from "lucide-react";
import Skeleton from "./ProductSkeleton";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<Products | null>(null);
  const [selectImage, setSelectedImage] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fullStars = Math.floor(product?.rating ?? 0);
  const emptyStars = 5 - fullStars;

  const productbyId = async () => {
    try {
      setLoading(true);
      const res = await api.get(`products/${id}`);
      setProducts(res.data);
      console.log(res);
      setSelectedImage(res.data.images[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productbyId();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-7xl mx-auto">
          <div className="order-1 lg:order-2 flex-1 max-w-xl w-full">
            <div className="bg-neutral-200/70 ">
              <Skeleton className="w-full  max-h-96 object-contain rounded" />
            </div>
          </div>

          <div className=" order-2 lg:order-1 flex lg:flex-col flex-row gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-96">
            <Skeleton className="w-20 h-10 object-cover rounded cursor-pointer bg-neutral-200" />
            <Skeleton className="w-20 h-10 object-cover rounded cursor-pointer bg-neutral-200" />
            <Skeleton className="w-20 h-10 object-cover rounded cursor-pointer bg-neutral-200" />
          </div>

          <div className="order-3 flex-1 min-w-0">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <Skeleton className="w-2xl lg:w-3xl h-14"></Skeleton>
              <Skeleton className="w-sm lg:w-lg h-14"></Skeleton>
            </div>

            <Skeleton className="w-20 h-14"></Skeleton>

            <div className="flex flex-wrap gap-6 items-center py-4">
              <Skeleton className="w-2xl lg:w-3xl"></Skeleton>
              <Skeleton className="w-2xl lg:w-3xl"></Skeleton>
              <Skeleton className="w-2xl lg:w-3xl"></Skeleton>
            </div>

            <div className="w-full max-w-2xl rounded shadow cursor-pointer">
              <div className="p-6 mb-3" onClick={() => setOpen(!open)}>
                <Skeleton className="w-3xl h-36"></Skeleton>
                
              </div>
            </div>

            <div className="mt-10">
            <Skeleton className="w-2xl "></Skeleton>

              
            </div>
          </div>

        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-7xl mx-auto">
          <div className="order-1 lg:order-2 flex-1 max-w-xl w-full">
            <div className="shadow rounded-xl bg-neutral-200/70 p-4">
              <img
                src={selectImage}
                alt={product?.thumbnail}
                className="w-full h-auto max-h-96 object-contain rounded"
              />
            </div>
          </div>

          <div className=" order-2 lg:order-1 flex lg:flex-col flex-row gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-96">
            {product?.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`image ${idx + 1}`}
                className="w-20 h-20 object-cover rounded cursor-pointer bg-neutral-200"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="order-3 flex-1 min-w-0">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h1 className="text-2xl lg:text-3xl font-bold">
                {product?.title}
              </h1>

              <p className="text-yellow-500 text-lg">
                {"⭐".repeat(fullStars)} {"☆".repeat(emptyStars)}
              </p>
            </div>

            <p className="italic mt-1">By {product?.brand}</p>

            <div className="flex flex-wrap gap-6 items-center py-4">
              <p className="text-2xl font-semibold">${product?.price}</p>

              <p className="text-red-400">
                ({product?.discountPercentage}% OFF)
              </p>

              {product?.stock > 0 ? (
                <p className="text-cyan-600 font-medium">In Stock</p>
              ) : (
                <p className="text-red-600 font-medium">Out of Stock</p>
              )}
            </div>

            <div className="w-full max-w-2xl bg-neutral-200 shadow cursor-pointer">
              <div className="py-2 mb-3" onClick={() => setOpen(!open)}>
                <h2 className="font-bold text-xl flex items-center gap-2">
                  Additional Information
                  <ChevronDown
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </h2>

                {open && (
                  <ul className="py-3 text-base space-y-1">
                    <li>Description: {product?.description}</li>
                    <li>
                      Dimensions:{" "}
                      {`${product?.dimensions.depth} × ${product?.dimensions.height} × ${product?.dimensions.width}`}
                    </li>
                    <li>Category: {product?.category}</li>
                    <li>Warranty: {product?.warrantyInformation}</li>
                    <li>Weight: {product?.weight}</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl lg:text-2xl py-5 font-semibold mb-6">
                Reviews ({product?.reviews?.length})
              </h2>

              <div className="flex flex-col gap-4">
                {product?.reviews.map((review, index) => (
                  <div key={index} className="p-4 rounded-lg shadow bg-white">
                    <div className="flex justify-between flex-wrap gap-2">
                      <p className="font-semibold">{review.reviewerName}</p>
                      <p className="text-yellow-500">
                        {"⭐".repeat(Math.floor(review.rating))}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>

                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>

              <p className="text-right mt-6 font-semibold">
                {product?.shippingInformation}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
