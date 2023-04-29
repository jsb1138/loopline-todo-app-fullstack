export default function BackgroundClickArea() {
  function deselectHandler() {
    // dispatch(deselectAllTodos(null));
  }
  return <div className="bg-click-area" onClick={deselectHandler}></div>;
}
