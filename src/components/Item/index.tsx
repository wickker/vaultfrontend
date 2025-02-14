import { useParams } from 'react-router'
import { Page } from '@/components/commons'

const Item = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <Page>
      <div>Item Page</div>
    </Page>
  )
}

export default Item
