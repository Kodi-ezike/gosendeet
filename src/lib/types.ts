import { HTMLProps } from "react";

export type LayoutProps = {
    children: React.ReactNode;
};

export type TWClassNames = HTMLProps<HTMLElement>["className"];

export type optionProps = {
  label: string;
  key: string;
  // value: string;
  // register: any;
};