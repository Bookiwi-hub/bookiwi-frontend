function TocPanel() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">목차</h3>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-primary">
          Chapter 1: Introduction
        </li>
        <li className="cursor-pointer hover:text-primary">
          Chapter 2: Characters
        </li>
        <li className="cursor-pointer hover:text-primary">
          Chapter 3: Plot Begins
        </li>
        <li className="cursor-pointer hover:text-primary">
          Chapter 4: Rising Action
        </li>
        <li className="cursor-pointer hover:text-primary">Chapter 5: Climax</li>
      </ul>
    </div>
  );
}

export default TocPanel;
