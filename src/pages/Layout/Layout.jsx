import { Outlet } from 'react-router-dom'
import { Nav } from '../../components/pages/Nav/Nav'

export const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}
