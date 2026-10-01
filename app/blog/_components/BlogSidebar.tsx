interface BlogSidebarProps {
  categories: { label: string; value: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const SERVICE_CATEGORIES = [
  { label: 'Virtual Reality', value: 'virtual-reality' },
  { label: 'Augmented Reality', value: 'augmented-reality' },
  { label: '3D Services', value: '3d-services' },
  { label: 'Web Development', value: 'web-development' },
  { label: 'App Development', value: 'app-development' },
  { label: 'Game Development', value: 'game-development' },
  { label: 'Digital Marketing', value: 'digital-marketing' },
  { label: 'CRM', value: 'customer-relationship-management' },
  { label: 'ERP', value: 'enterprise-resource-planning' },
  { label: 'IAM', value: 'identity-and-access-management' },
  { label: 'Server Management', value: 'server-management' },
];

export { SERVICE_CATEGORIES };

export default function BlogSidebar({
  activeCategory,
  onCategoryChange,
}: BlogSidebarProps) {
  return (
    <aside className="blog-sidebar">
      {/* Services / Categories */}
      <div className="sidebar-section">
        <h3>Services</h3>
        <ul className="sidebar-category-list">
          <li
            className={`sidebar-category-item ${activeCategory === '' ? 'active' : ''}`}
            onClick={() => onCategoryChange('')}
          >
            <span>All Posts</span>
            <span className="category-arrow">→</span>
          </li>
          {SERVICE_CATEGORIES.map((cat) => (
            <li
              key={cat.value}
              className={`sidebar-category-item ${activeCategory === cat.value ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.value)}
            >
              <span>{cat.label}</span>
              <span className="category-arrow">→</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Card */}
      <div className="sidebar-contact">
        <div className="sidebar-contact-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <p className="sidebar-contact-label">Call Us Anytime</p>
        <a href="tel:+918925527548" className="sidebar-contact-number">
          +91 89255 27548
        </a>
      </div>
    </aside>
  );
}
