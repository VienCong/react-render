import { useEffect, useLayoutEffect, useState, memo } from "react";

function RerenderChildren() {
  console.log("RerenderChildren FC  execute...");

  const [childState, setChildState] = useState<number>(1);
  const changeChildState = () => {
    setChildState((pre) => pre + 1);
  };

  useLayoutEffect(() => {
    console.log(
      "mount:::useLayoutEffect:::RerenderChildren FC useLayoutEffect mount..."
    );
    return () => {
      console.log(
        "unMount:::useLayoutEffect:::RerenderChildren FC useLayoutEffect unMount..."
      );
    };
  });
  useEffect(() => {
    console.log("mount:::RerenderChildren FC useEffect mount...");
    return () => {
      console.log("unMount:::RerenderChildren FC useEffect unMount...");
    };
  });
  return (
    <div>
      ChildrenComponent
      <div>{childState}</div>
      <button onClick={changeChildState}>changeChildState</button>
    </div>
  );
}

const MemoRenderChildren = memo(RerenderChildren);

function RerenderParent() {
  console.log("RerenderParent FC  execute...");
  const [parentState, setParentState] = useState<number>(1);
  const changeParentState = () => {
    setParentState((pre) => pre + 1);
  };
  useLayoutEffect(() => {
    console.log(
      "mount:::useLayoutEffect:::RerenderParent FC useLayoutEffect mount..."
    );
    return () => {
      console.info(
        "unMount:::useLayoutEffect:::RerenderParent FC useLayoutEffect unMount..."
      );
    };
  });
  useEffect(() => {
    console.log("mount:::RerenderParent FC useEffect mount...");
    return () => {
      console.info("unMount:::RerenderParent FC useEffect unMount...");
    };
  });
  return (
    <div>
      <div>ParentComponent</div>
      <div>{parentState}</div>
      <button onClick={changeParentState}>changeParentState</button>
      {/* <RerenderChildren /> */}
      <MemoRenderChildren />
    </div>
  );
}

export default RerenderParent;
