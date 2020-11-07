function saveData(token,user_id,user_balance)
{
	localStorage.setItem('token',token);
	localStorage.setItem('user_id',user_id);
	localStorage.setItem('user_balance',user_balance);
	localStorage.setItem('flag',true);
}

function deleteData()
{
	localStorage.removeItem('token');
	localStorage.removeItem('user_id');
	localStorage.removeItem('user_balance');
	localStorage.removeItem('flag');
}

function getToken()
{
	return localStorage.getItem("token");
}

function isTokenExist()
{
	if(localStorage.getItem('token'))
	{
		return true;
	}
	else
	{
		return false;
	}
}

export default {
	saveData,
	deleteData,
	getToken,
	isTokenExist
}