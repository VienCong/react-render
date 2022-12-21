import type { PropsWithChildren, ReactNode } from "react";

interface ChildernProps {
  name: string;
  age: number;
}

function RenderChildren() {
  return (
    <div>
      <Son type="Element">
        <Childern />
      </Son>
      <Son type="Function">
        {
          //   ((props: ChildernProps) => (
          //     <Childern {...props} />
          //   )) as unknown as ReactNode
          (props: ChildernProps) => <Childern {...props} />
        }
      </Son>
    </div>
  );
}

function Son({
  type,
  children,
}: { type: string } & (
  | PropsWithChildren
  | { children: (props: ChildernProps) => JSX.Element }
)) {
  return (
    <div>
      <div>{type}</div>
      {typeof children === "function"
        ? children({ name: "Jerry", age: 3 })
        : children}
    </div>
  );
}

function Childern(props: any) {
  return (
    <div>
      <div>{JSON.stringify(props)}</div>ChildrenElement
    </div>
  );
}

export default RenderChildren;
