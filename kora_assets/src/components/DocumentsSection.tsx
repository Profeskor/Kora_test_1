import { useState } from 'react';
import { FileText, Upload, Download, Trash2, Eye, Search } from 'lucide-react';

export function DocumentsSection() {
  const [documents] = useState([
    { id: 1, name: 'Lease Agreement.pdf', type: 'Lease', size: '2.4 MB', uploadDate: '2024-11-15' },
    { id: 2, name: 'ID Proof.pdf', type: 'Identity', size: '1.8 MB', uploadDate: '2024-11-15' },
    { id: 3, name: 'Proof of Address.pdf', type: 'Address', size: '1.2 MB', uploadDate: '2024-11-15' },
    { id: 4, name: 'Income Statement.pdf', type: 'Financial', size: '3.1 MB', uploadDate: '2024-11-14' },
    { id: 5, name: 'Move-in Checklist.pdf', type: 'Property', size: '890 KB', uploadDate: '2024-11-10' },
    { id: 6, name: 'Insurance Policy.pdf', type: 'Insurance', size: '2.2 MB', uploadDate: '2024-11-08' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const handleUpload = () => {
    setUploadingDoc(true);
    setTimeout(() => setUploadingDoc(false), 1500);
  };

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-gray-900 mb-1">Documents</h1>
          <p className="text-gray-500 text-sm">Manage your property documents</p>
        </div>
        <button
          onClick={handleUpload}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004760] transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>Upload</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none"
          />
        </div>
        <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#005B78] focus:border-transparent outline-none">
          <option>All Types</option>
          <option>Title Deeds</option>
          <option>Contracts</option>
          <option>Invoices</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-[#CCE5EB] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#005B78]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1 truncate">{doc.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{doc.type} • {doc.size}</p>
                  <p className="text-gray-400 text-xs">Uploaded {doc.uploadDate}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm">View</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}