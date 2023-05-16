import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import { getAllUsers } from "../api";
import DataTable from "./DataTable";
import { Avatar } from "../assets";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const list = () => {
    const data = allUsers || [] || []
    return data;
  };

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
        console.log(data);
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.photoURL ? rowData.photoURL : Avatar}
                className="w-32 h-16 object-contain rounded-md"
                alt=""
              />
            ),
          },
          {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Verified",
            field: "email",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md 
              ${rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"}`}
              >
                {rowData.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={list()}
        title="List of Users"

        /*         actions={[
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
        ]} */
      />
    </div>
  );
};

export default DBUsers;
