import React, { useState } from "react";
import { BudgetItemAdd } from "../types";
function AddBudgetItem(props: BudgetItemAdd) {
  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prop handler function called here for creating a new budget item
    // props.handleAddItem({
    //   date,
    //   title,
    //   price,
    //   isPaid,
    // });

    // reset our states (might switch to useReducer when refactoring)
    setDate("");
    setTitle("");
    setPrice(0);
    setIsPaid(false);

    // close the modal
    // props.handleShowItem(!props.showAddItem);
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-dialogue">
        <button className="btn btn-cross">X</button>
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            {/* date when we add our item */}
            <label htmlFor="date">Date of Payment</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.currentTarget.value)}
              required={true}
            />
          </fieldset>
          <fieldset>
            {/* title of our budget item */}
            <label htmlFor="title">Item Name:</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(event) => setTitle(event.currentTarget.value)}
              value={title}
              required={true}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="price">Item Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(event) => setPrice(Number(event.currentTarget.value))}
              min="0"
              step="1"
              required={true}
            />
          </fieldset>
          <fieldset>
            <input
              type="checkbox"
              name="isPaid"
              id="isPaid"
              className="custom-checkbox-checkbox"
              checked={isPaid}
              onChange={() => setIsPaid(!isPaid)}
            />
          </fieldset>
          <fieldset>
            <input className="btn btn-add" type="submit" value="+ Add item" />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default AddBudgetItem;
