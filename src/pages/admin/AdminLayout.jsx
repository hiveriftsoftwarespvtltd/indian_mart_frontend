import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Login from './Login';
import Dashboard from './Dashboard';
import ProductManage from './ProductManage';
import CategoryManage from './CategoryManage';
import EnquiryManage from './EnquiryManage';
import BannerManage from './BannerManage';
import ContentManage from './ContentManage';
import GalleryManage from './GalleryManage';
import ClientManage from './ClientManage';
import BlogManage from './BlogManage';
import { api } from '../../utils/api';
import { initialClients } from '../Projects';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Initial Mock data seed templates
const initialCategories = [
  { id: 1, name: 'Fiber Buddha Statue' },
  { id: 2, name: 'Fiber Animal Statue' },
  { id: 3, name: 'Artificial Trees' },
  { id: 4, name: 'FRP Sculpture Art' },
  { id: 5, name: 'Fiber Glowing Statue' }
];

const initialProducts = [
  {
    id: 1,
    title: 'Meditation Buddha Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1608962914077-f63238ca1529?w=600&auto=format&fit=crop',
    category: 'Fiber Buddha Statue',
    tags: ['meditation', 'lord', 'golden']
  },
  {
    id: 2,
    title: 'White Lord Buddha Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=600&auto=format&fit=crop',
    category: 'Fiber Buddha Statue',
    tags: ['meditation', 'lord', 'white']
  },
  {
    id: 3,
    title: 'Lord Buddha Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop',
    category: 'Fiber Buddha Statue',
    tags: ['standing', 'lord', 'golden']
  },
  {
    id: 4,
    title: 'Meditation Buddha Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&auto=format&fit=crop',
    category: 'Artificial Trees',
    tags: ['meditation', 'lord']
  },
  {
    id: 5,
    title: 'Happy Buddha Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1590076214667-c0f331907e4e?w=600&auto=format&fit=crop',
    category: 'Fiber Buddha Statue',
    tags: ['meditation']
  },
  {
    id: 6,
    title: 'Buddha Head Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1606293459203-d56ee103e7c8?w=600&auto=format&fit=crop',
    category: 'FRP Sculpture Art',
    tags: ['meditation', 'white']
  },
  {
    id: 7,
    title: 'Golden Buddha Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&auto=format&fit=crop',
    category: 'Fiber Buddha Statue',
    tags: ['meditation', 'lord', 'golden']
  },
  {
    id: 8,
    title: 'Reclining Buddha Statue',
    material: 'FRP',
    type: 'Indoor/Outdoor',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop',
    category: 'Fiber Buddha Statue',
    tags: ['standing', 'lord', 'white']
  }
];

const initialBanners = [
  {
    id: 1,
    title: 'Handcrafted Buddha Statues & Premium Décor',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&auto=format&fit=crop',
    link: '/collections',
    active: true
  },
  {
    id: 2,
    title: 'Custom Sculptures Crafted by Skilled Artisans',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1600&auto=format&fit=crop',
    link: '/custom-order',
    active: true
  }
];

