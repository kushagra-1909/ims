import React, { useEffect, useState } from "react";
import { message } from "antd";
import { requestItem } from "../../../apicalls/requests";
import { GetAllItems } from "../../../apicalls/items";
import("../../../StyleSheets/CreateNewRequest.css");

function CreateNewRequest() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const fetchItemsFromBackend = async () => {
    try {
      const response = await GetAllItems();
      if (response.status === "success") {
        setAllItems(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (showForm) {
      fetchItemsFromBackend();
    }
  }, [showForm]);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleAddItem = () => {
    setItems([...items, { item: "", quantityRequested: "" }]);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmitRequest = async (event) => {
    event.preventDefault();
    // Check for empty field
    const hasEmptyFields = items.some(
      (item) => item.item === "" || item.quantityRequested === ""
    );
    if (hasEmptyFields) {
      message.error("Please fill in all fields");
      return;
    }
    try {
      const response = await requestItem(items);
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setShowForm(false);
  };

  return (
    <div className="faculty-dashboard">
      <div className="request-button">
      <button className=""
        // style={{
        //   padding: "10px",
        //   color: "Black",
        //   borderRadius: "10px",
        //   fontSize: "15px",
        //   backgroundColor: "orange",
        //   cursor: "pointer",
        // }}
        onClick={handleClick}
      >
        Create New Request
      </button>
      </div>
      {showForm && (
        <div>
          <div
            onClick={() => {
              setShowForm(false);
            }}
            className="request-form-wrapper"
          ></div>
          <div className="request-form">
            <div className="item-group">
              {items.map((item, index) => (
                <div key={index} className="item-input">
                  <select
                    name="item"
                    value={item.item}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  >
                    <option value="">Select Item</option>
                    {allItems.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.itemName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="quantityRequested"
                    value={item.quantityRequested}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />
                </div>
              ))}
              <button onClick={handleAddItem}>+ Add Item</button>
            </div>
            <button onClick={handleSubmitRequest}>Send Request</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateNewRequest;
