const API_URL = 'https://chatbot-interaction--sdobaaboubacar.replit.app';

const STATE = {
  isLoading: false,
  currentConversationId: null,
  conversations: [],
  sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true'
};

const QUICK_QUESTIONS = {
  culture:    "🌱 Quelles sont les meilleures cultures à faire en Côte d'Ivoire selon la saison ?",
  irrigation: "💧 Comment optimiser l'irrigation de mes cultures en saison sèche ?",
  maladies:   "🦠 Comment identifier et traiter les maladies courantes des plantes ?",
  meteo:      "🌤️ Quel est le meilleur moment pour planter en Côte d'Ivoire ?"
};

// ============================================
// SIDEBAR TOGGLE
// ============================================

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const collapsing = !STATE.sidebarCollapsed;
  
  STATE.sidebarCollapsed = collapsing;
  localStorage.setItem('sidebarCollapsed', collapsing);
  
  if (collapsing) {
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
  }
}

// ============================================
// STORAGE & HISTORIQUE
// ============================================

function saveConversations() {
  localStorage.setItem('conversations', JSON.stringify(STATE.conversations));
}

function loadConversations() {
  const saved = localStorage.getItem('conversations');
  STATE.conversations = saved ? JSON.parse(saved) : [];
}

function generateId() {
  return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function createNewConversation() {
  const id = generateId();
  STATE.conversations.unshift({
    id,
    title: 'Nouvelle conversation',
    messages: [],
    createdAt: new Date().toISOString()
  });
  STATE.currentConversationId = id;
  saveConversations();
  return id;
}

function getCurrentConversation() {
  return STATE.conversations.find(c => c.id === STATE.currentConversationId);
}

function updateConversationTitle(id, newTitle) {
  const conv = STATE.conversations.find(c => c.id === id);
  if (conv) {
    conv.title = newTitle;
    saveConversations();
  }
}

function deleteConversation(id) {
  STATE.conversations = STATE.conversations.filter(c => c.id !== id);
  if (STATE.currentConversationId === id) {
    if (STATE.conversations.length > 0) {
      STATE.currentConversationId = STATE.conversations[0].id;
    } else {
      createNewConversation();
    }
  }
  saveConversations();
  renderConversationsList();
  loadConversation(STATE.currentConversationId);
}

function clearAllConversations() {
  if (confirm('⚠️ Êtes-vous sûr ? Toutes les conversations seront supprimées !')) {
    STATE.conversations = [];
    createNewConversation();
    saveConversations();
    renderConversationsList();
    clearChatMessages();
  }
}

// ============================================
// API CALL
// ============================================

async function getAIResponse(userMessage) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  });
  if (!response.ok) {
    throw new Error('Erreur serveur ' + response.status);
  }
  const data = await response.json();
  return data.reply;
}

// ============================================
// DOM UPDATES
// ============================================

function clearChatMessages() {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';
}

function renderConversationsList() {
  const list = document.getElementById('conversations-list');
  list.innerHTML = '';

  STATE.conversations.forEach(conv => {
    const item = document.createElement('div');
    item.className = 'conversation-item' + (STATE.currentConversationId === conv.id ? ' active' : '');
    
    const title = document.createElement('div');
    title.className = 'conversation-title';
    title.textContent = conv.title;
    title.addEventListener('click', () => loadConversation(conv.id));

    const actions = document.createElement('div');
    actions.className = 'conversation-actions';

    const renameBtn = document.createElement('button');
    renameBtn.className = 'rename-btn';
    renameBtn.textContent = '✏️';
    renameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openRenameModal(conv.id, conv.title);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Supprimer cette conversation ?')) {
        deleteConversation(conv.id);
      }
    });

    actions.appendChild(renameBtn);
    actions.appendChild(deleteBtn);

    item.appendChild(title);
    item.appendChild(actions);
    list.appendChild(item);
  });
}

function loadConversation(id) {
  STATE.currentConversationId = id;
  const conv = getCurrentConversation();
  clearChatMessages();
  
  if (conv.messages.length === 0) {
    displayWelcomeMessage();
  } else {
    conv.messages.forEach(msg => {
      addMessage(msg.text, msg.isUser, false);
    });
  }

  renderConversationsList();
}

