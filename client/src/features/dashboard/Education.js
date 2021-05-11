import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../slices/profileSlice";
import PropTypes from "prop-types";

const Education = ({ education }) => {
	const dispatch = useDispatch();

	const onDeleteClick = (id) => {
		dispatch(deleteEducation(id));
	};

	const educationView = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td>{edu.degree}</td>
			<td>
				<Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
				{edu.to === null ? (
					"Now"
				) : (
					<Moment format="YYYY/MM/DD">{edu.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => onDeleteClick(edu._id)}
					className="btn btn-danger"
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<div>
			<h4 className="mb-4">Education Credentials</h4>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th>Degree</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educationView}</tbody>
			</table>
		</div>
	);
};

Education.propTypes = {
	education: PropTypes.array,
};

export default Education;
