// notify/index.js

import React from "react";
import ReactDOM from "react-dom";

import NotificationsManager from "./NotifiationManager";
import Notification from "./Notification";
import createContainer from "./createContainer";

const containerElement = createContainer();
let notify: any;

ReactDOM.render(
  <NotificationsManager
    setNotify={(notifyFn: any) => {
      notify = notifyFn;
    }}
  />,
  containerElement
);

export { Notification };

export function info(children: any, autoClose: boolean) {
  return notify({
    type: "info",
    children,
    autoClose,
  });
}

export function success(children: any, autoClose: boolean) {
  return notify({
    type: "success",
    children,
    autoClose,
  });
}

export function warning(children: any, autoClose: boolean) {
  return notify({
    type: "warning",
    children,
    autoClose,
  });
}

export function error(children: any, autoClose: boolean) {
  return notify({
    type: "error",
    children,
    autoClose,
  });
}
