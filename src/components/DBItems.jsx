import DataTable from "./DataTable";
import { BsCurrencyEuro } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";
import {
  alertNULL,
  alertSuccess,
} from "../context/actions/alertActions";
import { useEffect } from "react";

const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
        console.log(data);
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <DataTable
        data={products || []}
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
                alt=""
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-center">
                <BsCurrencyEuro className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("You want to edit" + rowData.productId);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are you sure, you want to perform this action")
              ) {
                deleteProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Product Deleted"));
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                    setInterval(() => {
                      dispatch(alertNULL());
                    }, 3000);
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
