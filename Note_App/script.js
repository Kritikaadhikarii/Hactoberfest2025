class NotesApp {
    constructor() {
        this.notes = this.loadNotes();
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderNotes();
        this.updateEmptyState();
    }

    bindEvents() {
        const addBtn = document.getElementById('add-note-btn');
        const searchInput = document.getElementById('search-input');

        addBtn.addEventListener('click', () => this.createNote());
        searchInput.addEventListener('input', (e) => this.searchNotes(e.target.value));
    }

    createNote() {
        const newNote = {
            id: Date.now(),
            title: '',
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.unshift(newNote);
        this.saveNotes();
        this.renderNotes();
        this.updateEmptyState();

        // Focus on the new note's title
        setTimeout(() => {
            const noteCard = document.querySelector(`[data-id="${newNote.id}"]`);
            if (noteCard) {
                const titleInput = noteCard.querySelector('.note-title');
                titleInput.focus();
                this.editNote(newNote.id);
            }
        }, 100);
    }

    editNote(id) {
        const noteCard = document.querySelector(`[data-id="${id}"]`);
        if (noteCard) {
            noteCard.classList.add('editing');
            this.currentEditId = id;

            const titleInput = noteCard.querySelector('.note-title');
            const contentInput = noteCard.querySelector('.note-content');

            titleInput.readOnly = false;
            contentInput.readOnly = false;
        }
    }

    saveNote(id) {
        const noteCard = document.querySelector(`[data-id="${id}"]`);
        if (noteCard) {
            const titleInput = noteCard.querySelector('.note-title');
            const contentInput = noteCard.querySelector('.note-content');

            const noteIndex = this.notes.findIndex(note => note.id === id);
            if (noteIndex !== -1) {
                this.notes[noteIndex].title = titleInput.value.trim();
                this.notes[noteIndex].content = contentInput.value.trim();
                this.notes[noteIndex].updatedAt = new Date().toISOString();

                // Remove empty notes
                if (!this.notes[noteIndex].title && !this.notes[noteIndex].content) {
                    this.deleteNote(id);
                    return;
                }

                this.saveNotes();
                noteCard.classList.remove('editing');
                titleInput.readOnly = true;
                contentInput.readOnly = true;
                this.currentEditId = null;
            }
        }
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
        this.updateEmptyState();
    }

    searchNotes(searchTerm) {
        const filteredNotes = this.notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = this.notes) {
        const container = document.getElementById('notes-container');
        container.innerHTML = '';

        notesToRender.forEach(note => {
            const noteElement = this.createNoteElement(note);
            container.appendChild(noteElement);
        });
    }

    createNoteElement(note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-card';
        noteDiv.setAttribute('data-id', note.id);

        const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        noteDiv.innerHTML = `
            <div class="note-header">
                <textarea class="note-title" placeholder="Note title..." readonly>${note.title}</textarea>
                <div class="note-actions">
                    <button class="action-btn edit-btn" onclick="app.editNote(${note.id})">✏️</button>
                    <button class="action-btn delete-btn" onclick="app.deleteNote(${note.id})">🗑️</button>
                </div>
            </div>
            <textarea class="note-content" placeholder="Write your note here..." readonly>${note.content}</textarea>
            <div class="note-timestamp">${formattedDate}</div>
        `;

        // Add event listeners for auto-save
        const titleInput = noteDiv.querySelector('.note-title');
        const contentInput = noteDiv.querySelector('.note-content');

        titleInput.addEventListener('blur', () => {
            if (this.currentEditId === note.id) {
                this.saveNote(note.id);
            }
        });

        contentInput.addEventListener('blur', () => {
            if (this.currentEditId === note.id) {
                this.saveNote(note.id);
            }
        });

        // Auto-resize textareas
        [titleInput, contentInput].forEach(textarea => {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });
        });

        return noteDiv;
    }

    updateEmptyState() {
        const emptyState = document.getElementById('empty-state');
        const notesContainer = document.getElementById('notes-container');

        if (this.notes.length === 0) {
            emptyState.classList.add('visible');
            notesContainer.style.display = 'none';
        } else {
            emptyState.classList.remove('visible');
            notesContainer.style.display = 'grid';
        }
    }

    saveNotes() {
        localStorage.setItem('notes-app-data', JSON.stringify(this.notes));
    }

    loadNotes() {
        const stored = localStorage.getItem('notes-app-data');
        return stored ? JSON.parse(stored) : [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new NotesApp();
});
