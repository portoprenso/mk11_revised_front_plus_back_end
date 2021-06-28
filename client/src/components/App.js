import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import RosterContextProvider from "../contexts/RosterContext";
import ProductsContextProvider from "../contexts/ProductsContext";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import HomePage from "./HomePage/HomePage";
import RosterPage from "./RosterPage/RosterPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import StorePage from "./StoreBlock/StorePage/StorePage.jsx";
import ProductDetails from "./StoreBlock/StorePage/ProductDetails";
import Cart from "./StoreBlock/Cart/Cart";
import EditProduct from "./StoreBlock/StorePage/EditProduct";
import Chat from "../components/ChatBlock/Chat";
import CheckoutPage from "./StoreBlock/Cart/CheckoutPage";
import Buy from "./StoreBlock/Cart/Buy/Buy";
import Gallery from "./Gallery/Gallery";
import ShowCase from "./ShowCase/ShowCase";
// import { connect } from "react-redux";
// import store from "../store/store";
// import axios from "axios";

let JSON_API = "http://localhost:8000";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#fda90f",
        },
        secondary: {
            main: "#e30000",
        },
        warning: {
            main: "#e30000",
        },
    },
});

// const mapStateToProps = (state) => {
//     console.log(state);
//     return {
//         state: state,
//         rosterData: state.rosterReducer.rosterData,
//         productsData: state.rosterReducer.productsData,
//         fighterInfo: state.rosterReducer.fighterInfo,
//         getFighterInfo: state.rosterReducer.getFighterInfo,
//         productInfo: state.rosterReducer.productInfo,
//         productsData: state.productReducer.productsData,
//         productDetails: state.productReducer.productDetails,
//         paginationPages: 1,
//         cart: state.productReducer.cart,
//         dataLimit: 8,
//     };
// };


// const mapDispatchToProps = (dispatch) => ({
//     getRosterData: async () => {
//         let { data } = await axios(`${JSON_API}/roster`);
//         dispatch({
//             type: "GET_ROSTER_DATA",
//             payload: data,
//         });
//     },
//     getProductsData: async () => dispatch({ type: "GET_PRODUCTS_DATA" }),
// });

function App(store) {
    return (
        <div
            style={{
                backgroundColor: "black",
            }}
        >
            <Router>
                <MuiThemeProvider theme={theme}>
                    <RosterContextProvider>
                        <AuthProvider>
                            <ProductsContextProvider>
                                <Switch>
                                    <PrivateRoute
                                        exact
                                        path="/profile"
                                        component={ProfilePage}
                                    />
                                    <PrivateRoute
                                        path="/update-profile"
                                        component={UpdateProfile}
                                    />
                                    <PrivateRoute
                                        exact
                                        path="/chat/"
                                        component={Chat}
                                    />
                                    <PrivateRoute
                                        exact
                                        path="/buy/"
                                        component={Buy}
                                    />
                                    <PrivateRoute
                                        exact
                                        path="/checkout/"
                                        component={CheckoutPage}
                                    />
                                    <PrivateRoute
                                        exact
                                        path="/store/editproduct/:id"
                                        component={EditProduct}
                                    />
                                    <Route path="/signup" component={SignUp} />
                                    <Route path="/login" component={Login} />
                                    <Route
                                        path="/forgot-password"
                                        component={ForgotPassword}
                                    />
                                    <Route
                                        exact
                                        path="/"
                                        component={HomePage}
                                    />
                                    <Route
                                        exact
                                        path="/test_prod"
                                        component={ShowCase}
                                    />
                                    <Route
                                        exact
                                        path="/roster"
                                        component={RosterPage}
                                    />
                                    <Route
                                        exact
                                        path="/store"
                                        component={StorePage}
                                    />
                                    <Route
                                        exact
                                        path="/store/gamedetails/:id"
                                        component={ProductDetails}
                                    />
                                    <Route
                                        exact
                                        path="/cart"
                                        component={Cart}
                                    />
                                    <Route
                                        exact
                                        path="/gallery"
                                        component={Gallery}
                                    />
                                    <Redirect exact to="/" />
                                </Switch>
                            </ProductsContextProvider>
                        </AuthProvider>
                    </RosterContextProvider>
                </MuiThemeProvider>
            </Router>
        </div>
    );
}

export default App;