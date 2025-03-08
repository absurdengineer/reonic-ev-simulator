interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <div className="max-w-7xl mx-auto mt-10">{children}</div>;
};

export default MainContent;
