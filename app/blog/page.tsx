import type { Metadata } from 'next';
import { getAllBlogs } from '@/src/lib/blog';
import BlogContent from './_components/BlogContent';
import './blog.css';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore insights, trends, and expert articles on VR, AR, web development, app development, digital marketing, and more from Third Vizion.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen containar bg-black">
      <BlogContent blogs={blogs} />
    </div>
  );
}
