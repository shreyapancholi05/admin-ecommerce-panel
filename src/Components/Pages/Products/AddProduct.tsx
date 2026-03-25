import { Form, Formik, Field, ErrorMessage } from "formik";
import api from "../../../api/Productapi";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { useParams } from "react-router";
import type { Category } from "../../../Types/product";
import * as Yup from "yup";

const AddProduct = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category[]>([]);
  const editMode = Boolean(id);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    rating: "",
    category: "",
  });

  const validateSchema = Yup.object({
    title: Yup.string().required("Required Field"),
    description: Yup.string().required("Required Field"),
    price: Yup.number().required("Required Field"),
    stock: Yup.string().required("Required Field"),
    rating: Yup.number().required("Required Field"),
    category: Yup.string().required("Required Field")
  })

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get("products/categories");
        setCategory(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    if (editMode) {
      const fetch = async () => {
        try {
          const res = await api.get(`/products/${id}`);
          const data = res.data;

          setInitialValues({
            title: data.title || "",
            description: data.description || "",
            price: data.price?.toString() || "",
            stock: data.stock?.toString() || "",
            rating: data.rating?.toString() || "",
            category: data.category || "",
          });
        } catch (error) {
          console.error("Error :", error);
        }
      };

      fetch();
    }
  }, [id, editMode]);

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      if (editMode) {
        const res = await api.put(`/products/${id}`, {
          ...values,
          price: Number(values.price),
          stock: Number(values.stock),
          rating: Number(values.rating),
        });

        console.log("Updated:", res.data);
        setSuccess(true);
      } else {
        const res = await api.post("/products/add", {
          ...values,
          price: Number(values.price),
          stock: Number(values.stock),
          rating: Number(values.rating),
        });

        console.log("Added:", res.data);
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      {loading ? (
        <div className="animate-pulse" >
          Loading....
        </div>
      ) : success ? (
        <div className="flex justify-center items-center font-bold text-green-800 text-3xl mt-10">
          <span className="flex flex-row gap-2">
            {editMode
              ? "Product updated Successfully!"
              : "Product Added Successfully"}
            <Rocket size={30} />
          </span>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center ">
          <h1 className="font-bold text-2xl py-10">
            {editMode ? "Edit Product" : "Add Product"}
          </h1>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            
            <Form className="flex flex-col bg-neutral-200/70  rounded p-4 gap-2 shadow-md">
              <h1 className="font-bold text-lg ">
                {editMode ? "Provide details for the existing product" : "Provide details to add new product"}
              </h1>

              <label>Product Title</label>
              <Field className="border p-1 rounded" name="title" type="text" />
              <ErrorMessage name="title" className="text-red-700  text-sm"></ErrorMessage>

              <label>Product Description</label>
              <Field
                className="border p-1 rounded"
                name="description"
                type="text"
              />
              <ErrorMessage name="description" className="text-red-700  text-sm"></ErrorMessage>
              <label>Category</label>
              <Field as="select" className="border p-1 rounded" name="category">
                <option value="">Select Category</option>
                {category.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" className="text-red-700  text-sm"></ErrorMessage>

              <label>Price</label>
              <Field
                className="border p-1 rounded"
                name="price"
                type="number"
              />
              <ErrorMessage name="price" className="text-red-700  text-sm"></ErrorMessage>

              <label>Stock Availability</label>
              <Field
                className="border p-1 rounded"
                name="stock"
                type="text"
              />
              <ErrorMessage name="stock" className="text-red-700  text-sm"></ErrorMessage>

              <label>Rating</label>
              <Field
                className="border p-1 rounded"
                name="rating"
                type="number"
              />
              <ErrorMessage name="rating" className="text-red-700  text-sm"></ErrorMessage>

              <button
                type="submit"
                className="border p-2 mt-3 rounded hover:bg-neutral-400 cursor-pointer"
              >
                {editMode ? "Update Product" : "Submit"}
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default AddProduct;
