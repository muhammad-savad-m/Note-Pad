const colors = [
  {
    name: "yellow",
    className: "bg-yellow-100",
  },
  {
    name: "blue",
    className: "bg-blue-100",
  },
  {
    name: "green",
    className: "bg-green-100",
  },
  {
    name: "pink",
    className: "bg-pink-100",
  },
  {
    name: "purple",
    className: "bg-purple-100",
  },
  {
    name: "orange",
    className: "bg-orange-100",
  },
];

function ColorPicker({ color, setColor }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((item) => (
        <button
          key={item.name}
          type="button"
          onClick={() => setColor(item.name)}
          className={`w-8 h-8 rounded-full ${item.className} border-2 ${
            color === item.name
              ? "border-black"
              : "border-transparent"
          }`}
          title={item.name}
        />
      ))}
    </div>
  );
}

export default ColorPicker;