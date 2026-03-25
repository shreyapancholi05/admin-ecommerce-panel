import type { Products } from "../../../Types/product";
import Skeleton from "./ProductSkeleton";
import { Link } from "react-router";
import Slider from "react-slick";
import { useNavigate } from "react-router";

interface ProdProps {
  product?: Products;
  loading: boolean;
}

export const ProductCard = ({ product, loading }: ProdProps) => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    speed: 500,
  };

  return (
    <>
      {loading ? (
        <div className="shadow-md px-3 py-5 lg:px-5 pl-3 pr-3 md:px-5 lg:py-4 bg-neutral-100/50 rounded-lg">
          <div className="flex justify-center py-4">
            <Skeleton className="w-full md:w-1/2 lg:w-96 h-65 lg:h-80 rounded bg-neutral-200/50" />
          </div>

          <div className="flex  py-2 ">
            <Skeleton className="h-4 w-full mb-2" />
          </div>

          <div className="flex gap-4 flex-col mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className=" py-2">
            <Skeleton className="w-16 h-5" />
          </div>
        </div>
      ) : (
        <div className="px-3 py-3 pl-3 pr-3">
          <div className="py-2 px-2 md:py-5 lg:px-5 md:px-3 lg:py-7 bg-white flex flex-col h-full ">
            <Link to={`${product?.id}`} className="flex flex-col h-full">
              {product?.images?.length ? (
                <Slider {...settings}>
                  {product?.images?.map((src, index) => (
                    <img
                      key={index}
                      src={src}

                      alt={`Product image ${index + 1}`}
                      className="object-contain lg:h-96 md:h-80 sm:h-64 w-full"
                    />
                  ))}
                </Slider>
              ) : (
                product?.thumbnail(
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain md:h-96 h-52 w-full"
                  />,
                )
              )}
              <div className="flex  flex-col ">
                <div className="w-3/4">
                  <p className="font-semibold sm:text-lg md:text-xl lg:text-2xl mt-3 line-clamp-2 min-h-10">
                    {product?.title}
                  </p>
                </div>
                <div>
                  <p className="md:font-semibold md:text-lg sm:text-sm capitalize lg:text-xl ">
                    {product?.category}
                  </p>
                </div>
                <div className="md:flex md:justify-between  ">
                  <div className="flex gap-1 mt-2 py-2 ">
                    <p className="font-semibold sm:text-lg md:text-xl lg:text-2xl">
                      ${product?.price}
                    </p>
                    <p className="text-sm text-red-400 pt-0.5 lg:pt-0.5 lg:text-xl">
                      ({product?.discountPercentage}% off)
                    </p>
                  </div>

                  <div className="flex items-center justify-end ">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/edit/${product?.id}`);
                      }}
                      className="px-4 md:px-6
                       h-8 rounded text-xl font-semibold border-neutral-400 border bg-neutral-200/50 " 
                    >
                      {" "}
                      Edit
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
