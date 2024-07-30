declare module "react-notifications" {
  import * as React from "react";

  export class NotificationContainer extends React.Component {}
  export class NotificationManager {
    static create(type: string, title: string, message: string, timeOut?: number, onClick?: () => void, priority?: boolean): void;
    static success(message: string, title?: string, timeOut?: number, onClick?: () => void, priority?: boolean): void;
    static error(message: string, title?: string, timeOut?: number, onClick?: () => void, priority?: boolean): void;
    static warning(message: string, title?: string, timeOut?: number, onClick?: () => void, priority?: boolean): void;
    static info(message: string, title?: string, timeOut?: number, onClick?: () => void, priority?: boolean): void;
  }
}
