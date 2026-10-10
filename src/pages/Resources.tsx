import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Video,
  Link as LinkIcon,
  FileIcon,
  Search,
  Plus,
  X,
  Download,
  Eye,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Resource } from '../types';
import './Resources.css';

const Resources: React.FC = () => {
  const { currentUser, resources, addResource, deleteResource } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    title: '',
    description: '',
    type: 'PDF',
    category: 'Policy',
  });

  const isAdmin = currentUser.role === 'admin' || currentUser.role === 'manager';

  const categories = ['all', 'Policy', 'Benefits', 'IT', 'Culture', 'Training'];

  const getFilteredResources = () => {
    return resources.filter(resource => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const handleUpload = () => {
    if (newResource.title && newResource.description) {
      const resource: Resource = {
        id: `r${Date.now()}`,
        title: newResource.title,
        description: newResource.description || '',
        type: newResource.type || 'PDF',
        url: '#',
        category: newResource.category || 'Policy',
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: currentUser.name,
      };
      addResource(resource);
      setShowUploadModal(false);
      setNewResource({ title: '', description: '', type: 'PDF', category: 'Policy' });
    }
  };

  const handlePreview = (resource: Resource) => {
    setSelectedResource(resource);
    setShowPreviewModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteResource(id);
    }
  };

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'PDF':
        return <FileText size={24} />;
      case 'Video':
        return <Video size={24} />;
      case 'Link':
        return <LinkIcon size={24} />;
      case 'Document':
        return <FileIcon size={24} />;
    }
  };

  const filteredResources = getFilteredResources();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="resources-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <div>
          <h1>Resource Library</h1>
          <p className="subtitle">
            {isAdmin
              ? 'Manage company resources and documentation'
              : 'Access company policies, guides, and training materials'}
          </p>
        </div>
        {isAdmin && (
          <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
            <Plus size={20} />
            Upload Resource
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <motion.div className="search-section glass-card" variants={item}>
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        className="resources-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {filteredResources.map(resource => (
            <motion.div
              key={resource.id}
              className="resource-card glass-card"
              variants={item}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="resource-icon">{getIcon(resource.type)}</div>
              <div className="resource-content">
                <div className="resource-type">{resource.type}</div>
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-meta">
                  <span className="resource-category">{resource.category}</span>
                  <span className="resource-date">
                    {new Date(resource.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                {resource.uploadedBy && (
                  <div className="resource-uploader">Uploaded by {resource.uploadedBy}</div>
                )}
              </div>
              <div className="resource-actions">
                <button
                  className="action-btn preview"
                  onClick={() => handlePreview(resource)}
                  title="Preview"
                >
                  <Eye size={18} />
                </button>
                <button className="action-btn download" title="Download">
                  <Download size={18} />
                </button>
                {isAdmin && (
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(resource.id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredResources.length === 0 && (
        <motion.div
          className="empty-state glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FileText size={64} color="var(--accent-cyan)" />
          <h3>No resources found</h3>
          <p>Try adjusting your search or filters</p>
        </motion.div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              className="modal-content glass-card-strong"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Upload New Resource</h2>
                <button className="close-btn" onClick={() => setShowUploadModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Resource title"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Resource description"
                    value={newResource.description}
                    onChange={(e) =>
                      setNewResource({ ...newResource, description: e.target.value })
                    }
                    className="form-textarea"
                    rows={4}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={newResource.type}
                      onChange={(e) =>
                        setNewResource({
                          ...newResource,
                          type: e.target.value as Resource['type'],
                        })
                      }
                      className="form-select"
                    >
                      <option value="PDF">PDF</option>
                      <option value="Video">Video</option>
                      <option value="Link">Link</option>
                      <option value="Document">Document</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newResource.category}
                      onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                      className="form-select"
                    >
                      <option value="Policy">Policy</option>
                      <option value="Benefits">Benefits</option>
                      <option value="IT">IT</option>
                      <option value="Culture">Culture</option>
                      <option value="Training">Training</option>
                    </select>
                  </div>
                </div>

                <div className="file-upload-area glass-card">
                  <FileIcon size={48} />
                  <p>Drag & drop files here or click to browse</p>
                  <span className="file-hint">Supports PDF, DOC, MP4, and more</span>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleUpload}>
                  <Plus size={20} />
                  Upload Resource
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && selectedResource && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              className="modal-content glass-card-strong preview-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h2>{selectedResource.title}</h2>
                  <span className="resource-type">{selectedResource.type}</span>
                </div>
                <button className="close-btn" onClick={() => setShowPreviewModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body">
                <p className="preview-description">{selectedResource.description}</p>
                <div className="preview-meta">
                  <div className="meta-item">
                    <strong>Category:</strong> {selectedResource.category}
                  </div>
                  <div className="meta-item">
                    <strong>Uploaded:</strong>{' '}
                    {new Date(selectedResource.uploadedAt).toLocaleDateString()}
                  </div>
                  {selectedResource.uploadedBy && (
                    <div className="meta-item">
                      <strong>Uploaded by:</strong> {selectedResource.uploadedBy}
                    </div>
                  )}
                </div>
                <div className="preview-placeholder glass-card">
                  {getIcon(selectedResource.type)}
                  <p>Preview for {selectedResource.type} files</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-primary">
                  <Download size={20} />
                  Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Resources;
