import ProtectedRoute from "./tools/protectedroute"; // Adjust the path accordingly

import Home from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Privacy from "./pages/privacy";
import AdminDashboard from "./pages/admin/dashboard";
import Edituserdata from "./pages/admin/user/edituserdata";
import Dieren from "./pages/admin/dieren/dieren";
import AddDier from "./pages/admin/dieren/adddier";
import EditDier from "./pages/admin/dieren/editdier";
import DeleteDier from "./pages/admin/dieren/deletedier";
import KlantDashboard from "./pages/customer/dashboard";
import Yourdata from "./pages/customer/yourdata";
import Edityourdata from "./pages/customer/edityourdata";
import Userdata from "./pages/admin/user/userdata";
import YourPets from "./pages/customer/yourpets";
import EditYourPet from "./pages/customer/edityourpet";
import AddYourPet from "./pages/customer/addyourpet";
import DeleteYourPet from "./pages/customer/deleteyourpet";
import ProductDashboard from "./pages/admin/product/productDashboard";
import DeleteProduct from "./pages/admin/product/deleteProduct";
import AddProduct from "./pages/admin/product/addProduct";
import EditProduct from "./pages/admin/product/editProduct";
import Products from "./pages/customer/productsView";
import BrandDashboard from "./pages/admin/brand/brandDashboard";
import AddBrand from "./pages/admin/brand/addBrand";
import EditBrand from "./pages/admin/brand/editBrand";
import DeleteBrand from "./pages/admin/brand/deleteBrand";
import VariantDashboard from "./pages/admin/variant/variantDashboard";
import AddVariant from "./pages/admin/variant/addVariant";
import DeleteVariant from "./pages/admin/variant/deleteVariant";
import EditVariant from "./pages/admin/variant/editVariant";
import AddAnimal from "./pages/admin/dieren/addAnimal";

export const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/privacy",
    component: <Privacy />,
  },
  {
    path: "/yourdata",
    component: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <Yourdata />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edityourdata",
    component: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <Edityourdata />
      </ProtectedRoute>
    ),
  },
  {
    path: "/yourpets",
    component: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <YourPets />
      </ProtectedRoute>
    ),
  },
  {
    path: "/productCostumer",
    component: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <Products />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addyourpet",
    component: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <AddYourPet />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edityourpets/:id",
    component: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <EditYourPet />
      </ProtectedRoute>
    ),
  },
  {
    path: "/deleteyourpet/:id",
    component: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <DeleteYourPet />
      </ProtectedRoute>
    ),
  },
  {
    path: "/klantDashboard",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <KlantDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminDashboard",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminDieren",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Dieren />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminaddDier",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AddDier />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addAnimal",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AddAnimal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminEditDier/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <EditDier />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminDeleteDier/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DeleteDier />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userdata",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Userdata />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edituserdata/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Edituserdata />
      </ProtectedRoute>
    ),
  },
  {
    path: "/productdata",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <ProductDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminAddProduct/",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminEditProduct/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <EditProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminDeleteProduct/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DeleteProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/branddata",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <BrandDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminAddBrand",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AddBrand />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminEditBrand/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <EditBrand />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminDeleteBrand/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DeleteBrand />
      </ProtectedRoute>
    ),
  },
  {
    path: "/variantdata",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <VariantDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminAddVariant",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AddVariant />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminEditVariant/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <EditVariant />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminDeleteVariant/:id",
    component: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DeleteVariant />
      </ProtectedRoute>
    ),
  },
];
