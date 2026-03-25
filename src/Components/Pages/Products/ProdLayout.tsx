import { useEffect, useState } from "react";
import api from "../../../api/Productapi.js";
import type { Category, Products } from "../../../Types/product.js";
import { ProductCard } from "./ProductCard.js";
import { Link, useSearchParams } from "react-router";
import { Pagination } from "../Pagination.js";
import { X, Search } from "lucide-react";

export interface ProdListProp {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
export const ProdLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  // const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);

  const selectedCategory = searchParams.get("category") || "";
  const page = Number(searchParams.get("page") || 1);

  // api for get products
  const getProd = async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;

      let res;
      if (debouncedQuery) {
        res = await api.get(
          `products/search?q=${debouncedQuery}&limit=${limit}&skip=${skip}`,
        );
        console.log("search query 1", res.data);
      } else if (selectedCategory === "") {
        res = await api.get(`/products?limit=${limit}&skip=${skip}`);
      } else {
        res = await api.get(
          `/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`,
        );
      }

      const data = res.data;
      setProducts(data.products);
      console.log("Data", data);

      setTotal(data.total);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //api for getting all categories
  const getCategory = async () => {
    const res = await api.get("/products/categories");
    // console.log("categories", res.data);
    setCategory(res.data);
  };

  const clearQuery = () => {
    setQuery("");
  };

  useEffect(() => {
    if (query && debouncedQuery.length < 3) return;

    getProd();
  }, [page, selectedCategory, debouncedQuery]);

  useEffect(() => {
    getCategory();
  }, []);

  //pagination logic
  const totalPages = Math.ceil(total / limit);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ category: e.target.value, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      category: selectedCategory || "",
      page: newPage.toString(),
    });
  };

  return (
    <>
      <div className="px-3 py-5">
        {/* <div className="flex flex-col gap-4 md:flex-row md:justify-between "> */}
        <div className="flex gap-4 w-full min-w-0 pb-4">
          <h1
            className="text-xl md:text-2xl lg:text-4xl 
        font-bold  tracking-wide"
          >
            Our Products
          </h1>
        </div>

        <div className="flex flex-col sm:flex-col md:flex-row gap-2 md:items-center w-full md:w-auto justify-between">
          <select
            name="categories"
            value={selectedCategory}
            onChange={handleChange}
            className="w-full max-w-full sm:w-64 md:w-56 lg:w-64 pr-2 py-2
          rounded text-sm lg:text-lg h-10 md:h-11 lg:h-12
          border border-neutral-400
          bg-neutral-200/70 shadow-md"
          >
            <option value="" disabled hidden>
              Categories
            </option>

            {category.map((item) => (
              <option key={item.slug} value={item.slug} >
                {item.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2 justify-between">
            <div className="relative w-full md:w-auto lg:w-96 ">
              <Search
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="text"
                placeholder="Search Products"
                className="h-10 w-full border border-neutral-400 px-9
          rounded text-lg bg-neutral-200/70"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {query && (
                <button
                  type="button"
                  onClick={clearQuery}
                  className="absolute right-3 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <Link
              to="/products/addproduct"
              className="h-10 px-5 flex items-center justify-center sm:w-36  
        bg-neutral-200/70 border border-neutral-400 
        rounded text-lg  font-semibold
        hover:bg-neutral-200 transition"
            >
              Add
            </Link>
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="flex-col flex ">
        {loading ? (
          <ol className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: limit }).map((_, idx) => (
              <ProductCard key={idx} loading={true} />
            ))}
          </ol>
        ) : debouncedQuery && products.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-red-800 text-xl font-bold">
              No products found for "{query}"
            </p>
          </div>
        ) : (
          <ol className=" grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3  ">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} loading={false} />
            ))}
          </ol>
        )}
      </div>
      {products.length > 0 && (
        <footer className="flex justify-center gap-4 pt-5 pb-5 ">
          <Pagination
            currentpage={page}
            totalpages={totalPages}
            onPageChange={handlePageChange}
          ></Pagination>
        </footer>
      )}
    </>
  );
};
