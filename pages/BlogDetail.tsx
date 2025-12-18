
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Hızır Matik Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.excerpt);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Yazı Bulunamadı</h2>
        <Link to="/blog" className="text-indigo-700 mt-4 block">Blog Listesine Dön</Link>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
      <div className="aspect-[21/9] w-full relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8 md:p-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[10px] font-black text-yellow-400 uppercase tracking-widest">
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-4xl">{post.title}</h1>
          </div>
        </div>
      </div>
      
      <div className="p-8 md:p-16 max-w-4xl mx-auto">
        <div className="prose prose-indigo lg:prose-xl max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
          {post.content}
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-bold text-lg">HM</div>
            <div>
              <p className="text-sm font-black text-slate-900 tracking-tight">Hızır Matik Editör</p>
              <p className="text-xs text-slate-500 font-medium">Hızlı ve Pratik Yaşam Uzmanı</p>
            </div>
          </div>
          <Link to="/blog" className="px-8 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all">← Diğer Rehberler</Link>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
