import views from './views';
import {
	LOGIN_PATH,
	SIGN_UP_PATH,
	PRODUCTS_PATH
} from './paths';

const LOGIN_VIEW = {
	component: views.Login,
	path: LOGIN_PATH,
	isPrivate: false
};

const CREATE_VIEW = {
	component: views.Create,
	path: SIGN_UP_PATH,
	isPrivate: false
};

const PRODUCTS_VIEW = {
	component: views.Product,
	path: PRODUCTS_PATH,
	isPrivate: true
};

export default [
	LOGIN_VIEW,
	CREATE_VIEW,
	PRODUCTS_VIEW
];