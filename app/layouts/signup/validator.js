import validator from 'validator';

const checkedErrors = (state) => {
	let errors={

	};

	let isFormValid = true;

	if (!validator.isEmail(state.email)){
		errors.email = "Invalid email";
		isFormValid = false;
	}

	if (validator.isEmpty(state.firstname) || typeof state.firstname !=='string')
	{
		errors.firstname = "field is not required";
		isFormValid = false;
	}
	if (validator.isEmpty(state.lastname) || typeof state.lastname !=='string')
	{
		errors.lastname = "field is not required";
		isFormValid = false;
	}
	if (validator.isEmpty(state.email) || typeof state.email !=='string')
	{
		errors.email = "field is not required";
		isFormValid = false;
	}
	if (validator.isEmpty(state.password) || typeof state.password !=='string' || state.password.trim().length<6)
	{
		errors.password = "Password must have at least 8 characters.";
		isFormValid = false;
	}
	if (validator.isEmpty(state.username) || typeof state.username !=='string')
	{
		errors.username = "field is not required";
		isFormValid = false;
	}


	return{
		success: isFormValid,
		errors: errors
	}
}

export default checkedErrors;