function displayWelcomeMessage() {
  const chatMessages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message bot-message';
  div.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <p><strong>Bienvenue sur SEG-KAFOLOH IA ! 🌾</strong><br>
      Je suis votre assistant agricole. Choisissez un sujet ou posez votre question.</p>
      <div class="quick-questions">
        <button class="quick-btn" data-question="culture">🌱 Cultures</button>
        <button class="quick-btn" data-question="irrigation">💧 Irrigation</button>
        <button class="quick-btn" data-question="maladies">🦠 Maladies</button>
        <button class="quick-btn" data-question="meteo">🌤️ Météo</button>
      </div>
    </div>
  `;
  chatMessages.appendChild(div);
  attachQuickButtonListeners();
}

function addMessage(text, isUser, save = true) {
  const chatMessages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message ' + (isUser ? 'user-message' : 'bot-message');
  div.style.opacity = '0';
  div.style.transform = 'translateY(12px)';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isUser ? '👤' : '🤖';

  const content = document.createElement('div');
  content.className = 'message-content';

  const p = document.createElement('p');
  p.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  content.appendChild(p);

  div.appendChild(avatar);
  div.appendChild(content);
  chatMessages.appendChild(div);

  requestAnimationFrame(function() {
    div.style.transition = 'all 0.4s ease';
    div.style.opacity = '1';
    div.style.transform = 'translateY(0)';
  });

  setTimeout(function() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 80);

  if (save) {
    const conv = getCurrentConversation();
    if (conv) {
      conv.messages.push({ text, isUser, timestamp: new Date().toISOString() });
      
      if (conv.messages.length === 1 && isUser) {
        updateConversationTitle(conv.id, text.substring(0, 40) + '...');
      }
      
      saveConversations();
      renderConversationsList();
    }
  }
}

function setUIState(disabled) {
  STATE.isLoading = disabled;
  document.getElementById('send-btn').disabled = disabled;
  document.getElementById('user-input').disabled = disabled;
  document.querySelectorAll('.quick-btn').forEach(b => { b.disabled = disabled; });
}

// ============================================
// MODAL RENAME
// ============================================

function openRenameModal(id, currentTitle) {
  const modal = document.createElement('div');
  modal.className = 'rename-modal';
  modal.innerHTML = `
    <div class="rename-modal-content">
      <h3>Renommer la conversation</h3>
      <input type="text" id="rename-input" value="${currentTitle}" placeholder="Nouveau titre...">
      <div class="rename-modal-actions">
        <button class="rename-cancel" id="rename-cancel">Annuler</button>
        <button class="rename-confirm" id="rename-confirm">Renommer</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = modal.querySelector('#rename-input');
  input.focus();
  input.select();

  modal.querySelector('#rename-cancel').addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelector('#rename-confirm').addEventListener('click', () => {
    const newTitle = input.value.trim() || 'Sans titre';
    updateConversationTitle(id, newTitle);
    renderConversationsList();
    modal.remove();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') modal.querySelector('#rename-confirm').click();
    if (e.key === 'Escape') modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function attachQuickButtonListeners() {
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', async function() {
      const message = QUICK_QUESTIONS[btn.dataset.question];
      await handleMessage(message);
    });
  });
}

// ============================================
// MAIN HANDLER
// ============================================

async function handleMessage(message) {
  message = (message || '').trim();
  if (!message || STATE.isLoading) return;

  setUIState(true);
  addMessage(message, true);
  document.getElementById('user-input').value = '';
  document.getElementById('typing-indicator').style.display = 'flex';

  try {
    const reply = await getAIResponse(message);
    document.getElementById('typing-indicator').style.display = 'none';
    addMessage(reply, false);
  } catch (error) {
    document.getElementById('typing-indicator').style.display = 'none';
    addMessage('❌ ' + error.message, false);
  } finally {
    setUIState(false);
    document.getElementById('user-input').focus();
  }
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  loadConversations();
  if (STATE.conversations.length === 0) {
    createNewConversation();
  }
  STATE.currentConversationId = STATE.conversations[0].id;
  
  renderConversationsList();
  loadConversation(STATE.currentConversationId);

  // Apply sidebar state
  const sidebar = document.getElementById('sidebar');
  if (STATE.sidebarCollapsed) {
    sidebar.classList.add('collapsed');
  }

  // DOM elements
  const userInput = document.getElementById('user-input');
  const chatForm = document.getElementById('chat-form');
  const userSession = document.getElementById('user-session');
  const newChatBtn = document.getElementById('new-chat-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const collapseBtn = document.getElementById('collapse-btn');
  const floatingToggle = document.getElementById('sidebar-toggle-floating');

  // Update time
  function updateTime() {
    if (userSession) {
      userSession.textContent = '⏰ ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
  }
  updateTime();
  setInterval(updateTime, 60000);

  // Event listeners
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleMessage(userInput.value);
  });

  userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey && !STATE.isLoading) {
      e.preventDefault();
      handleMessage(userInput.value);
    }
  });

  newChatBtn.addEventListener('click', () => {
    createNewConversation();
    renderConversationsList();
    clearChatMessages();
    displayWelcomeMessage();
    userInput.focus();
  });

  clearAllBtn.addEventListener('click', clearAllConversations);

  collapseBtn.addEventListener('click', toggleSidebar);

  floatingToggle.addEventListener('click', toggleSidebar);
});