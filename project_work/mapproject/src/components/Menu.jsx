import React from "react";
import { Button, Drawer } from "antd";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  
  return (
    <div>
      {" "}
      <div
        style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 100 }}
      >
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="메뉴입니다."
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div>
          <ul>
            <li>
              <Button
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                root
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  navigate("/user");
                  setOpen(false);
                }}
              >
                user
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  navigate("/traffic");
                  setOpen(false);
                }}
              >
                traffic
              </Button>
            </li>
          </ul>
        </div>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default Menu;
