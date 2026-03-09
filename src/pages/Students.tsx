import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Download, 
  GraduationCap, 
  CheckCircle2, 
  XCircle,
  Trash2,
  UserCheck,
  UserX,
  Edit2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

import { Layout } from '../components/Layout/Layout';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All');
  const [activeMenuId, setActiveMenuId] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [students, setStudents] = useState([
    { id: "STU001", name: "Alex Johnson", email: "alex.j@example.com", status: "Active", coarse: "Computer Science", joined: "Oct 12, 2023" },
    { id: "STU002", name: "Sarah Williams", email: "sarah.w@example.com", status: "Active", coarse: "Business Admin", joined: "Nov 05, 2023" },
    { id: "STU003", name: "Michael Chen", email: "m.chen@example.com", status: "Inactive", coarse: "Digital Arts", joined: "Sep 20, 2023" },
    { id: "STU004", name: "Emily Davis", email: "emily.d@example.com", status: "Active", coarse: "Physics", joined: "Jan 15, 2024" },
    { id: "STU005", name: "Jordan Smith", email: "j.smith@example.com", status: "Active", coarse: "Mechanical Eng.", joined: "Feb 02, 2024" },
    { id: "STU006", name: "David Miller", email: "d.miller@example.com", status: "Active", coarse: "Computer Science", joined: "Mar 10, 2024" },
    { id: "STU007", name: "Jessica Taylor", email: "j.taylor@example.com", status: "Inactive", coarse: "Business Admin", joined: "Dec 22, 2023" },
    { id: "STU008", name: "Kevin Brown", email: "k.brown@example.com", status: "Active", coarse: "Digital Arts", joined: "Jan 05, 2024" },
    { id: "STU009", name: "Rachel Wilson", email: "r.wilson@example.com", status: "Active", coarse: "Physics", joined: "Feb 28, 2024" },
    { id: "STU010", name: "Brian Moore", email: "b.moore@example.com", status: "Inactive", coarse: "Mechanical Eng.", joined: "Nov 15, 2023" },
    { id: "STU011", name: "Sophia Garcia", email: "s.garcia@example.com", status: "Active", coarse: "Computer Science", joined: "Jan 30, 2024" },
    { id: "STU012", name: "James Anderson", email: "j.anderson@example.com", status: "Active", coarse: "Data Science", joined: "Dec 05, 2023" },
    { id: "STU013", name: "Olivia Martinez", email: "o.martinez@example.com", status: "Inactive", coarse: "Business Admin", joined: "Oct 28, 2023" },
    { id: "STU014", name: "William Thompson", email: "w.thompson@example.com", status: "Active", coarse: "Cyber Security", joined: "Mar 15, 2024" },
    { id: "STU015", name: "Isabella White", email: "i.white@example.com", status: "Active", coarse: "Digital Arts", joined: "Jan 12, 2024" },
    { id: "STU016", name: "Ethan Harris", email: "e.harris@example.com", status: "Active", coarse: "Physics", joined: "Feb 10, 2024" },
    { id: "STU017", name: "Mia Clark", email: "m.clark@example.com", status: "Active", coarse: "Computer Science", joined: "Nov 30, 2023" },
    { id: "STU018", name: "Benjamin Lewis", email: "b.lewis@example.com", status: "Inactive", coarse: "Mechanical Eng.", joined: "Dec 18, 2023" },
    { id: "STU019", name: "Charlotte Robinson", email: "c.robinson@example.com", status: "Active", coarse: "Business Admin", joined: "Mar 02, 2024" },
    { id: "STU020", name: "Lucas Walker", email: "l.walker@example.com", status: "Active", coarse: "Digital Arts", joined: "Feb 14, 2024" },
  ]);

  const stats = useMemo(() => ({
    total: students.length,
    active: students.filter(s => s.status === 'Active').length,
    inactive: students.filter(s => s.status === 'Inactive').length,
  }), [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = selectedTab === 'All' || student.status === selectedTab;
      return matchesSearch && matchesTab;
    });
  }, [students, searchTerm, selectedTab]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentItems = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm, selectedTab]);

  const handleDelete = () => {
    setStudents(prev => prev.filter(s => s.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  const handleEdit = (student: React.SetStateAction<null>) => {
    setEditingStudent(student);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const toggleStatus = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
    setActiveMenuId(null);
  };

  const handleSave = (e: { preventDefault: () => void; target: HTMLFormElement | undefined; }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      coarse: formData.get('course'),
    };

    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...data } : s));
    } else {
      const newStudent = {
        id: `STU${Math.floor(1000 + Math.random() * 9000)}`,
        ...data,
        status: "Active",
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setStudents([newStudent, ...students]);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  return (

    <Layout> 
    <div className="min-h-screen p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
      
      
      <style>{`
        @media print {
          /* Hide all UI elements */
          .no-print, nav, aside, footer, .modal-backdrop, button { 
            display: none !important; 
          }
          
          /* Show print-only data container */
          .print-only { 
            display: block !important; 
            width: 100% !important;
          }

          /* Reset body for clean white background */
          body { 
            background: white !important; 
            color: black !important; 
            margin: 0 !important; 
            padding: 1.5cm !important; 
          }

          /* Professional Data Table Styles for PDF */
          .pdf-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 20px !important;
          }
          .pdf-table th {
            background-color: #f3f4f6 !important;
            color: #374151 !important;
            text-align: left !important;
            padding: 10px !important;
            border: 1px solid #e5e7eb !important;
            font-size: 12px !important;
            text-transform: uppercase !important;
          }
          .pdf-table td {
            padding: 10px !important;
            border: 1px solid #e5e7eb !important;
            font-size: 11px !important;
          }
          .pdf-header {
            border-bottom: 2px solid #000 !important;
            margin-bottom: 20px !important;
            padding-bottom: 10px !important;
          }
        }
        .print-only { display: none; }
      `}</style>

      {/* --- DASHBOARD UI (HIDDEN DURING PRINT) --- */}
      <div className="no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Student Directory</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage enrollments and view student analytics.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-all text-sm font-medium"
            >
              <Download size={18} />
              Export All to PDF
            </button>
            <button 
              onClick={() => { setEditingStudent(null); setIsModalOpen(true); }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all text-sm font-medium"
            >
              <UserPlus size={18} />
              Add Student
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-xl"><GraduationCap size={24} /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Students</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 rounded-xl"><CheckCircle2 size={24} /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Active</p>
                <h3 className="text-2xl font-bold">{stats.active}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-100 dark:bg-rose-500/10 text-rose-600 rounded-xl"><XCircle size={24} /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Inactive</p>
                <h3 className="text-2xl font-bold">{stats.inactive}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full lg:w-80 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              {['All', 'Active', 'Inactive'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTab === tab ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/30 text-slate-500 text-xs uppercase font-semibold">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {currentItems.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">{student.name.charAt(0)}</div>
                        <div>
                          <p className="font-semibold text-sm">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{student.coarse}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)} className="p-1 hover:bg-slate-100 rounded">
                        <MoreVertical size={16} />
                      </button>
                      {activeMenuId === student.id && (
                        <div className="absolute right-6 mt-1 w-32 bg-white dark:bg-slate-800 shadow-xl border rounded-lg z-50 text-left py-1">
                          <button onClick={() => handleEdit(student)} className="w-full px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-2"><Edit2 size={12}/> Edit</button>
                          <button onClick={() => toggleStatus(student.id)} className="w-full px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-2">
                             {student.status === 'Active' ? <UserX size={12}/> : <UserCheck size={12}/>} Status
                          </button>
                          <button onClick={() => setConfirmDeleteId(student.id)} className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"><Trash2 size={12}/> Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex items-center justify-between">
            <span className="text-xs text-slate-500">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1 border rounded disabled:opacity-30"><ChevronLeft size={16}/></button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1 border rounded disabled:opacity-30"><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PURE DATA PRINT CONTAINER ---
          This is what the PDF actually contains.
      */}
      <div className="print-only">
        <div className="pdf-header">
          <h1 className="text-2xl font-bold">STUDENT ENROLLMENT REPORT</h1>
          <p className="text-sm">Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border p-2 text-center"><strong>Total:</strong> {stats.total}</div>
          <div className="border p-2 text-center"><strong>Active:</strong> {stats.active}</div>
          <div className="border p-2 text-center"><strong>Inactive:</strong> {stats.inactive}</div>
        </div>

        <table className="pdf-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email Address</th>
              <th>Course</th>
              <th>Status</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td><strong>{s.name}</strong></td>
                <td>{s.email}</td>
                <td>{s.coarse}</td>
                <td>{s.status}</td>
                <td>{s.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-10 pt-4 border-t text-[10px] text-gray-400">
          Official Student Directory Data Export - Page 1 of 1
        </div>
      </div>

      {/* Modals & Dialogs (Hides automatically during print) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl border">
            <h2 className="text-xl font-bold mb-6">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input name="name" defaultValue={editingStudent?.name} required className="w-full px-4 py-2 rounded-xl border dark:bg-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input name="email" type="email" defaultValue={editingStudent?.email} required className="w-full px-4 py-2 rounded-xl border dark:bg-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <input name="course" defaultValue={editingStudent?.coarse} required className="w-full px-4 py-2 rounded-xl border dark:bg-slate-900" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl border-rose-100 border">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4"><AlertTriangle size={24} /></div>
            <h3 className="text-lg font-bold mb-2">Delete Student?</h3>
            <p className="text-sm text-slate-500 mb-6">Confirm deletion of student record.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 py-2 rounded-xl border">No</button>
              <button onClick={handleDelete} className="flex-1 py-2 bg-rose-600 text-white rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>

    </Layout>
  );
}