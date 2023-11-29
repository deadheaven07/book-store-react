const AppPlacementWrapper = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-zinc-600 flex justify-center">
      {children}
    </div>
  );
};

export default AppPlacementWrapper;
