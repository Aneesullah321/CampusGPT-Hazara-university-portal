    // Simple, reliable chatbot functions
    function toggleChatbot() {
      const container = document.getElementById('chatbotContainer');
      const input = document.getElementById('chatbotInput');
      
      if (container.classList.contains('active')) {
        container.classList.remove('active');
      } else {
        container.classList.add('active');
        if (input) {
          setTimeout(() => input.focus(), 100);
        }
      }
    }

    function closeChatbot() {
      const container = document.getElementById('chatbotContainer');
      container.classList.remove('active');
    }

    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        sendMessage();
      }
    }

    function sendMessage() {
      const input = document.getElementById('chatbotInput');
      const messages = document.getElementById('chatbotMessages');
      const message = input.value.trim();
      
      if (message === '') return;

      // Add user message
      addMessage(message, true);
      input.value = '';

      // Add bot response after delay
      setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, false);
      }, 800);
    }

    function addMessage(text, isUser) {
      const messages = document.getElementById('chatbotMessages');
      const messageDiv = document.createElement('div');
      
      messageDiv.className = 'chat-message ' + (isUser ? 'user-message' : 'bot-message');
      messageDiv.textContent = text;
      
      messages.appendChild(messageDiv);
      messages.scrollTop = messages.scrollHeight;
    }

    function getBotResponse(userMessage) {
      const message = userMessage.toLowerCase();
      
      // University responses
      const responses = {
        'hello': 'Hello! Welcome to Hazara University. How can I assist you today?',
        'hi': 'Hi there! I\'m here to help with any questions about HU. What would you like to know?',
        'salam': 'Wa alaykum salam! Welcome to Hazara University. How can I help you?',
        'admission': 'For admissions, please visit our admissions page or contact us at +92-997-414143-47. Application deadlines vary by program.',
        'apply': 'You can apply online through our admissions portal. Visit the admissions page for more details and requirements.',
        'fee': 'Fee structures vary by program. Please contact our admissions office at +92-997-414143-47 for detailed fee information.',
        'fees': 'Fee structures vary by program. Please contact our admissions office at +92-997-414143-47 for detailed fee information.',
        'contact': 'You can reach us at:\n📞 Phone: +92-997-414143-47\n📧 Email: info@hu.edu.pk\n📍 Address: Dhodial, Mansehra, KPK',
        'location': 'Hazara University is located in Dhodial, Mansehra, Khyber Pakhtunkhwa, Pakistan.',
        'address': 'Our address is: Hazara University, Dhodial, Mansehra, Khyber Pakhtunkhwa, Pakistan.',
        'programs': 'We offer various undergraduate and graduate programs across multiple faculties. Check our Programs page for complete details.',
        'library': 'Our library provides extensive resources for students and faculty. Visit the Library page for more information.',
        'help': 'I can help you with information about:\n• Admissions and applications\n• Programs and courses\n• Contact information\n• University facilities\n• General inquiries',
        'thank': 'You\'re welcome! Is there anything else about Hazara University I can help you with?',
        'thanks': 'You\'re welcome! Is there anything else about Hazara University I can help you with?',
        'bye': 'Goodbye! Thank you for visiting Hazara University. Have a great day!',
        'goodbye': 'Goodbye! Thank you for visiting Hazara University. Have a great day!'
      };

      // Check for exact match
      if (responses[message]) {
        return responses[message];
      }

      // Check for partial matches
      for (const keyword in responses) {
        if (message.includes(keyword)) {
          return responses[keyword];
        }
      }

      // Default responses
      const defaults = [
        "Thank you for your question! For detailed information, please contact our office at +92-997-414143-47 or email info@hu.edu.pk",
        "I'd be happy to help! For specific inquiries about Hazara University, please reach out to our support team.",
        "For comprehensive information about that topic, I recommend contacting our university directly at info@hu.edu.pk"
      ];

      return defaults[Math.floor(Math.random() * defaults.length)];
    }

    // Handle contact form
    document.addEventListener('DOMContentLoaded', function() {
      const contactForm = document.getElementById('contact-form');
      const contactResponse = document.getElementById('form-response');

      if (contactForm && contactResponse) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          contactResponse.textContent = '✅ Your message has been sent! We\'ll get back to you shortly.';
          contactForm.reset();
        });
      }
    });