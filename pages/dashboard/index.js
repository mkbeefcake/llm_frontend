import DefaultLayout from '../components/layout'
 
export default function Page() {
  return (
    <div>Hello Page</div>
  )
}
 
Page.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}