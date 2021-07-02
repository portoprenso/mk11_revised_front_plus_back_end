import React, { ReactElement, useEffect, useState } from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { storeType } from '../../store/store';
import { $host, fetchBrands, fetchTypes } from '../../helpers/functions'


const mapStateToProps = (state: any) => {
    return {
        dataLimit: state.productReducer.dataLimit,
        showCaseData: state.productReducer.showCaseData
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    getShowCaseData: async (history: any, datalimit: any) => {
        const search = new URLSearchParams(history.location.search);
        search.set("_limit", datalimit);
        history.push(`${history.location.pathname}?${search.toString()}`);
        // console.log(datalimit)
        // console.log(window.location.search)
        let {data} = await $host.get(
            `api/game/?_limit=${datalimit}&${window.location.search}`
        );
        // console.log(data.rows)
        dispatch({
            type: "GET_SHOWCASE_DATA",
            payload: data.rows
        });
    },
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

interface TypesInterface {
    id: number,
    name: string,
    createdAt: any,
    updatedAt: any
}

function ShowCaseSideBar(store: any): ReactElement {
    const history = useHistory()
    const classes = useStyles();
    const [brandId, setBrandId] = useState((getBrandId()))
    const [typeId, setTypeId] = useState((getTypeId()))
    const [types, setTypes] = useState([])
    const [brands, setBrands] = useState([])
    const [sliderValue, setSliderValue] = useState([0, 7000])
    // const [checkedBrand, setcheckedBrand] = useState({
    //     actions: false,
    //     rpg: false,
    //     strategy: false,
    //     all: false,
    // });
    // const [checkedType, setcheckedType] = useState({
    //     actions: false,
    //     rpg: false,
    //     strategy: false,
    //     all: false,
    // });

    const { dataLimit, showCaseData, getShowCaseData } = store

    function getBrandId() {
        const search = new URLSearchParams(history.location.search)
        return search.get('brandId')
    }

    function getTypeId() {
        const search = new URLSearchParams(history.location.search)
        return search.get('typeId')
    }

    const handleChangeType = async (event: any) => {
        if(event.target.value === "all") {
            await history.push(`${history.location.pathname.replace('typeId', '')}`)
            getShowCaseData(history, dataLimit)
            return
        }
        const search = new URLSearchParams(history.location.search)
        await search.set('typeId', event.target.value)
        await history.push(`${history.location.pathname}?${search.toString()}`)
        getShowCaseData(history, dataLimit)
        setTypeId(event.target.value)
    }

    const handleSliderValue = async (e: any, value: any) => {
        console.log(e, value)
        const search = new URLSearchParams(history.location.search)
        if(search.toString().includes("price")){
            await history.push(`${history.location.pathname}?_limit=${dataLimit}&_price_from=${value[0]}&_price_to=${value[1]}`)
        } else {
            await history.push(`${history.location.pathname}?${search.toString()}&_price_from=${value[0]}&_price_to=${value[1]}`)
        }
        getShowCaseData(history, dataLimit)
            setSliderValue(value)
    }


    useEffect(() => {
        fetchBrands().then(data => setBrands(data))
        fetchTypes().then(data => setTypes(data))
    }, [])

    return (
        <Grid item md={3} className={classes.root}>
            <Paper className={classes.paper}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Жанры</FormLabel>
            <RadioGroup value={typeId} onChange={handleChangeType} aria-label="genre" name="genre1">
                {types && types.map((item: TypesInterface) => {
                    return <FormControlLabel value={item.id} control={<Radio />} label={item.name}/>
                })}
                <FormControlLabel value={""} control={<Radio />} label={"Сбросить жанр"}/>
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
                       min={0}
                       max={7000}
                       onChange={handleSliderValue}
                       valueLabelDisplay="auto"
                       aria-labelledby="range-slider"
                   />
               </Grid>


            </Paper>
        </Grid>    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCaseSideBar)
