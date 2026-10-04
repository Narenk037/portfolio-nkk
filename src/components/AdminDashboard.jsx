import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  LogOut, 
  Layers, 
  Briefcase, 
  Award, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Inbox,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TiltCard } from './TiltCard';
import { 
  logoutAdmin, 
  addCollectionItem, 
  updateCollectionItem, 
  deleteCollectionItem 
} from '../services/portfolioService';

export const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  // Read current live data from Window custom state or localStorage fallback
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem("nkk_portfolio_local_data_v2");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  // Listen to live data changes
  React.useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem("nkk_portfolio_local_data_v2");
        if (stored) setData(JSON.parse(stored));
      } catch (e) {}
    };
    window.addEventListener("portfolioDataUpdated", handleUpdate);
    return () => window.removeEventListener("portfolioDataUpdated", handleUpdate);
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    if (onLogout) onLogout();
    navigate('/login');
  };

  const handleOpenCreate = () => {
    setFormData({});
    setEditingItem(null);
    setIsNewModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    const copy = { ...item };
    if (Array.isArray(item.highlights)) {
      copy.highlightsInput = item.highlights.join('\n');
    }
    setFormData(copy);
    setEditingItem(item.id);
    setIsNewModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (payload.highlightsInput !== undefined) {
      payload.highlights = payload.highlightsInput
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);
      delete payload.highlightsInput;
    }
    if (editingItem) {
      await updateCollectionItem(activeTab, editingItem, payload);
    } else {
      await addCollectionItem(activeTab, payload);
    }
    setIsNewModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteCollectionItem(activeTab, id);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="glass-card p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Control Center</h1>
            <p className="text-xs text-slate-500">
              Logged in as <span className="font-semibold text-blue-600">Narendiran K K (Admin)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs Row (Campaigns & Projects Removed) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'skills', label: 'Skills Manager', icon: Layers, count: (data.skills || []).length },
          { id: 'experience', label: 'Experience Timeline', icon: Briefcase, count: (data.experience || []).length },
          { id: 'certificates', label: 'Certificates', icon: Award, count: (data.certificates || []).length },
          { id: 'messages', label: 'Messages Inbox', icon: Inbox, count: (data.messages || []).length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsNewModalOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Area Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 capitalize">
          Managing {activeTab}
        </h2>

        {activeTab !== 'messages' && (
          <button
            onClick={handleOpenCreate}
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New {activeTab.slice(0, -1)}</span>
          </button>
        )}
      </div>

      {/* 1. SKILLS */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.skills || []).map((skill) => (
            <TiltCard key={skill.id} className="p-6 space-y-3 border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-600">{skill.category}</span>
                  <h3 className="text-lg font-bold text-slate-900">{skill.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(skill)} className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600">{skill.description}</p>
            </TiltCard>
          ))}
        </div>
      )}

      {/* 2. EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          {(data.experience || []).map((exp) => (
            <TiltCard key={exp.id} className="p-6 space-y-3 border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-600">{exp.period}</span>
                  <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                  <p className="text-sm font-semibold text-slate-700">{exp.company} • {exp.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(exp)} className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {exp.description && <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">"{exp.description}"</p>}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-1 pt-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </TiltCard>
          ))}
        </div>
      )}

      {/* 3. CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.certificates || []).map((cert) => (
            <TiltCard key={cert.id} className="p-6 space-y-3 border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-600">{cert.grade}</span>
                  <h3 className="text-lg font-bold text-slate-900">{cert.title}</h3>
                  <p className="text-xs text-slate-500">Issuer: {cert.issuer} ({cert.year})</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleOpenEdit(cert)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      )}

      {/* 4. MESSAGES INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          {(!data.messages || data.messages.length === 0) ? (
            <div className="glass-card p-12 text-center text-slate-500 space-y-2">
              <Inbox className="w-10 h-10 mx-auto text-slate-400" />
              <p className="font-semibold text-base">No Client Inquiries Yet</p>
              <p className="text-xs">Submissions from the public Contact form will appear here in real-time.</p>
            </div>
          ) : (
            data.messages.map((msg) => (
              <TiltCard key={msg.id} className="p-6 space-y-3 border-slate-200">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-xs text-blue-600 hover:underline">{msg.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                    <button onClick={() => handleDelete(msg.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {msg.message}
                </p>
              </TiltCard>
            ))
          )}
        </div>
      )}

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {isNewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card max-w-lg w-full p-6 rounded-3xl space-y-5 shadow-2xl border-slate-300 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-lg capitalize">
                  {editingItem ? 'Edit' : 'Create New'} {activeTab.slice(0, -1)}
                </h3>
                <button onClick={() => setIsNewModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Dynamically Render Inputs Based on Active Tab */}
                {activeTab === 'skills' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Skill Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Google Ads Campaign Manager"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. SEM / Paid Search"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                      <textarea
                        rows="3"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Short description of skill..."
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'experience' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Job Role Title</label>
                      <input
                        type="text"
                        required
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Digital Marketing Executive"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. APD Group of Companies"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Period</label>
                        <input
                          type="text"
                          value={formData.period || ''}
                          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                          placeholder="e.g. 10/2024 – Present"
                          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Chennai"
                          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Role Overview / Description</label>
                      <textarea
                        rows="3"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Summary of responsibilities and achievements..."
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Key Deliverables & Bullet Highlights (One per line)</label>
                      <textarea
                        rows="4"
                        value={formData.highlightsInput || ''}
                        onChange={(e) => setFormData({ ...formData, highlightsInput: e.target.value })}
                        placeholder="e.g. Managed paid campaigns across Google Ads & Meta&#10;Spearheaded SEO analytics & backlink strategy&#10;Crafted email marketing sequences"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'certificates' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Certificate Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Typewriting English — Senior Grade"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Issuer / Institution</label>
                      <input
                        type="text"
                        value={formData.issuer || ''}
                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                        placeholder="e.g. DOTE"
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                  </>
                )}

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
