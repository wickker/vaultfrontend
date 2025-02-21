type CategoryTileProps = {
  color: string
  name: string
}

const CategoryTile = ({ color, name }: CategoryTileProps) => (
  <div className='flex items-center gap-x-2'>
    <div
      className='h-2 w-2 rounded-full'
      style={{
        backgroundColor: color,
      }}
    />
    <p>{name}</p>
  </div>
)

export default CategoryTile
