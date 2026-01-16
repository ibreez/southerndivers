import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/hooks/useData';
import { ArrowLeft, Plus, Pencil, Trash2, Save, X, MoreHorizontal, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const AdminResource = ({ resourceKey, title, config }) => {
  const { data, loading, addItem, updateItem, deleteItem } = useData(resourceKey);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({});
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error('Delete aborted: missing item id');
      alert('Cannot delete this item because it has no valid ID.');
      return;
    }
    if (window.confirm('Permanent Action: Remove this item from the database?')) {
      deleteItem(id);
    }
  };

  const handleInputChange = (e, field) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field.name]: value }));
  };
  
  const handleListChange = (e, fieldName) => {
    const array = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, [fieldName]: array }));
  };

  const handleMultiselectChange = (fieldName, option, checked) => {
    setFormData(prev => {
      const currentCategories = prev[fieldName] || [];
      if (checked) {
        return { ...prev, [fieldName]: [...currentCategories, option] };
      } else {
        return { ...prev, [fieldName]: currentCategories.filter(cat => cat !== option) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    try {
      if (editingItem) {
        console.log('Updating item', editingItem.id, formData);
        await updateItem(editingItem.id || '', formData);
      } else {
        // Treat as create; also drop any id from payload
        const { id: _omit, ...payload } = formData || {};
        console.log('Adding item', payload);
        await addItem(payload);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Syncing Reef Data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-6 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="group p-3 bg-cyan-300 hover:bg-cyan-700 rounded-2xl transition-all duration-300">
              <ArrowLeft className="w-5 h-5 group-hover:text-white transition-colors" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Management Module</p>
            </div>
          </div>
          <Button 
            onClick={handleAddNew} 
            className="bg-cyan-300 hover:bg-cyan-700 text-white px-6 py-6 rounded-2xl shadow-lg shadow-slate-200 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-8 py-10">
        {/* Modern Table Layout */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  {config.columns.map(col => (
                    <th key={col} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {col}
                    </th>
                  ))}
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.map((item) => {
                  // Debug log for gallery items
                  if (resourceKey === 'gallery') {
                    console.log('Gallery item:', item);
                  }
                  return (
                    <tr key={item.id} className="group hover:bg-cyan-50/30 transition-colors">
                      {config.columns.map(col => (
                        <td key={col} className="px-8 py-5 text-sm font-medium text-slate-600">
                          {typeof item[col] === 'boolean' ? (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item[col] ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                              {item[col] ? 'Active' : 'Hidden'}
                            </span>
                          ) : col === 'categories' && Array.isArray(item[col]) ? (
                            <div className="flex flex-wrap gap-1">
                              {item[col].map(category => (
                                <span key={category} className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs font-medium rounded-md">
                                  {category}
                                </span>
                              ))}
                            </div>
                          ) : col === 'url' && item[col] ? (
                            <img src={item[col]} alt="" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                          ) : item[col]}
                        </td>
                      ))}
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="bg-cyan-300 hover:bg-white hover:text-blue-600 rounded-xl transition-all">
                            <FileEdit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="hover:bg-white hover:text-red-500 rounded-xl transition-all">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={config.columns.length + 1} className="px-8 py-20 text-center">
                      <div className="max-w-xs mx-auto space-y-3">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                          <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Records Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-in Modal Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6 bg-slate-900/20 backdrop-blur-sm">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white shadow-2xl w-full max-w-xl h-full rounded-[2.5rem] overflow-hidden flex flex-col"
            >
              <div className="px-8 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">
                    {editingItem ? 'Edit Entry' : 'Create Entry'}
                  </h2>
                  <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">{title}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)} className="rounded-full hover:bg-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <form id="resourceForm" onSubmit={handleSubmit} noValidate className="p-8 flex-1 overflow-y-auto space-y-8">
                {config.fields.map(field => (
                  <div key={field.name} className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">{field.label}</Label>
                    
                    <div className="relative group">
                      {field.type === 'textarea' ? (
                        <textarea
                          required
                          rows={5}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(e, field)}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-cyan-500/5 outline-none transition-all text-slate-700 font-medium"
                        />
                      ) : field.type === 'checkbox' ? (
                        <div className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-200">
                          <input
                            type="checkbox"
                            checked={formData[field.name] || false}
                            onChange={(e) => handleInputChange(e, field)}
                            className="w-5 h-5 rounded-lg border-slate-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                          />
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Visibility Active</span>
                        </div>
                      ) : field.type === 'list' ? (
                        <input
                          type="text"
                          required
                          value={Array.isArray(formData[field.name]) ? formData[field.name].join(', ') : (formData[field.name] || '')}
                          onChange={(e) => handleListChange(e, field.name)}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-cyan-500/5 outline-none transition-all text-slate-700 font-medium"
                          placeholder="Item 1, Item 2..."
                        />
                      ) : field.type === 'select' ? (
                        <select
                          required
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(e, field)}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-cyan-500/5 outline-none transition-all text-slate-700 font-medium appearance-none"
                        >
                          <option value="">Select Option</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'multiselect' ? (
                        <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-200">
                          {field.options.map(option => (
                            <div key={option} className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                id={`${field.name}-${option}`}
                                checked={(formData[field.name] || []).includes(option)}
                                onChange={(e) => handleMultiselectChange(field.name, option, e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                              />
                              <label
                                htmlFor={`${field.name}-${option}`}
                                className="text-sm font-medium text-slate-700 cursor-pointer"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          required={field.type !== 'checkbox'}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(e, field)}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-cyan-500/5 outline-none transition-all text-slate-700 font-medium"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </form>

              <div className="p-8 bg-slate-50/80 border-t border-slate-100 flex gap-4">
                <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} className="flex-1 py-7 rounded-2xl font-bold uppercase tracking-widest text-slate-400">
                  Discard
                </Button>
                <Button type="submit" form="resourceForm" className="flex-[2] bg-cyan-300 hover:bg-cyan-700 py-7 rounded-2xl font-bold uppercase tracking-widest text-white shadow-xl shadow-slate-200 transition-all">
                  <Save className="w-4 h-4 mr-2" />
                  Commit Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminResource;