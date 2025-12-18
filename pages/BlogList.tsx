
import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const BlogList: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Bilgi Köşesi & Rehberler</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Online araçlarımızı en verimli nasıl kullanırsınız? Teknoloji dünyasından en güncel rehberler ve ipuçları.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="aspect-video">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs font-bold text-blue-600 uppercase tracking-widest">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{post.author}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">{post.title}</h2>
              <p className="text-slate-500 leading-relaxed">{post.excerpt}</p>
              <div className="pt-4 flex items-center text-blue-700 font-bold">
                Devamını Oku <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
