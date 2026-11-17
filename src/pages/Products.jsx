import { useEffect, useState } from 'react'
import productApi from '../api/productApi'
import '../styles/products.css'

const emptyForm = { name: '', price: '', description: '' }

function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  // GET: lấy danh sách
  const loadProducts = async () => {
    try {
      const res = await productApi.getAll()
      setProducts(res.data)
      setError('')
    } catch {
      setError('Không kết nối được tới API. Hãy kiểm tra backend đã chạy chưa.')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  // POST (thêm mới) hoặc PUT (cập nhật)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form, price: Number(form.price) }
    try {
      if (editingId) {
        await productApi.update(editingId, { ...data, id: editingId })
      } else {
        await productApi.create(data)
      }
      setForm(emptyForm)
      setEditingId(null)
      loadProducts()
    } catch {
      setError('Lưu sản phẩm thất bại.')
    }
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      price: p.price,
      description: p.description ?? '',
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  // DELETE: xóa
  const handleDelete = async (id) => {
    if (!window.confirm('Xóa sản phẩm này?')) return
    try {
      await productApi.delete(id)
      loadProducts()
    } catch {
      setError('Xóa sản phẩm thất bại.')
    }
  }

  return (
    <main className="home">
      <h1>Quản lý sản phẩm</h1>
      {error && <p className="error">{error}</p>}

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit" className="btn-save">
          {editingId ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel}>
            Hủy
          </button>
        )}
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString('vi-VN')} đ</td>
              <td>{p.description}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Sửa</button>
                <button onClick={() => handleDelete(p.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Products