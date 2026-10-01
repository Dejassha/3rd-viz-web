import Link from 'next/link';
import { SERVICE_CATEGORIES } from './BlogSidebar';

export default function BlogDetailSidebar() {
  return (
    <aside className="blog-detail-left-sidebar blog-sidebar">
      <div className="sidebar-section">
        <h3>Services</h3>
        <ul className="sidebar-category-list">
          <li className="sidebar-category-item">
            <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <span>All Posts</span>
              <span className="category-arrow">→</span>
            </Link>
          </li>
          {SERVICE_CATEGORIES.map((cat) => (
            <li key={cat.value} className="sidebar-category-item">
              <Link href={`/blog?category=${cat.value}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <span>{cat.label}</span>
                <span className="category-arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
