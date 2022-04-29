import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/Firebase.init";

const UploadProduct = () => {
	const [user] = useAuthState(auth);

	const handleUpload = event => {
		event.preventDefault();

		const name = event.target.name.value;
		const price = event.target.price.value;

		const url = "http://localhost:5000/uploadPd";
		fetch(url, {
			method: "POST",
			headers: {
				authorization: `${user.email} ${localStorage.getItem("accessToken")}`,
				"content-type": "application/json",
			},
			body: JSON.stringify({ name, price }),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				event.target.reset();
			});
	};

	return (
		<div className='container'>
			<h2 className='text-center'>Upload Product</h2>

			<div className='w-50 mx-auto'>
				<form onSubmit={handleUpload}>
					<div className='mb-3'>
						<label className='form-label'>Product Name</label>
						<input
							type='text'
							name='name'
							className='form-control'
							aria-describedby='emailHelp'
						/>
					</div>
					<div className='mb-3'>
						<label className='form-label'>Price</label>
						<input type='text' name='price' className='form-control' />
					</div>
					<button type='submit' className='btn btn-primary'>
						Upload
					</button>
				</form>
			</div>
		</div>
	);
};

export default UploadProduct;
