import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Main.scss";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../Header/Header";
import { Button, TextareaAutosize } from "@material-ui/core";
import { connect } from "react-redux";
import {
  $host,
  fetchBrands,
  fetchOneGameInfo,
  fetchTypes,
  getDecodedToken,
} from "../../../helpers/functions";

const mapStateToProps = (state: any) => {
  return {
    showCaseDataDetails: state.gameReducer.showCaseDataDetails,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getShowCaseDetails: async (id: number | string) => {
      let { data } = await $host(
        `${process.env.REACT_APP_API_URL}api/game/${id}`
      );
      dispatch({
        type: "GET_SHOWCASE_DATA_DETAILS",
        payload: data,
      });
    },
  };
};

const ProductDetails = (store: any) => {
  const { id } = useParams<{id?: string}>();
  const { getShowCaseDetails, showCaseDataDetails } = store;
  let commentRef = useRef<any>(null);
  const [types, setTypes] = useState<any>(null);
  const [brands, setBrands] = useState<any>(null);
  const [info, setInfo] = useState<any>();
  const [user, setUser] = useState<any>(null);
  const [commentData, setCommentData] = useState<any>(null);

  async function getCommentData(id: number | string | undefined) {
    const { data } = await $host.get(
      `${process.env.REACT_APP_API_URL}api/comment/${id}`
    );
    console.log(data);
    return data;
  }

  async function getUserData() {
    const userData: any = await getDecodedToken();
    console.log(userData);
    setUser(userData);
  }

  async function commentsFinished(id: number | string | undefined) {
    const data = await getCommentData(id);
    setCommentData(data);
  }

  async function deleteComment(commentId: number | string, id: number | string | undefined) {
    console.log(`api/comment/${commentId}`);
    const data = await $host.delete(`api/comment/${commentId}`);
    commentsFinished(id);
  }

  useEffect(() => {
    getShowCaseDetails(id);
    fetchTypes().then((data) => setTypes(data));
    fetchBrands().then((data) => setBrands(data));
    fetchOneGameInfo(id).then((data) => setInfo(data.info[0]));
    commentsFinished(id as any);
    getUserData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    main_img: {
      alignSelf: "center",
      width: 375,
      height: 479,
      backgroundImage: `url(${process.env.REACT_APP_API_URL}${showCaseDataDetails.imageLarge})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      color: "chocolate",
      backgroundBlendMode: "multiply",
      backgroundColor: "rgba(0, 0, 0, 0.363)",
      textAlign: "center",
      transition: "0.7s",
    },
  }));

  // function showCommentSection(){
  //     return(
  //         commentData ? (commentData.map((item) => (
  //             <div id={item.createdAt}>
  //                 <span>{item.email} {item.createdAt}</span>
  //                 <p>{item.text}</p>
  //                 {user && item.userId===currentUser.email ?
  //                 (
  //                     <Button onClick={() => handleDeleteComment(id, item.time)}>Удалить комментарий</Button>
  //                 )
  //                 :
  //                 (<></>)
  //                 }
  //                 <hr/>
  //             </div>

  //             // console.log(item)
  //         )
  //         ))
  //         :
  //         (
  //             <>
  //             </>
  //         )
  //     )

  // }

  // function showButtonText() {
  //     // console.log(productDetails)
  //     return(
  //         <>
  //         { productDetails.favorites && productDetails.favorites.length > 0 && productDetails.favorites.includes(currentUser.email) ? (<>Удалить из избранного</>) : (<>Добавить в избранное</>)}
  //         </>
  //     )
  // }

  // function showLikesCount() {
  //     return (<>
  //     { productDetails.likes && productDetails.likes.length > 0 ? (productDetails.likes.length) : (<></>)}
  //     </>
  //     )
  // }

  async function handleAddComment(id: number | string | undefined, userId: number | string, userEmail: string) {
    let newComment = {
      text: commentRef?.current?.value,
      userId: userId,
      gameId: id,
      userEmail: userEmail,
    };

    const data = $host.post("api/comment", newComment);
    commentsFinished(id);
    commentRef.current.value = null;
  }

  // async function handleAddToFav(id) {
  //     let newObj = {
  //         ...productDetails
  //     };
  //     if(newObj.favorites.length > 0) {
  //         if(newObj.favorites.includes(currentUser.email)){
  //             newObj.favorites = newObj.favorites.filter(elem => elem !== currentUser.email)
  //         } else {
  //             newObj.favorites.push(currentUser.email)
  //         }
  //     }
  //     else {
  //         newObj.favorites.push(currentUser.email)
  //     }

  //     await editProduct(id, newObj, history);
  //     await getProductDetails(id)
  //   }

  // async function handleLike(id) {
  //     let newObj = {
  //         ...productDetails
  //     };
  //     if(newObj.likes.length > 0) {
  //         if(newObj.likes.includes(currentUser.email)){
  //             newObj.likes = newObj.likes.filter(elem => elem !== currentUser.email)
  //         } else {
  //             newObj.likes.push(currentUser.email)
  //         }
  //     }
  //     else {
  //         newObj.likes.push(currentUser.email)
  //     }

  //     await editProduct(id, newObj, history);
  //     await getProductDetails(id)
  //   }

  // async function handleDeleteComment(id, timeStamp) {
  //     let newObj = {
  //       ...productDetails
  //     };
  //     newObj.commentary = newObj.commentary.filter(item => item.time!==timeStamp)
  //     // console.log(id);
  //     // console.log(timeStamp);
  //     // console.log(newObj.commentary);
  //     // console.log(newObj);
  //     await editProduct(id, newObj, history);
  //     await getProductDetails(id)
  //   }

  const classes = useStyles();

  return (
    <>
      <Header />
      <div className="body_details">
        <div className="details">
          <div className="details__topBackgroung"></div>
          {/* <ul className="one">
                <li>Главная</li>
                <li>Каталог</li>
            </ul> */}
          <h1>{showCaseDataDetails.name}</h1>
          <div className="main__Container">
            <div className="main_menu_left">
              <div className={`${classes.main_img} main_img`}>
                {/* <div className='asd'> */}
                <p>трейлер и скриншоты</p>
              </div>
              <div className="main_info">
                <p>
                  Жанр{" "}
                  <span>
                    {types
                      ? types.map((type: any, index: number) => {
                          if (type.id === showCaseDataDetails.typeId)
                            return types[index].name;
                        })
                      : "Жанр (typeId)"}
                  </span>
                </p>
                <p>
                  Язык <span>Английский, Русский</span>
                </p>
                <p>
                  Издатель{" "}
                  <span>
                    {brands
                      ? brands.map((brand: any, index: number) => {
                          if (brand.id === showCaseDataDetails.brandId)
                            return brands[index].name;
                        })
                      : "Издатель (brandId)"}
                  </span>
                </p>
                <p>
                  Цель <span>Достижения</span>
                </p>
                <p>
                  Регион <span>Россия</span>
                </p>
              </div>
            </div>
            <div className="mains_menu_right">
              <div className="mains_price_menu">
                <div className="mains_info">
                  <ul>
                    <li>
                      Наличие:{" "}
                      <span>
                        {showCaseDataDetails.countInStock >= 1
                          ? "Много"
                          : "Ожидается"}
                      </span>
                    </li>
                    <li>Моментальная доставка</li>
                    <li>
                      Лицензионный <span>ключ</span> активации
                    </li>
                    <li>Регион: Россия</li>
                    <li>Накопительная скидка до 10%</li>
                  </ul>
                </div>
                <div className="vse">
                  <div className="mains_price">
                    <div className="mains_price_one">
                      <p>
                        {showCaseDataDetails &&
                          Math.ceil(
                            (showCaseDataDetails.price /
                              showCaseDataDetails.oldPrice -
                              1) *
                              100
                          )}
                        %
                      </p>
                    </div>
                    <div className="main_price_two">
                      <del>{showCaseDataDetails.oldPrice}с</del>
                      <h2>{showCaseDataDetails.price}с</h2>
                    </div>
                  </div>
                  <div className="btn_offset">
                    <button
                      //    onClick={() => {addProductToCart(productDetails)}}
                      className="offset"
                    >
                      В корзину
                    </button>
                  </div>
                  <div className="two_btn">
                    {/* {currentUser ? (
                            <button 
                            // onClick={() => handleAddToFav(id)}
                            className="fill"
                            >
                                {currentUser ? (
                                    // showButtonText()
                                    <></>
                                )
                                    :
                                (<>Добавить в избранное</>)
                                }
                                </button>
                                
                            )
                            :
                            (
                            <Link exact to="/login">
                            <button className="fill">
                            Добавить в избранное
                            </button>
                            </Link>)
                        
                        } */}
                    {/* <button className="fill">Поставить Лайк</button> */}
                    {/* {currentUser ? (
                                <Button
                                onClick={() => handleLike(id)}
                                ><FavoriteIcon />
                                {showLikesCount()}
                                </Button>

                            )
                            :
                            (
                                <Link exact to="/login"><Button><FavoriteIcon />
                                 {showLikesCount()}
                                </Button></Link>
                            )
                            } */}
                  </div>
                </div>
              </div>

              <div className="nakonecto">
                <p>
                  Максимальное время ожидания ключа - до 5 часов. <br />
                  Если вы приобрели продукт с 21.00 до 10.00 по Московскому
                  времени, то ваш заказ будет <br /> укомплектован после 10.00.
                </p>
                <h2>Описание</h2>
                <p>{info && info.description}</p>
              </div>
              <div className="nakonecto2">
                <h2>Комментарии</h2>
                {commentData &&
                  commentData.map((comment: any) => (
                    <div id={comment.createdAt}>
                      <span>
                        {comment.userEmail} {comment.createdAt}
                      </span>
                      <p>{comment.text}</p>
                      {user && comment.userId === user.id ? (
                        <Button onClick={() => deleteComment(comment.id, id)}>
                          Удалить комментарий
                        </Button>
                      ) : (
                        <></>
                      )}
                      <hr />
                    </div>
                  ))}
                {/* {showCommentSection()} */}
                <TextareaAutosize
                  className="inp-type__input"
                  ref={commentRef}
                  placeholder="Введите комментарий"
                />
                <Button
                  onClick={() => handleAddComment(id, user.id, user.email)}
                >
                  Добавить комментарий
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
