import { HTMLProps } from "react";

export type LayoutProps = {
    children: React.ReactNode;
};

export type TWClassNames = HTMLProps<HTMLElement>["className"];
