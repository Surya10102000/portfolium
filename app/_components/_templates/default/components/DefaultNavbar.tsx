const DefaultNavbar = () => {
  const section = ["hero", "project", "experience", "contact", "education"];

  return (
    <div className="flex gap-2">
      {section.map((sec,i)=><a key={i} href={`#${sec}`}>{sec}</a>)}
    </div>
  );
};
export default DefaultNavbar;
