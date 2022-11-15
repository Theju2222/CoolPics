import React from 'react';
import { Route, Switch } from 'react-router';
import Favourite from "./containers/Favourite";
import Home from './containers/Home';
import Preview from './components/Common/Preview';
import Search from './containers/Search';
import Categories from './containers/Categories';


const Router = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/categories'} component={Categories} />
                <Route exact path={'/favourite'} component={Favourite} />
                <Route exact path={'/preview'} component={Preview} />
                <Route exact path={'/search'} component={Search} />
            </Switch>
        </>
    );
};
export default Router;
