import React from "react";
import Create from "./createTask";
import Tasks from "./userTasks";
import Logout from "./logout";
import "./index.css"; // Import CSS file

function Account() {
  return (
    <>
      <div>
        <Logout />
      </div>
      <div className="content">
        <div className="create-task">
          <Create />
        </div>
        <Tasks />
      </div>
    </>
  );
}

export default Account;
