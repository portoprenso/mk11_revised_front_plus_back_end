import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import './ProductDetails.css'
import { makeStyles } from '@material-ui/core/styles';
import { useProducts } from '../../../contexts/ProductsContext';
import Header from '../../Header/Header';
import { Button, TextareaAutosize } from '@material-ui/core';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { $host, fetchBrands, fetchOneGameInfo, fetchTypes, getDecodedToken } from '../../../helpers/functions';

const mapStateToProps = (state) => {
    return{
        showCaseDataDetails: state.productReducer.showCaseDataDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getShowCaseDetails: async (id) => {
            let { data } = await $host(`${process.env.REACT_APP_API_URL}api/game/${id}`)
            dispatch({
                type: 'GET_SHOWCASE_DATA_DETAILS',
                payload: data
            })
            // console.log(data)
        }
    }
}


const ProductDetails = (store) => {
    const history = useHistory()
    const { id } = useParams()
    const { addProductToCart, editProduct } = useProducts()
    const { getShowCaseDetails, showCaseDataDetails } = store
    // const { currentUser } = useAuth()
    let commentRef = useRef(null)
    const [types, setTypes] = useState()
    const [brands, setBrands] = useState()
    const [info, setInfo] = useState()
    const [user, setUser] = useState(null)
    const [commentData, setCommentData] = useState(null)

    async function getCommentData(id) {
        const {data} = await $host.get(`${process.env.REACT_APP_API_URL}api/comment/${id}`)
        console.log(data)
        return data
    }

    async function getUserData(){
        const userData = await getDecodedToken()
        console.log(userData)
        setUser(userData)
    }


    async function commentsFinished(id){
        const data = await getCommentData(id)
        setCommentData(data)
    }
    
    async function deleteComment(commentId, id){
        console.log(`api/comment/${commentId}`)
        const data = await $host.delete(`api/comment/${commentId}`)
        commentsFinished(id)
    }

    useEffect(() => {
        getShowCaseDetails(id);
        fetchTypes().then(data => setTypes(data));
        fetchBrands().then(data => setBrands(data));
        fetchOneGameInfo(id).then(data => setInfo(data.info[0]))
        commentsFinished(id)
        getUserData()
    }, [])
    

    
    const useStyles = makeStyles((theme) => ({
        main_img:{
            alignSelf: 'center',
            width: 375,
            height: 479,
            backgroundImage: `url(${process.env.REACT_APP_API_URL}${showCaseDataDetails.imageLarge})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            color: 'chocolate',
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(0, 0, 0, 0.363)',
            textAlign: 'center',
            transition: '0.7s'
        }
    }));

    // function showCommentSection(){
    //     return(
    //         commentData ? (commentData.map((item) => (
    //             <div id={item.createdAt}>
    //                 <span>{item.email} {item.createdAt}</span>
    //                 <p>{item.text}</p>
    //                 {user && item.userId===currentUser.email ? 
    //                 (
    //                     <Button onClick={() => handleDeleteComment(id, item.time)}>?????????????? ??????????????????????</Button>
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
    //         { productDetails.favorites && productDetails.favorites.length > 0 && productDetails.favorites.includes(currentUser.email) ? (<>?????????????? ???? ????????????????????</>) : (<>???????????????? ?? ??????????????????</>)}
    //         </>
    //     )
    // }

    // function showLikesCount() {
    //     return (<>
    //     { productDetails.likes && productDetails.likes.length > 0 ? (productDetails.likes.length) : (<></>)}
    //     </>
    //     )
    // }

    async function handleAddComment(id, userId, userEmail) {
        let newComment = {
            text: commentRef.current.value,
            userId: userId,
            gameId: id,
            userEmail: userEmail,
        }

        const data = $host.post('api/comment', newComment)
        commentsFinished(id)
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

    const classes = useStyles()

    return (
        <>
        <Header/>
        <div className="body_details">
            <div className="details" >
            <div className="details__topBackgroung"></div>
            {/* <ul className="one">
                <li>??????????????</li>
                <li>??????????????</li>
            </ul> */}
            <h1>{showCaseDataDetails.name}</h1>
            <div className="main__Container">
                <div className="main_menu_left">

                    <div className={`${classes.main_img} main_img`}>
                    {/* <div className='asd'> */}
                        <p>?????????????? ?? ??????????????????</p>
                    </div>
                    <div className="main_info">
                        <p>???????? <span>
                        {types
                            ? types.map((type, index) => {
                                if (type.id === showCaseDataDetails.typeId)
                                  return types[index].name;
                              })
                            : "???????? (typeId)"}
                            </span></p>
                        <p>???????? <span>????????????????????, ??????????????</span></p>
                        {/* <p>???????? ???????????? <span>18 ???????? 2012</span></p> */}
                        <p>???????????????? <span>
                        {brands
                            ? brands.map((brand, index) => {
                                if (brand.id === showCaseDataDetails.brandId)
                                  return brands[index].name;
                              })
                            : "???????????????? (brandId)"}
                            </span></p>
                        {/* <p>?????????????????????? <span>?????? ???????????? ????????????</span></p> */}
                        <p>???????? <span>????????????????????</span></p>
                        <p>???????????? <span>????????????</span></p>
                    </div>

                </div>
                <div className="mains_menu_right">
                    <div className="mains_price_menu">
                        <div className="mains_info">
                            <ul>
                                <li>??????????????: <span>{
                                showCaseDataDetails.countInStock>=1 ? 
                                ('??????????')
                                :
                                ('??????????????????') 
                                }</span></li>
                                <li>???????????????????????? ????????????????</li>
                                <li>???????????????????????? <span>????????</span> ??????????????????</li>
                                <li>????????????: ????????????</li>
                                <li>?????????????????????????? ???????????? ???? 10%</li>
                            </ul>
                        </div>
                        <div className="vse">
                            <div className="mains_price">
                                <div className="mains_price_one">
                                <p>{showCaseDataDetails && Math.ceil(((showCaseDataDetails.price / showCaseDataDetails.oldPrice - 1)*100))}%</p> 
                                </div>
                                <div className="main_price_two">
                                    <del>{showCaseDataDetails.oldPrice}??</del>
                                    <h2>{showCaseDataDetails.price}??</h2>
                                </div>
                            </div>
                            <div className="btn_offset">
                               <button 
                            //    onClick={() => {addProductToCart(productDetails)}} 
                        className="offset">?? ??????????????</button>
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
                                (<>???????????????? ?? ??????????????????</>)
                                }
                                </button>
                                
                            )
                            :
                            (
                            <Link exact to="/login">
                            <button className="fill">
                            ???????????????? ?? ??????????????????
                            </button>
                            </Link>)
                        
                        } */}
                            {/* <button className="fill">?????????????????? ????????</button> */}
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
                        <p>???????????????????????? ?????????? ???????????????? ?????????? - ???? 5 ??????????. <br/>
                        ???????? ???? ?????????????????? ?????????????? ?? 21.00 ???? 10.00 ???? ?????????????????????? ??????????????, ???? ?????? ?????????? ?????????? <br/> ?????????????????????????? ?????????? 10.00.</p>
                        <h2>????????????????</h2>
                        <p>{info && info.description}</p>
                    </div>
                    <div className="nakonecto2">
                        <h2>??????????????????????</h2>
                        {commentData && commentData.map((comment) => (
                        <div id={comment.createdAt}>
                            <span>{comment.userEmail} {comment.createdAt}</span>
                            <p>{comment.text}</p>
                            {user && comment.userId===user.id ? 
                            (
                                <Button onClick={() => deleteComment(comment.id, id)}>?????????????? ??????????????????????</Button>
                            ) 
                            :
                            (<></>)
                            }
                            <hr/>
                        </div>
                    )
                        )}
                        {/* {showCommentSection()} */}
                        <TextareaAutosize
                            className="inp-type__input"
                            ref={commentRef}
                            placeholder="?????????????? ??????????????????????"
                        />
                        <Button
                        onClick={() => handleAddComment(id, user.id, user.email)}
                        >???????????????? ??????????????????????</Button>
                    </div>
                </div>
            </div>
            

        </div>
        </div>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);