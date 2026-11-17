import { NavLink } from 'react-router'

function Header() {
  return (
    <header className="header">
      <div className="logo">MyWebsite</div>
      <nav className="nav">
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/about-us">Giới thiệu</NavLink>
        <NavLink to="/products">Sản phẩm</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
      </nav>
    </header>
  )
}

export default Header