const initialContent = {
  address: '46/7 Ranhola Vihar, Nangloi, Delhi - 110041',
  email: 'info@indiandhammaart.com',
  phone: '+91 85068 65563, +91 89208 30674',
  storyTitle: 'Where Tradition Inspires Every Creation',
  storyText1: 'Indian Dhamma Art was born from a deep passion for Indian art, culture and spirituality. What started as a small studio has grown into a trusted name in custom handcrafted Buddha statues and premium decor for homes, businesses, temples, hotels and spiritual spaces.',
  storyText2: 'Every piece we create is the result of devotion, patience and perfection. Our skilled artisans combine age-old techniques with modern design, ensuring every sculpture we deliver is a masterpiece.'
};

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('adminToken');
  });
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminActiveTab') || 'dashboard';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Database States (enquiries starts empty with zero static fallback)
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [enquiries, setEnquiries] = useState([]);
  const [banners, setBanners] = useState(initialBanners);
  const [content, setContent] = useState(initialContent);
  const [gallery, setGallery] = useState([]);
  const [clients, setClients] = useState(initialClients);
  const [blogs, setBlogs] = useState([]);

  const mapId = (item) => ({ ...item, id: item._id || item.id });

  useEffect(() => {
    // Check login token
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const cats = (await api.categories.getAll()).map(mapId);
        if (cats && cats.length > 0) setCategories(cats);
      } catch (err) {
        console.warn('Categories API load error:', err);
      }

      try {
        const prods = (await api.products.getAll()).map(mapId);
        setProducts(prods || []);
      } catch (err) {
        console.warn('Products API load error:', err);
      }

      try {
        const enqs = (await api.enquiries.getAll()).map(mapId);
        setEnquiries(Array.isArray(enqs) ? enqs : []);
      } catch (err) {
        console.warn('Enquiries API load error:', err);
        setEnquiries([]);
      }

      try {
        const bans = (await api.banners.getAllAdmin()).map(mapId);
        if (bans && bans.length > 0) setBanners(bans);
      } catch (err) {
        console.warn('Banners API load error:', err);
      }

      try {
        const cont = await api.content.get();
        if (cont && Object.keys(cont).length > 0) setContent(cont);
      } catch (err) {
        console.warn('Content API load error:', err);
      }

      try {
        const gal = (await api.gallery.getAll()).map(mapId);
        if (gal && gal.length > 0) setGallery(gal);
      } catch (err) {
        console.warn('Gallery API load error:', err);
      }

      try {
        const cls = (await api.clients.getAll()).map(mapId);
        if (cls && cls.length > 0) {
          const combined = [...cls, ...initialClients.filter(init => !cls.some(c => c.name?.toLowerCase() === init.name?.toLowerCase()))];
          setClients(combined);
        } else {
          setClients(initialClients);
        }
      } catch (err) {
        console.warn('Clients API load error:', err);
      }

      try {
        const blgs = (await api.blogs.getAllAdmin()).map(mapId);
        if (blgs && blgs.length > 0) setBlogs(blgs);
      } catch (err) {
        console.warn('Blogs API load error:', err);
      }
    };
    loadAllData();
  }, [isAuthenticated]);

  // Product CRUD
  const handleAddProduct = async (formData) => {
    try {
      const added = await api.products.create(formData);
      setProducts(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Product published successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to publish product: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditProduct = async (id, formData) => {
    try {
      const updated = await api.products.update(id, formData);
      setProducts(prev => prev.map(p => p.id === id ? mapId(updated) : p));
      Toast.fire({ icon: 'success', title: 'Product changes saved!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to save product changes: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteProduct = async (id) => {
    const targetId = String(id);
    try {
      await api.products.delete(targetId);
      setProducts(prev => prev.filter(p => String(p.id) !== targetId && String(p._id) !== targetId));
      Toast.fire({ icon: 'success', title: 'Product deleted successfully!' });
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('not found')) {
        setProducts(prev => prev.filter(p => String(p.id) !== targetId && String(p._id) !== targetId));
        Toast.fire({ icon: 'info', title: 'Product removed from list.' });
      } else {
        Swal.fire({ title: 'Error', text: 'Failed to delete product: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
      }
    }
  };

  // Category CRUD
  const handleAddCategory = async (newCat) => {
    try {
      const formData = new FormData();
      formData.append('name', newCat.name);
      formData.append('featured', newCat.featured ? 'true' : 'false');
      if (newCat.imageFile) {
        formData.append('image', newCat.imageFile);
      } else if (newCat.imageUrl) {
        formData.append('image', newCat.imageUrl);
      }
      const added = await api.categories.create(formData);
      setCategories(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Category created successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to create category: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditCategory = async (editedCat) => {
    try {
      const formData = new FormData();
      formData.append('name', editedCat.name);
      formData.append('featured', editedCat.featured ? 'true' : 'false');
      if (editedCat.imageFile) {
        formData.append('image', editedCat.imageFile);
      } else {
        formData.append('image', editedCat.imageUrl || '');
      }
      const updated = await api.categories.update(editedCat.id, formData);
      setCategories(prev => prev.map(c => c.id === editedCat.id ? mapId(updated) : c));
      Toast.fire({ icon: 'success', title: 'Category changes saved!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update category: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.categories.delete(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      Toast.fire({ icon: 'success', title: 'Category deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete category: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Enquiry Update
  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      const updated = await api.enquiries.updateStatus(id, status);
      setEnquiries(prev => prev.map(e => e.id === id ? mapId(updated) : e));
      Toast.fire({ icon: 'success', title: `Status marked as ${status}!` });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update enquiry status: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await api.enquiries.delete(id);
      setEnquiries(prev => prev.filter(e => e.id !== id));
      Toast.fire({ icon: 'success', title: 'Enquiry lead deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete enquiry: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Banner CRUD
  const handleAddBanner = async (formData) => {
    try {
      const added = await api.banners.create(formData);
      setBanners(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Banner published successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to publish banner: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditBanner = async (id, formData) => {
    try {
      const updated = await api.banners.update(id, formData);
      setBanners(prev => prev.map(b => b.id === id ? mapId(updated) : b));
      Toast.fire({ icon: 'success', title: 'Banner changes saved!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update banner: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await api.banners.delete(id);
      setBanners(prev => prev.filter(b => b.id !== id));
      Toast.fire({ icon: 'success', title: 'Banner deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete banner: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleToggleBannerStatus = async (id) => {
    try {
      const updated = await api.banners.toggle(id);
      setBanners(prev => prev.map(b => b.id === id ? mapId(updated) : b));
      Toast.fire({ icon: 'success', title: 'Banner visibility toggled!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to toggle banner status: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Gallery CRUD
  const handleAddGalleryItem = async (formData) => {
    try {
      const added = await api.gallery.create(formData);
      setGallery(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Gallery photo uploaded!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to upload gallery photo: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    try {
      await api.gallery.delete(id);
      setGallery(prev => prev.filter(g => g.id !== id));
      Toast.fire({ icon: 'success', title: 'Gallery photo deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete gallery photo: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Clients CRUD
  const handleAddClient = async (formData) => {
    try {
      const added = await api.clients.create(formData);
      setClients(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Client added successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to add client: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await api.clients.delete(id);
      setClients(prev => prev.filter(c => c.id !== id));
      Toast.fire({ icon: 'success', title: 'Client removed!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete client: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Blog / Article CRUD
  const handleAddBlog = async (formData) => {
    try {
      const added = await api.blogs.create(formData);
      setBlogs(prev => [mapId(added), ...prev]);
      Toast.fire({ icon: 'success', title: 'Article published successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to publish article: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditBlog = async (id, formData) => {
    try {
      const updated = await api.blogs.update(id, formData);
      setBlogs(prev => prev.map(b => b.id === id ? mapId(updated) : b));
      Toast.fire({ icon: 'success', title: 'Article updated!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update article: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await api.blogs.delete(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
      Toast.fire({ icon: 'success', title: 'Article deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete article: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Content Save
  const handleSaveContent = async (updatedContent) => {
    try {
      const updated = await api.content.update(updatedContent);
      setContent(updated);
      Toast.fire({ icon: 'success', title: 'Page content saved successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to save content changes: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Sidebar link items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'products', label: 'Products', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'categories', label: 'Categories', iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'enquiries', label: 'Enquiries / CRM', iconPath: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
    { id: 'banners', label: 'Sliders & Banners', iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'blogs', label: 'Articles & Insights', iconPath: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { id: 'gallery', label: 'Gallery Manage', iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'clients', label: 'Clients Manage', iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'content', label: 'Page Content', iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf7] flex . relative">

      {/* Mobile Drawer Navigation Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Drawer content body */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0b0e26] text-white pt-5 pb-4 transition-transform duration-300 z-50 shadow-2xl">
            {/* Close Button inside drawer */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label="Close Mobile Navigation"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Logo / Brand */}
            <div className="px-6 pb-4 border-b border-slate-800 text-left">
              <span className="text-[#cca040] font-serif text-lg font-black uppercase tracking-widest">
                Dhamma Panel
              </span>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="mt-5 flex-1 px-4 space-y-1.5 text-left overflow-y-auto">
              {sidebarItems.map(item => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full py-3.5 px-4.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer ${active
                      ? 'bg-[#cca040] text-white shadow-sm'
                      : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
                      }`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                    </svg>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User details and Logout in drawer footer */}
            <div className="p-4 border-t border-slate-800">
              <div className="bg-slate-900/50 p-3 rounded-xl flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Admin User</h4>
                  <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Online Session</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileSidebarOpen(false);
                  }}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Container */}
      <aside className="w-64 h-screen sticky top-0 bg-[#0b0e26] text-white flex flex-col justify-between shrink-0 hidden lg:flex border-r border-slate-800">

        {/* Sidebar Header / Brand */}
        <div>
          <div className="h-20 flex items-center px-6 border-b border-slate-800">
            <span className="text-[#cca040] font-serif text-lg font-black uppercase tracking-widest">
              Dhamma Panel
            </span>
          </div>

          {/* Navigation Links list */}
          <nav className="p-4 space-y-1.5 text-left">
            {sidebarItems.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full py-3 px-4.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer ${active
                    ? 'bg-[#cca040] text-white shadow-sm'
                    : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                  </svg>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Profile / Footer logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-900/50 p-3 rounded-xl flex items-center justify-between">
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Administrator</h4>
              <p className="text-text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Offline Sync</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
              title="Log Out Admin"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Container Right */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">

        {/* Topbar navigation Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
          {/* Mobile hamburger icon + Active section title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 focus:outline-none cursor-pointer"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-[#cca040] text-sm hidden xs:inline">&#x2740;</span>
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest font-sans">
              Admin Portal / {activeTab}
            </span>
          </div>

          {/* Clock & Logout */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-bold hidden sm:block">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex lg:hidden items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 sm:p-8 flex-grow">
          {activeTab === 'dashboard' && (
            <Dashboard
              enquiries={enquiries}
              products={products}
              onTabChange={setActiveTab}
            />
          )}

          {activeTab === 'products' && (
            <ProductManage
              products={products}
              categories={categories}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryManage
              categories={categories}
              products={products}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiryManage
              enquiries={enquiries}
              onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
              onDeleteEnquiry={handleDeleteEnquiry}
            />
          )}

          {activeTab === 'banners' && (
            <BannerManage
              banners={banners}
              onAddBanner={handleAddBanner}
              onEditBanner={handleEditBanner}
              onDeleteBanner={handleDeleteBanner}
              onToggleBannerStatus={handleToggleBannerStatus}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogManage
              blogs={blogs}
              onAddBlog={handleAddBlog}
              onEditBlog={handleEditBlog}
              onDeleteBlog={handleDeleteBlog}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryManage
              gallery={gallery}
              onAddGalleryItem={handleAddGalleryItem}
              onDeleteGalleryItem={handleDeleteGalleryItem}
            />
          )}

          {activeTab === 'clients' && (
            <ClientManage
              clients={clients}
              onAddClient={handleAddClient}
              onDeleteClient={handleDeleteClient}
            />
          )}

          {activeTab === 'content' && (
            <ContentManage
              content={content}
              onSaveContent={handleSaveContent}
            />
          )}
        </main>

      </div>
    </div>
  );
}
