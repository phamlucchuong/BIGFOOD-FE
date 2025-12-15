export default function CollectionSection({
  title, 
  highlight, 
  tail, 
  font = "medium", 
  size = "md", 
  grid = 4, 
  color, 
  data, 
  CardComponent, 
  onItemClick, 
  cardProps = {} }) {

  const sizeClass = {
    "sm" : "text-2xl",
    "md" : "text-3xl",
    "lg" : "text-4xl",
  }[size];

  const gridClass = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2 gap-4",
    3: "sm:grid-cols-3 gap-4",
    4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  }[grid];

  return (
    <div className="mb-8 mx-[200px] mt-12">
      <h1 className={`${sizeClass} font-${font} mb-7`}>{title}
        {highlight && 
          <span style={{ color: color || '#ff4c4cff' }}> {highlight}</span>
        }
        {tail && <span> {tail}</span>}
      </h1>

      <div className={gridClass}>
        {data.map((item) => (
          CardComponent ? (
            <CardComponent 
              key={item.id} 
              item={item}
              onClick={() => onItemClick && onItemClick(item)}
              {...cardProps}
            />
          ) : null
        ))}
      </div>
    </div>
  );
}