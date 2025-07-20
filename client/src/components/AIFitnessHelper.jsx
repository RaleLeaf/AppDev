import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottonNav";
import useAuthStore from '../store/authStore';

export default function FitnessChat() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [messages, setMessages] = useState([]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const useRealAI = !!apiKey; // Only enable if API key exists
  const selectedModel = 'gemini-1.5-flash';
  
  const [userProfile, setUserProfile] = useState({
    fitnessLevel: 'beginner',
    goals: [],
    preferences: []
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to fetch exercises from your backend
  const fetchExercisesFromAPI = async (filters = {}) => {
    try {
      // Try all possible token locations
      const authToken = localStorage.getItem('authToken') || 
                        localStorage.getItem('userToken') || 
                        localStorage.getItem('gmToken') || 
                        user?.accessToken;
      
      console.log('🔍 All tokens check:');
      console.log('authToken:', localStorage.getItem('authToken'));
      console.log('userToken:', localStorage.getItem('userToken')); 
      console.log('gmToken:', localStorage.getItem('gmToken'));
      console.log('Final token used:', authToken);
      
      if (!authToken) {
        console.log('❌ No auth token available for exercise fetch');
        return [];
      }

      let url = 'http://localhost:8080/api/exercises';
      
      // Apply filters based on user requirements
      if (filters.muscleGroup) {
        url = `http://localhost:8080/api/exercises/muscle-group/${filters.muscleGroup}`;
      } else if (filters.difficulty) {
        url = `http://localhost:8080/api/exercises/difficulty/${filters.difficulty}`;
      } else if (filters.category) {
        url = `http://localhost:8080/api/exercises/category/${filters.category}`;
      } else if (filters.search) {
        url = `http://localhost:8080/api/exercises/search?name=${filters.search}`;
      }

      console.log('📡 Making request to:', url);
      console.log('🔑 Using Authorization:', `Bearer ${authToken.substring(0, 20)}...`);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response OK:', response.ok);

      if (response.ok) {
        const exercises = await response.json();
        console.log('✅ Fetched exercises:', exercises);
        console.log('📈 Number of exercises:', exercises.length);
        return exercises;
      } else {
        console.error('❌ API Error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('❌ Error details:', errorText);
      }
      
      return [];
    } catch (error) {
      console.error('💥 Network error fetching exercises:', error);
      return [];
    }
  };

  // Updated function to format exercises with enumeration
  const formatExercisesForResponse = (exercises, maxCount = 5) => {
    return exercises.slice(0, maxCount).map((exercise, index) => {
      const equipment = exercise.equipmentRequired?.length > 0 
        ? exercise.equipmentRequired.join(', ') 
        : 'No equipment';
      
      return `${index + 1}. **${exercise.name}** (${exercise.difficulty})
   • Target: ${exercise.muscleGroup}
   • Equipment: ${equipment}
   • Sets: ${exercise.defaultSets || 3} × Reps: ${exercise.defaultReps || 10}`;
    }).join('\n\n');
  };

  // Updated Gemini AI Response function with shorter responses
  const getGeminiResponse = async (userMessage) => {
    try {
      if (!apiKey) {
        throw new Error('Gemini API key not found in environment variables');
      }

      // Get conversation context (last 5 messages for context)
      const recentMessages = messages.slice(-5).map(msg => 
        `${msg.sender === 'user' ? 'User' : 'TrainerAI'}: ${msg.text}`
      ).join('\n');
      
      // Check if this is the first message
      const isFirstMessage = messages.length === 0;
      
      // Try to get relevant exercises first
      let exerciseContext = '';
      const message = userMessage.toLowerCase();
      
      if (message.includes('workout') || message.includes('exercise') || 
          message.includes('chest') || message.includes('back') || 
          message.includes('legs') || message.includes('arms') ||
          message.includes('shoulders') || message.includes('core')) {
        
        let filters = { difficulty: userProfile.fitnessLevel.toUpperCase() };
        
        // Map user terms to actual database muscle groups
        if (message.includes('chest') || message.includes('push')) {
          filters.muscleGroup = 'Triceps'; // Closest to chest in your DB
        } else if (message.includes('back') || message.includes('pull')) {
          filters.muscleGroup = 'Upper Back';
        } else if (message.includes('leg') || message.includes('squat') || message.includes('quad')) {
          filters.muscleGroup = 'Quads';
        } else if (message.includes('glute') || message.includes('butt')) {
          filters.muscleGroup = 'Glutes';
        } else if (message.includes('arm') || message.includes('bicep')) {
          filters.muscleGroup = 'Biceps';
        } else if (message.includes('tricep')) {
          filters.muscleGroup = 'Triceps';
        } else if (message.includes('core') || message.includes('abs')) {
          filters.muscleGroup = 'Abs';
        } else if (message.includes('shoulder') || message.includes('delt')) {
          filters.muscleGroup = 'Delts';
        } else if (message.includes('cardio')) {
          filters.muscleGroup = 'Cardiovascular System';
        }

        // Detect exercise categories
        if (message.includes('cardio')) {
          filters.category = 'CARDIO';
        } else if (message.includes('strength')) {
          filters.category = 'STRENGTH';
        } else if (message.includes('flexibility') || message.includes('stretch')) {
          filters.category = 'FLEXIBILITY';
        }

        const exercises = await fetchExercisesFromAPI(filters);
        if (exercises.length > 0) {
          exerciseContext = `\n\nAvailable exercises from our database:\n${formatExercisesForResponse(exercises)}`;
        }
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${selectedModel}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are TrainerAI, the built-in AI fitness coach for THIS fitness app.

IMPORTANT CONTEXT:
- The user is ALREADY using this fitness app (your app)
- This app has exercise databases, workout tracking, and progress monitoring built-in
- NEVER recommend other fitness trackers, apps, or external tools
- Focus on features and capabilities within THIS app

User Profile:
- Fitness Level: ${userProfile.fitnessLevel}
- Goals: ${userProfile.goals.join(', ') || 'General fitness'}

${recentMessages ? `Recent Conversation Context:\n${recentMessages}\n` : ''}

Current User Message: "${userMessage}"
${exerciseContext}

Instructions:
- Keep responses SHORT and concise (50-100 words max)
- ${isFirstMessage ? 'Greet warmly but briefly' : 'No greetings needed'}
- If exercises are provided above, list them with numbers (1., 2., 3., etc.)
- Use bullet points for tips
- Include 1-2 relevant emojis only
- Be direct and actionable
- Focus on what they can do in THIS app only
- For progress tracking, say "track here in the app" or "use our features"

STRICTLY FORBIDDEN:
- Do NOT recommend other fitness apps or external tools
- Do NOT write long paragraphs
- Do NOT use excessive emojis
- Keep it short and scannable

Respond as TrainerAI:`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200, // Reduced from 400
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.error('Gemini API error:', data.error);
        return `AI service issue. Using built-in responses! 💪\n\n${await getPredefinedResponse(userMessage)}`;
      } else {
        throw new Error('No response from Gemini AI');
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      return await getPredefinedResponse(userMessage) + "\n\n💡 *Using built-in responses*";
    }
  };

  // Enhanced AI Response function with Gemini integration
  const getAIResponse = async (userMessage) => {
    if (useRealAI && apiKey) {
      return await getGeminiResponse(userMessage);
    } else {
      // Use existing predefined responses
      return await getPredefinedResponse(userMessage);
    }
  };

  // Updated getPredefinedResponse with shorter responses
  const getPredefinedResponse = async (userMessage) => {
    const message = userMessage.toLowerCase();
    const isFirstMessage = messages.length === 0;
    
    // Extract user preferences and update profile
    if (message.includes('beginner') || message.includes('new to')) {
      setUserProfile(prev => ({ ...prev, fitnessLevel: 'beginner' }));
    } else if (message.includes('intermediate') || message.includes('experienced')) {
      setUserProfile(prev => ({ ...prev, fitnessLevel: 'intermediate' }));
    } else if (message.includes('advanced') || message.includes('expert')) {
      setUserProfile(prev => ({ ...prev, fitnessLevel: 'advanced' }));
    }

    // Goal detection
    if (message.includes('lose weight') || message.includes('fat loss')) {
      setUserProfile(prev => ({ 
        ...prev, 
        goals: [...prev.goals.filter(g => g !== 'weight_loss'), 'weight_loss'] 
      }));
    }
    if (message.includes('build muscle') || message.includes('gain muscle')) {
      setUserProfile(prev => ({ 
        ...prev, 
        goals: [...prev.goals.filter(g => g !== 'muscle_gain'), 'muscle_gain'] 
      }));
    }
    if (message.includes('strength') || message.includes('stronger')) {
      setUserProfile(prev => ({ 
        ...prev, 
        goals: [...prev.goals.filter(g => g !== 'strength'), 'strength'] 
      }));
    }
    
    // Enhanced workout responses with CORRECT database muscle groups
    if (message.includes('workout') || message.includes('exercise')) {
      let filters = { difficulty: userProfile.fitnessLevel.toUpperCase() };
      
      // Map user terms to actual database muscle groups
      if (message.includes('chest') || message.includes('push')) {
        filters.muscleGroup = 'Triceps';
      } else if (message.includes('back') || message.includes('pull')) {
        filters.muscleGroup = 'Upper Back';
      } else if (message.includes('leg') || message.includes('squat') || message.includes('quad')) {
        filters.muscleGroup = 'Quads';
      } else if (message.includes('glute') || message.includes('butt')) {
        filters.muscleGroup = 'Glutes';
      } else if (message.includes('arm') || message.includes('bicep')) {
        filters.muscleGroup = 'Biceps';
      } else if (message.includes('tricep')) {
        filters.muscleGroup = 'Triceps';
      } else if (message.includes('core') || message.includes('abs')) {
        filters.muscleGroup = 'Abs';
      } else if (message.includes('shoulder') || message.includes('delt')) {
        filters.muscleGroup = 'Delts';
      } else if (message.includes('cardio')) {
        filters.muscleGroup = 'Cardiovascular System';
      }

      // Detect exercise categories
      if (message.includes('cardio')) {
        filters.category = 'CARDIO';
      } else if (message.includes('strength')) {
        filters.category = 'STRENGTH';
      } else if (message.includes('flexibility') || message.includes('stretch')) {
        filters.category = 'FLEXIBILITY';
      }

      try {
        const exercises = await fetchExercisesFromAPI(filters);
        
        if (exercises.length > 0) {
          const formattedExercises = formatExercisesForResponse(exercises);
          
          return `${isFirstMessage ? 'Welcome! 👋 ' : ''}Here are ${userProfile.fitnessLevel} exercises:\n\n${formattedExercises}\n\n💪 Start with proper form!`;
        } else {
          return `No ${userProfile.fitnessLevel} exercises found. Try:\n\n• Different fitness level\n• Other muscle groups\n• Check login status\n\nAvailable: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts 💪`;
        }
      } catch (error) {
        console.error('Error in workout response:', error);
        return "Database connection issue 🔄 Check your connection and login status.";
      }
    }

    // Specific muscle group requests with CORRECT database mappings
    const muscleGroupMappings = {
      'chest': 'Triceps',
      'push': 'Triceps', 
      'back': 'Upper Back',
      'pull': 'Upper Back',
      'legs': 'Quads',
      'leg': 'Quads',
      'quad': 'Quads',
      'quads': 'Quads',
      'glute': 'Glutes',
      'glutes': 'Glutes',
      'butt': 'Glutes',
      'arms': 'Biceps',
      'arm': 'Biceps',
      'bicep': 'Biceps',
      'biceps': 'Biceps',
      'tricep': 'Triceps',
      'triceps': 'Triceps',
      'shoulders': 'Delts',
      'shoulder': 'Delts',
      'delt': 'Delts',
      'delts': 'Delts',
      'core': 'Abs',
      'abs': 'Abs',
      'cardio': 'Cardiovascular System'
    };

    for (const [userTerm, dbMuscleGroup] of Object.entries(muscleGroupMappings)) {
      if (message.includes(userTerm)) {
        try {
          const exercises = await fetchExercisesFromAPI({ 
            muscleGroup: dbMuscleGroup,
            difficulty: userProfile.fitnessLevel.toUpperCase() 
          });
          
          if (exercises.length > 0) {
            const formattedExercises = formatExercisesForResponse(exercises);
            return `${isFirstMessage ? 'Welcome! 👋 ' : ''}${userTerm.toUpperCase()} exercises for ${userProfile.fitnessLevel}s:\n\n${formattedExercises}\n\n🎯 Focus on proper form!`;
          } else {
            return `No ${userTerm} exercises for ${userProfile.fitnessLevel} level found.\n\n• Try different fitness level\n• Check other muscle groups\n• Verify login status\n\nOptions: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts 💪`;
          }
        } catch (error) {
          console.error('Error fetching muscle group exercises:', error);
          return "Database issue 🔄 Check connection and login.";
        }
      }
    }
    
    // Nutrition-related responses - SHORTENED
    if (message.includes('diet') || message.includes('nutrition') || message.includes('food') || message.includes('eat')) {
      const nutritionResponses = [
        "Nutrition basics 🥗:\n• Lean proteins (chicken, fish)\n• Complex carbs (quinoa, sweet potato)\n• Healthy fats (avocado, nuts)\n• Lots of vegetables\n\nWhat's your goal?",
        "Muscle building: 1.6-2.2g protein per kg body weight\nFat loss: 300-500 calorie deficit\n\nWhat's your primary goal? 🎯",
        "Meal prep wins! 🍱\n• Sunday prep saves time\n• Pre-cook proteins & veggies\n• Portion control made easy\n\nNeed meal ideas?"
      ];
      return nutritionResponses[Math.floor(Math.random() * nutritionResponses.length)];
    }
    
    // Motivation and goals - SHORTENED
    if (message.includes('motivated') || message.includes('goal') || message.includes('progress')) {
      const motivationResponses = [
        "Every expert was once a beginner! 🌟 Slow progress is still progress. Celebrate small wins!",
        "SMART goals work best 🎯:\n• Specific\n• Measurable\n• Achievable\n• Time-bound\n\nWhat's your main goal?",
        "Track progress beyond the scale 📏:\n• Take measurements\n• Progress photos\n• How you feel\n\nYou're building strength daily! 💪"
      ];
      return motivationResponses[Math.floor(Math.random() * motivationResponses.length)];
    }
    
    // Form and technique - SHORTENED
    if (message.includes('form') || message.includes('technique') || message.includes('correct')) {
      const formResponses = [
        "Form fundamentals 🎯:\n• Control the movement\n• Full range of motion\n• Mind-muscle connection\n\nWhich exercise?",
        "Quality over quantity! ✨ 10 perfect reps > 20 sloppy ones. Focus on the target muscle.",
        "Common mistakes ❌:\n• Rushing reps\n• Too much weight\n• Skipping lowering phase\n\nNeed help with specific exercise?"
      ];
      return formResponses[Math.floor(Math.random() * formResponses.length)];
    }
    
    // Beginner questions - SHORTENED
    if (message.includes('beginner') || message.includes('start') || message.includes('new')) {
      return "Welcome! 🎉 Beginner focus:\n\n1. Learn basic movements\n2. Build consistency (2-3x/week)\n3. Progressive overload\n4. Good nutrition\n5. Adequate rest\n\nAsk for specific exercises to start!";
    }
    
    // Rest and recovery - SHORTENED
    if (message.includes('rest') || message.includes('recovery') || message.includes('sleep')) {
      return "Recovery essentials ✨:\n• 7-9 hours sleep\n• Stay hydrated\n• 48-72hrs rest between training same muscles\n• Active recovery (walks, stretching)\n\nMuscles grow during rest! 💪";
    }
    
    // Fallback response - SHORTENED
    if (isFirstMessage) {
      return "Welcome! I'm your AI trainer! 💪\n\n🏋️ Exercises: 'back exercises', 'triceps workout'\n🥗 Nutrition: 'meal prep tips'\n🎯 Goals: 'lose weight', 'build muscle'\n\nMuscle groups: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts\n\nWhat's your goal?";
    } else {
      return "I'm here to help! 💪\n\n🏋️ Exercises: 'back exercises', 'triceps workout'\n🥗 Nutrition: 'meal prep tips'\n🎯 Goals: 'lose weight', 'build muscle'\n\nWhat do you need?";
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponseText = await getAIResponse(currentMessage);
      
      // Simulate realistic typing delay for AI
      const delay = useRealAI ? 1000 + Math.random() * 1500 : 1000 + Math.random() * 2000;
      
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: aiResponseText,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, delay);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: "Sorry, I encountered an error. Let me try again! In the meantime, feel free to ask me about workouts, nutrition, or motivation. 💪",
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Handler for back button click
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 pt-4 pb-16 font-sans flex flex-col">
      {/* Simplified Header - Shows GEMINI AI only if API key is available */}
      <div className="p-5 flex items-center sticky top-0 z-10 bg-[#1a1a1a]">
        <button 
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors" 
          onClick={handleBackClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl md:text-2xl font-bold kanit-bold mx-auto pr-8 flex items-center">
          AI Fitness Trainer
          {apiKey && (
            <span className="ml-2 text-xs px-2 py-1 rounded bg-lime-500 text-black">
              GEMINI AI
            </span>
          )}
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pb-20 max-w-3xl mx-auto w-full px-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] md:max-w-[70%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-lime-500 text-black ml-4'
                  : 'bg-zinc-800 text-white mr-4'
              }`}>
                <p className="text-sm md:text-base whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 text-white mr-4 p-3 rounded-2xl max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Buttons - Only show when no messages */}
        {messages.length === 0 && (
          <div className="mt-6 mb-4">
            <p className="text-sm text-zinc-400 mb-3">Quick questions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Show me back exercises",
                "Give me triceps workout",
                "I need biceps exercises",
                "What abs exercises can I do?",
                "Show me quad workout",
                "Give me glutes exercises"
              ].map((quickMessage, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputMessage(quickMessage);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  disabled={isTyping}
                  className="text-left p-3 bg-zinc-800/50 hover:bg-zinc-700 rounded-lg text-sm transition-colors border border-zinc-700 hover:border-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quickMessage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Status Indicator - Shows appropriate status based on API key */}
        <div className="mt-6 mb-4">
          <div className={`${apiKey ? 'bg-green-900/20 border-green-500/30' : 'bg-yellow-900/20 border-yellow-500/30'} border rounded p-3`}>
            <div className={`flex items-center ${apiKey ? 'text-green-400' : 'text-yellow-400'} text-sm mb-1`}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              <strong>{apiKey ? 'AI-Powered Fitness Coach' : 'Basic Fitness Coach'}</strong>
            </div>
            <p className={`text-xs ${apiKey ? 'text-green-300' : 'text-yellow-300'}`}>
              {apiKey 
                ? 'Powered by Google Gemini AI with access to your exercise database: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts!'
                : 'Using built-in responses with access to your exercise database. Add Gemini AI key for enhanced features!'
              }
            </p>
          </div>
        </div>

        {/* Workout Programs Section - Only show when no messages */}
        {messages.length === 0 && (
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-lime-500">Recommended Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Program: Drill Essentials */}
              <div className="relative bg-white/5 border border-purple-500 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
                  alt="Drill Essentials"
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-semibold text-sm md:text-base">Drill Essentials</div>
                  <div className="text-lime-500 text-xs mt-1">06 Workouts · for Beginner</div>
                </div>
              </div>

              {/* Program: Wake Up Call */}
              <div className="relative bg-white/5 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Wake Up Call"
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-semibold text-sm md:text-base">Wake Up Call</div>
                  <div className="text-lime-500 text-xs mt-1">04 Workouts · for 2× – 3× a Week</div>
                </div>
              </div>
              
              {/* Additional program for larger screens */}
              <div className="relative bg-white/5 border border-blue-500 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Strength Builder"
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-semibold text-sm md:text-base">Strength Builder</div>
                  <div className="text-lime-500 text-xs mt-1">08 Workouts · for Intermediate</div>
                </div>
              </div>
              
              {/* Additional program for larger screens */}
              <div className="relative bg-white/5 border border-amber-500 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Cardio Burst"
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-semibold text-sm md:text-base">Cardio Burst</div>
                  <div className="text-lime-500 text-xs mt-1">05 Workouts · for All Levels</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat input - placeholder changes based on AI availability */}
      <div className="fixed bottom-14 left-0 right-0 bg-[#1a1a1a] px-4 py-2 border-t border-zinc-700">
        <div className="max-w-3xl mx-auto w-full flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask me about workouts, nutrition, or motivation...${apiKey ? ' (Gemini AI)' : ''}`}
            className="flex-1 bg-zinc-800 text-white placeholder-gray-400 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-lime-500 text-sm md:text-base"
            disabled={isTyping}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isTyping || !inputMessage.trim()}
            className={`ml-3 p-3 rounded-full transition-colors ${
              isTyping || !inputMessage.trim()
                ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                : 'bg-lime-500 text-black hover:bg-lime-400'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}