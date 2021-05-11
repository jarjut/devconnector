import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import TextAreaFieldGroup from "../../components/TextAreaFieldGroup";
import TextFieldGroup from "../../components/TextFieldGroup";
import { addEducation } from "../../slices/profileSlice";

const AddEducation = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [state, setState] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
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

		const eduData = {
			school: state.school,
			degree: state.degree,
			fieldofstudy: state.fieldofstudy,
			from: state.from,
			to: state.to,
			current: state.current,
			description: state.description,
		};

		dispatch(addEducation(eduData, history));
	};

	return (
		<div className="add-education">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>
						<h1 className="display-4 text-center">Add Education</h1>
						<p className="lead text-center">
							Add any school, bootcamp, etc that you have attended
						</p>
						<small className="d-block pb-3">* = required field</small>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="* School or Bootcamp"
								name="school"
								value={state.school}
								onChange={onChange}
								error={errors.school}
							/>
							<TextFieldGroup
								placeholder="* Degree or Certificate"
								name="degree"
								value={state.degree}
								onChange={onChange}
								error={errors.degree}
							/>
							<TextFieldGroup
								placeholder="* Field of Study"
								name="fieldofstudy"
								value={state.fieldofstudy}
								onChange={onChange}
								error={errors.fieldofstudy}
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
									Current School
								</label>
							</div>
							<TextAreaFieldGroup
								placeholder="Program Description"
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

export default AddEducation;
