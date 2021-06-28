import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useProducts } from "../../../contexts/ProductsContext";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

function calcTotalPrice(products) {
  let totalPrice = 0;
  products.forEach((item) => {
    totalPrice += item.subPrice;
  });
  return totalPrice;
}

const useStyles = makeStyles((theme) => ({
  checkout__root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    margin: "0 auto",
    paddingTop: 50,
    color: "white",
    backgroundImage:
      "url(https://cdn-prod.mortalkombat.com/ultimate/purchase/purchase-bg.webp)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    border: "black solid 1px",
    padding: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    ["@media(max-width: 780px)"]: {
      padding: 5,
    },
    ["@media(max-width: 600px)"]: {
      width: `100% !important`,
    },
  },
  textfieldsCommentary: {
    letterSpacing: 1,
  },
  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    ["@media(max-width: 600px)"]: {
      flexDirection: "column",
    },
  },
  tdItem: {
    padding: "10px!important",
  },
  tableSumHeader: {
    justifySelf: "center",
    textAlign: "center",
  },
  textFieldsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  textfields__item: {
    margin: "10px auto",
  },
  checkoutCart: {},
}));

const CheckoutPage = () => {
  const { getCart, cart, changeProductCount, removeProductFromCart } =
    useProducts();
  const { currentUser } = useAuth();
  const classes = useStyles();
  const nameRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const commentaryRef = useRef("asd");
  const history = useHistory();

  const handleChange = async (email) => {
    let { data } = await axios("http://localhost:8000/dbUsers");
    cart.comment = commentaryRef.current.children[1].children[0].value;
    await data.forEach((item) => {
      console.log(commentaryRef.current.children[1].children[0].value);
      if (email == item.email) {
        let newUser = {
          name: item.name,
          phone: item.phone,
          mail: item.mail,
          orders: [...item.orders, cart],
        };
        axios.patch(`http://localhost:8000/dbUsers/${item.id}`, newUser);
      } else {
        let newUser = {
          name: nameRef.current.children[1].children[0].value,
          phone: phoneRef.current.children[1].children[0].value,
          mail: mailRef.current.children[1].children[0].value,
          orders: [cart],
        };
        axios.post("http://localhost:8000/dbUsers", newUser);
      }
    });
    console.log(cart);
    history.push("/buy");
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Header />
      <Grid xs={11} className={classes.checkout__root}>
        <Typography variant="h2">Оформление заказа</Typography>
        <Grid className={classes.mainContainer}>
          <Grid lg={8} xl={12} className={classes.leftContainer}>
            <Typography className={classes.textfieldsCommentary}>
              Заполните простую форму и наши менеджеры свяжутся с вами, ответят
              на любые вопросы.
            </Typography>
            <form noValidate autoComplete="off">
              <div className={classes.textFieldsContainer}>
                <TextField
                  ref={nameRef}
                  className={classes.textfields__item}
                  required
                  id="outlined-required"
                  label="Обязательно"
                  defaultValue="Ваше имя"
                  variant="outlined"
                />
                <TextField
                  ref={phoneRef}
                  className={classes.textfields__item}
                  required
                  id="outlined-required"
                  label="Обязательно"
                  defaultValue="Телефон"
                  variant="outlined"
                />
                <TextField
                  ref={mailRef}
                  className={classes.textfields__item}
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  id="outlined-required"
                  label="Обязательно"
                  defaultValue={currentUser.email}
                  variant="outlined"
                />
                <TextField
                  ref={commentaryRef}
                  className={classes.textfields__item}
                  id="outlined-helperText"
                  label="Комментарий к заказу"
                  defaultValue="..."
                  variant="outlined"
                />
              </div>
            </form>

            <Button
              onClick={() => handleChange(currentUser.email)}
              color="primary"
              variant="contained"
            >
              Оплатить
            </Button>
          </Grid>
          <Grid xs={4} className={classes.rightContainer}>
            <div className={classes.checkoutCart}>
              {cart.products ? (
                <div>
                  <table>
                    <tbody>
                      {cart.products.map((elem) => (
                        <tr key={elem.item.id}>
                          <li className={classes.tdItem}>
                            Название: <strong>{elem.item.title}</strong>
                          </li>
                          <li className={classes.tdItem}>
                            Цена: <strong>{elem.item.price}с</strong>
                          </li>
                          <li className={classes.tdItem}>
                            Количество:{" "}
                            <input
                              min={0}
                              onChange={(e) =>
                                changeProductCount(e.target.value, elem.item.id)
                              }
                              type="number"
                              value={elem.count}
                            />
                          </li>
                          <li className={classes.tdItem}>
                            Предварительный итог:{" "}
                            <strong>{elem.subPrice}с</strong>
                          </li>
                          <hr />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h4 className={classes.tableSumHeader}>
                    Общий итог: {calcTotalPrice(cart.products)}
                  </h4>
                </div>
              ) : (
                <CircularProgress />
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default CheckoutPage;
