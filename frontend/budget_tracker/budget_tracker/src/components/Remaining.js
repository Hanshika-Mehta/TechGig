import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
    const{expenses , budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total ,items) => {
        return (total = total + items.cost);
    }, 0);

    const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

	return (
		<div class={`alert p-4 ${alertType}`}>
			<span>Remaining: Rs{budget - totalExpenses}</span>
		</div>
    );
};

export default Remaining;