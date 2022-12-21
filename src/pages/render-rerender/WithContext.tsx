import { createContext, useContext, useState, memo } from "react";

interface ThemeContext {
  themeName: string;
}

enum ThemeContextType {
  Dark = "dark",
  Light = "light",
}

const ParentContext = createContext<ThemeContext>({} as ThemeContext);

function RerenderChildrenUseContext() {
  console.log("RerenderChildrenUseContext FC  execute...");

  const { themeName } = useContext(ParentContext);

  return (
    <div>
      ChildrenComponent
      <div>{themeName}</div>
    </div>
  );
}

function RerenderChildrenUseProps({ themeName }: ThemeContext) {
  console.log("RerenderChildrenUseProps FC  execute...");

  return (
    <div>
      ChildrenComponent
      <div>{themeName}</div>
    </div>
  );
}

// memo component
const MemoRerenderChildrenUseContext = memo(RerenderChildrenUseContext);
const MemoRerenderChildrenUseProps = memo(RerenderChildrenUseProps);

function RerenderParent() {
  console.log("RerenderParent FC  execute...");
  const [parentContext, setParentContext] = useState<ThemeContext>({
    themeName: "dark",
  });
  const [, setUpdate] = useState<boolean>(false);
  const changeParentContext = () => {
    if (parentContext.themeName === ThemeContextType.Dark) {
      setParentContext({ themeName: ThemeContextType.Light });
    } else {
      setParentContext({ themeName: ThemeContextType.Dark });
    }
  };
  return (
    <ParentContext.Provider value={parentContext}>
      <div>ParentComponent</div>
      <div>{parentContext.themeName}</div>
      <button onClick={changeParentContext}>changeParentContext</button>
      <button onClick={() => setUpdate((pre) => !pre)}>
        updateParentComponent
      </button>
      {/* <MemoRerenderChildrenUseContext /> */}
      <MemoRerenderChildrenUseProps {...parentContext} />
    </ParentContext.Provider>
  );
}

export default RerenderParent;
