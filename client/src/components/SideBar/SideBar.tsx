import React, {useState} from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/core/Slider';
// import { useProducts } from '../../contexts/ProductsContext';
import { connect } from 'react-redux';
import axios from 'axios';
import { JSON_API } from '../../helpers/static';
import { useHistory } from 'react-router-dom';
import { storeType } from '../../store/store';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';


const mapStateToProps = (state: any) => {
    return {
        productsData: state.productReducer.productsData,
        productDetails: state.productReducer.productsDetails,
        rosterData: state.rosterReducer.rosterData,
        paginationPages: state.productReducer.paginationPages,
        cart: state.productReducer.cart,
        dataLimit: state.productReducer.dataLimit,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    getProductsData: async (history: any, dataLimit: string) => {
        const search = new URLSearchParams(history.location.search);
        search.set("_limit", dataLimit);
        history.push(`${history.location.pathname}?${search.toString()}`);
        let res = await axios(
            `${JSON_API}/products/?_limit=${dataLimit}&${window.location.search}`
        );
        // console.log(res)
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload: res,
        });
    }
});


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      WebkitTextStroke: '0.5px black',
      color: 'white'
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      background: 'rgba(255, 255, 255, 0.1)!important'
    }
  }))

const SideBar = (store: any) => {
    console.log(store);
    // const history = useHistory()
    const classes = useStyles();
    const { history, getProductsData } = store as storeType
    // const { getProductsData } = useProducts()
    // const { getProductsData } = store
    const [sliderValue, setSliderValue] = useState([0, 7000])
    const [genre, setGenre] = useState((getGenre()))
    const [checkedGenre, setcheckedGenre] = useState({
        actions: false,
        rpg: false,
        strategy: false,
        all: false,
      });

    function getGenre() {
        const search = new URLSearchParams(history.location.search)
        return search.get('category')
    }

    function getSlider() {
            const search = new URLSearchParams(history.location.search)
            return search.get('price_lte')
    }

    const handleChangeGenre = async (event: any) => {
        if(event.target.value === "all") {
            await history.push(`${history.location.pathname.replace('category')}`)
            getProductsData(history, store.dataLimit)
            return
        }
        const search = new URLSearchParams(history.location.search)
        await search.set('category', event.target.value)
        await history.push(`${history.location.pathname}?${search.toString()}`)
        getProductsData(history, store.dataLimit)
        setGenre(event.target.value)
    }

        async function handleSliderValue(e: any, value: any) {
        console.log(e, value)
        // const search = new URLSearchParams(history.location.search)
        // await search.set('price_lte', value)
        await history.push(`${history.location.pathname}?_limit=8&price_gte=${value[0]}&price_lte=${value[1]}`)
        getProductsData(history, store.dataLimit)
            setSliderValue(value)
    }
    
    return (
        <Grid item md={3} className={classes.root}>
            <Paper className={classes.paper}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Жанры</FormLabel>
            <RadioGroup value={genre} onChange={handleChangeGenre} aria-label="genre" name="genre1">
                <FormControlLabel value="Экшены" control={<Radio />} label="Экшены" name="actions"/>
                <FormControlLabel value="РПГ" control={<Radio />} label="РПГ" name="rpg"/>
                <FormControlLabel value="Стратегии" control={<Radio />} label="Стратегии" name="strategy"/>
                <FormControlLabel value="all" control={<Radio />} label="All" name="all"/>
            </RadioGroup>

            {/* <RadioGroup value={memory} onChange={handleChangeMemory} aria-label="memory" name="memory1">
                <FormControlLabel value="Экшены" control={<Radio />} label="Экшены" />
                <FormControlLabel value="РПГ" control={<Radio />} label="РПГ" />
                <FormControlLabel value="Стратегии" control={<Radio />} label="Стратегии" />
                <FormControlLabel value="512" control={<Radio />} label="512GB" />
                <FormControlLabel value="1024" control={<Radio />} label="1024GB" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup> */}
            </FormControl>

               <Grid>
                   <Slider
                       value={sliderValue}
                       min={500}
                       max={7000}
                       onChange={handleSliderValue}
                       valueLabelDisplay="auto"
                       aria-labelledby="range-slider"
                   />
               </Grid>


            </Paper>
        </Grid>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);