import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import TextAreaFieldGroup from "../../components/TextAreaFieldGroup";
import TextFieldGroup from "../../components/TextFieldGroup";
import { addExperience } from "../../slices/profileSlice";

const AddExperience = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [state, setState] = useState({
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
		disabled: false,
	});

	const errors = useSelector((state) => state.errors);

	const onChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onCheck = () => {
		setState({ ...state, disabled: !state.disabled, current: !state.current });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const expData = {
			company: state.company,
			title: state.title,
			location: state.location,
			from: state.from,
			to: state.to,
			current: state.current,
			description: state.description,
		};

		dispatch(addExperience(expData, history));
	};
	return (
		<div className="add-experience">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>
						<h1 className="display-4 text-center">Add Experience</h1>
						<p className="lead text-center">
							Add any job or position that you have had in the past or current
						</p>
						<small className="d-block pb-3">* = required field</small>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="* Company"
								name="company"
								value={state.company}
								onChange={onChange}
								error={errors.company}
							/>
							<TextFieldGroup
								placeholder="* Job Title"
								name="title"
								value={state.title}
								onChange={onChange}
								error={errors.title}
							/>
							<TextFieldGroup
								placeholder="Location"
								name="location"
								value={state.location}
								onChange={onChange}
								error={errors.location}
							/>
							<h6>From Date</h6>
							<TextFieldGroup
								name="from"
								type="date"
								value={state.from}
								onChange={onChange}
								error={errors.from}
							/>
							<h6>To Date</h6>
							<TextFieldGroup
								name="to"
								type="date"
								value={state.to}
								onChange={onChange}
								error={errors.to}
								disabled={state.disabled ? "disabled" : ""}
							/>
							<div className="form-check mb-4">
								<input
									type="checkbox"
									className="form-check-input"
									name="current"
									value={state.current}
									checked={state.current}
									onChange={onCheck}
									id="current"
								/>
								<label htmlFor="current" className="form-check-label">
									Current Job
								</label>
							</div>
							<TextAreaFieldGroup
								placeholder="Job Description"
								name="description"
								value={state.description}
								onChange={onChange}
								error={errors.description}
								info="Tell us about the the position"
							/>
							<input
								type="submit"
								value="Submit"
								className="btn btn-info btn-block mt-4"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddExperience;
