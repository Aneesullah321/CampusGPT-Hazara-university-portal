// Universal Chatbot for Hazara University
// This file can be included on any page

(function() {
  'use strict';

  // Chatbot responses for Hazara University
  const HU_RESPONSES = {
    // Greetings
    'hello': 'Hello! Welcome to Hazara University. How can I assist you today?',
    'hi': 'Hi there! I\'m here to help with any questions about HU. What would you like to know?',
    'salam': 'Wa alaykum salam! Welcome to Hazara University. How can I help you?',
    
    // University Information
    'university': 'Hazara University is located in Dhodial, Mansehra, Khyber Pakhtunkhwa, Pakistan. We offer various undergraduate and graduate programs.',
    'location': 'Hazara University is located in Dhodial, Mansehra, Khyber Pakhtunkhwa, Pakistan.',
    'address': 'Our address is: Hazara University, Dhodial, Mansehra, Khyber Pakhtunkhwa, Pakistan.',
    
    // Admissions
    'admission': 'For admissions, please visit our admissions page or contact us at +92-997-414143-47. Application deadlines vary by program.',
    'admissions': 'For admissions, please visit our admissions page or contact us at +92-997-414143-47. Application deadlines vary by program.',
    'apply': 'You can apply online through our admissions portal. Visit the admissions page for more details and requirements.',
    'fee': 'Fee structures vary by program. Please contact our admissions office at +92-997-414143-47 for detailed fee information.',
    'fees': 'Fee structures vary by program. Please contact our admissions office at +92-997-414143-47 for detailed fee information.',
    
    // Programs
    'programs': 'We offer various undergraduate and graduate programs across multiple faculties. Check our Programs page for complete details.',
    'courses': 'We offer various undergraduate and graduate programs across multiple faculties. Check our Programs page for complete details.',
    'faculties': 'Our university has multiple faculties offering diverse academic programs. Visit the Faculties page for more information.',
    
    // Contact Information
    'contact': 'You can reach us at:\n📞 Phone: +92-997-414143-47\n📧 Email: info@hu.edu.pk\n📍 Address: Dhodial, Mansehra, KPK',
    'phone': 'Our phone number is +92-997-414143-47',
    'email': 'Our email address is info@hu.edu.pk',
    
    // Library
    'library': 'Our library provides extensive resources for students and faculty. Visit the Library page for more information about services and timings.',
    
    // Research
    'research': 'Hazara University is committed to research and innovation. Visit our Research page to learn about ongoing projects and opportunities.',
    
    // Help and Support
    'help': 'I can help you with information about:\n• Admissions and applications\n• Programs and courses\n• Contact information\n• University facilities\n• General inquiries',
    'support': 'For technical support or detailed assistance, please contact our support team at +92-997-414143-47 or email info@hu.edu.pk',
    
    // Gratitude
    'thank': 'You\'re welcome! Is there anything else about Hazara University I can help you with?',
    'thanks': 'You\'re welcome! Is there anything else about Hazara University I can help you with?',
    'thank you': 'You\'re welcome! Is there anything else about Hazara University I can help you with?',
    
    // Farewell
    'bye': 'Goodbye! Thank you for visiting Hazara University. Have a great day!',
    'goodbye': 'Goodbye! Thank you for visiting Hazara University. Have a great day!',
    
    // Student Portal
    'portal': 'You can access the Student Portal through our website. Login with your student credentials.',
    'login': 'Student login is available through our Student Portal page.',
    
    // Calendar
    'calendar': 'Check our Academic Calendar page for important dates, exam schedules, and university events.',
    'schedule': 'Check our Academic Calendar page for important dates, exam schedules, and university events.',
    'exam': 'Exam schedules are available on our Academic Calendar page. For specific exam information, contact your department.',
    'exams': 'Exam schedules are available on our Academic Calendar page. For specific exam information, contact your department.'
  };

  // Initialize chatbot when DOM is ready
  function initializeChatbot() {
    if (document.getElementById('hu-chatbot-widget')) {
      return; // Already initialized
    }

    // Create chatbot HTML
    const chatbotHTML = `
      <!-- Hazara University Chatbot -->
      <button class="hu-chatbot-toggle" onclick="HUChatbot.toggle()">
        <i class="fas fa-comments"></i> Need Help?
      </button>

      <div class="hu-chatbot-container" id="hu-chatbot-container">
        <div class="hu-chatbot-header">
          <h3><i class="fas fa-robot"></i> HU Assistant</h3>
          <button class="hu-chatbot-close" onclick="HUChatbot.close()">×</button>
        </div>
        <div class="hu-chatbot-messages" id="hu-chatbot-messages">
          <div class="hu-chat-message hu-bot-message">Hi! Welcome to Hazara University! 👋
How can I help you today?</div>
        </div>
        <div class="hu-chatbot-input">
          <input type="text" id="hu-chatbot-input" placeholder="Type your message..." onkeypress="HUChatbot.handleKeyPress(event)">
          <button class="hu-chatbot-send" onclick="HUChatbot.sendMessage()">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;

    // Create container and add to body
    const widget = document.createElement('div');
    widget.id = 'hu-chatbot-widget';
    widget.innerHTML = chatbotHTML;
    document.body.appendChild(widget);
  }

  // Global chatbot object
  window.HUChatbot = {
    toggle: function() {
      const container = document.getElementById('hu-chatbot-container');
      const input = document.getElementById('hu-chatbot-input');
      
      if (container && container.classList.contains('active')) {
        container.classList.remove('active');
      } else if (container) {
        container.classList.add('active');
        if (input) {
          setTimeout(() => input.focus(), 100);
        }
      }
    },

    close: function() {
      const container = document.getElementById('hu-chatbot-container');
      if (container) {
        container.classList.remove('active');
      }
    },

    handleKeyPress: function(event) {
      if (event.key === 'Enter') {
        this.sendMessage();
      }
    },

    sendMessage: function() {
      const input = document.getElementById('hu-chatbot-input');
      const messages = document.getElementById('hu-chatbot-messages');
      
      if (!input || !messages) return;
      
      const message = input.value.trim();
      if (message === '') return;

      // Add user message
      this.addMessage(message, true);
      input.value = '';

      // Add bot response after delay
      setTimeout(() => {
        const response = this.getBotResponse(message);
        this.addMessage(response, false);
      }, 800);
    },

    addMessage: function(text, isUser) {
      const messages = document.getElementById('hu-chatbot-messages');
      if (!messages) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = 'hu-chat-message ' + (isUser ? 'hu-user-message' : 'hu-bot-message');
      messageDiv.textContent = text;
      
      messages.appendChild(messageDiv);
      messages.scrollTop = messages.scrollHeight;
    },

    getBotResponse: function(userMessage) {
      const message = userMessage.toLowerCase().trim();
      
      // Check for exact match
      if (HU_RESPONSES[message]) {
        return HU_RESPONSES[message];
      }

      // Check for partial matches
      for (const keyword in HU_RESPONSES) {
        if (message.includes(keyword)) {
          return HU_RESPONSES[keyword];
        }
      }

      // Check for common question patterns
      if (message.includes('how') && message.includes('apply')) {
        return HU_RESPONSES['apply'];
      }
      
      if (message.includes('where') && (message.includes('university') || message.includes('located'))) {
        return HU_RESPONSES['location'];
      }
      
      if (message.includes('what') && message.includes('programs')) {
        return HU_RESPONSES['programs'];
      }

      // Default responses
      const defaults = [
        "Thank you for your question! For detailed information, please contact our office at +92-997-414143-47 or email info@hu.edu.pk",
        "I'd be happy to help! For specific inquiries about Hazara University, please reach out to our support team.",
        "That's a great question! Please contact our admissions office for detailed assistance: +92-997-414143-47",
        "For comprehensive information about that topic, I recommend contacting our university directly at info@hu.edu.pk"
      ];

      return defaults[Math.floor(Math.random() * defaults.length)];
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
  } else {
    initializeChatbot();
  }

})();