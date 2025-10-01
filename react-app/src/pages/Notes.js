import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewNote, setShowNewNote] = useState(false);

  useEffect(() => {
    // Simulate loading notes data
    const mockNotes = [
      {
        id: 1,
        title: "Mathematics - Calculus Derivatives",
        content: "Key concepts for derivatives:\n\n1. Power rule: d/dx(x^n) = nx^(n-1)\n2. Product rule: d/dx(fg) = f'g + fg'\n3. Chain rule: d/dx(f(g(x))) = f'(g(x)) * g'(x)\n\nImportant examples:\n- d/dx(x^3) = 3x^2\n- d/dx(sin(x)) = cos(x)\n- d/dx(e^x) = e^x",
        subject: "Mathematics",
        date: "2024-01-15",
        tags: ["calculus", "derivatives", "math"],
        color: "blue"
      },
      {
        id: 2,
        title: "Physics - Newton's Laws",
        content: "Newton's Three Laws of Motion:\n\n1. First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.\n\n2. Second Law: F = ma (Force equals mass times acceleration)\n\n3. Third Law: For every action, there is an equal and opposite reaction.\n\nApplications:\n- Free body diagrams\n- Friction forces\n- Circular motion",
        subject: "Physics",
        date: "2024-01-14",
        tags: ["newton", "laws", "motion", "physics"],
        color: "green"
      },
      {
        id: 3,
        title: "Chemistry - Organic Reactions",
        content: "Common organic reactions:\n\n1. Substitution reactions\n2. Elimination reactions\n3. Addition reactions\n4. Oxidation and reduction\n\nMechanisms:\n- SN1 and SN2 reactions\n- E1 and E2 eliminations\n- Electrophilic addition\n\nImportant functional groups:\n- Alcohols, aldehydes, ketones\n- Carboxylic acids, esters",
        subject: "Chemistry",
        date: "2024-01-13",
        tags: ["organic", "reactions", "chemistry"],
        color: "purple"
      },
      {
        id: 4,
        title: "Biology - Cell Division",
        content: "Cell division processes:\n\nMitosis:\n1. Prophase - chromosomes condense\n2. Metaphase - chromosomes align\n3. Anaphase - chromosomes separate\n4. Telophase - nuclei reform\n\nMeiosis:\n- Two rounds of division\n- Produces gametes\n- Genetic diversity through crossing over\n\nKey differences between mitosis and meiosis",
        subject: "Biology",
        date: "2024-01-12",
        tags: ["cell", "division", "mitosis", "meiosis"],
        color: "orange"
      }
    ];
    
    setTimeout(() => {
      setNotes(mockNotes);
      setSelectedNote(mockNotes[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  const handleSaveNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      ...noteData,
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setShowNewNote(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex"
    >
      {/* Notes List */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-1/3 bg-white border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">My Notes</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewNote(true)}
              className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center"
            >
              +
            </motion.button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ backgroundColor: '#f8fafc' }}
              onClick={() => setSelectedNote(note)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedNote?.id === note.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  note.color === 'blue' ? 'bg-blue-500' :
                  note.color === 'green' ? 'bg-green-500' :
                  note.color === 'purple' ? 'bg-purple-500' :
                  note.color === 'orange' ? 'bg-orange-500' :
                  'bg-red-500'
                }`} />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{note.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{note.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{note.subject}</span>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{note.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Note Editor */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex-1 flex flex-col"
      >
        {selectedNote ? (
          <>
            {/* Note Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedNote.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{selectedNote.subject}</span>
                    <span className="text-sm text-gray-500">{selectedNote.date}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Note Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
              <div className="max-w-4xl">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {selectedNote.content}
                  </pre>
                </div>
                
                {/* Tags */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNote.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Select a note</h3>
              <p className="text-gray-500">Choose a note from the sidebar to view its content</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Notes;
