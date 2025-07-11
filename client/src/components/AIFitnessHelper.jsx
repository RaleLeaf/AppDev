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
  // Hardcoded API key - AI always enabled
  const apiKey = 'AIzaSyBPKqViEbhCFLY_qMtojZb8TdTkfiHxmIo';
  const useRealAI = true;
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

  // Function to format exercises for AI response
  const formatExercisesForResponse = (exercises, maxCount = 5) => {
    return exercises.slice(0, maxCount).map(exercise => {
      const equipment = exercise.equipmentRequired?.length > 0 
        ? exercise.equipmentRequired.join(', ') 
        : 'No equipment needed';
      
      return `• **${exercise.name}** (${exercise.difficulty})\n  - Target: ${exercise.muscleGroup}\n  - Equipment: ${equipment}\n  - ${exercise.defaultSets || 3} sets × ${exercise.defaultReps || 10} reps`;
    }).join('\n\n');
  };

  // Fixed Google Gemini AI Response function with conversation context
  // Replace the getGeminiResponse function with this updated version:
const getGeminiResponse = async (userMessage) => {
  try {
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
            text: `You are TrainerAI, the built-in AI fitness coach for THIS fitness app that the user is currently using.

IMPORTANT CONTEXT:
- The user is ALREADY using this fitness app (your app)
- You are part of their current fitness tracking system
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
- ${isFirstMessage ? 'This is the user\'s first message, so you can greet them warmly' : 'This is an ongoing conversation, so respond naturally without greeting unless specifically asked'}
- Provide helpful, personalized fitness advice in 100-250 words
- If exercises are provided above, reference them specifically from THIS app's database
- Focus on safety, proper form, and encouragement
- Use appropriate emojis and maintain a professional yet friendly tone
- If asked about medical issues, recommend consulting a healthcare professional
- Personalize responses based on the user's fitness level and goals
- Include actionable tips and specific recommendations when possible
- When suggesting exercises, prioritize the ones from our database when available
- DO NOT start with greetings like "Hi there" or "Hey there" unless this is clearly the first interaction

STRICTLY FORBIDDEN:
- Do NOT recommend other fitness apps, trackers, or external tools
- Do NOT suggest using MyFitnessPal, Strava, Apple Health, Fitbit, or ANY other apps
- Do NOT mention downloading additional apps or trackers
- Focus ONLY on what they can do within this current app
- For progress tracking, refer to "tracking your progress in this app" or "using our built-in features"

When discussing progress tracking, say things like:
- "Track your progress here in the app"
- "Use our built-in workout logging"
- "Monitor your achievements within this app"
- "Check your stats in your profile"

Respond as TrainerAI:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 400,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      console.error('Gemini API error:', data.error);
      return `Sorry, I encountered an issue with the AI service: ${data.error.message}. Let me help you with my built-in knowledge instead!\n\n${await getPredefinedResponse(userMessage)}`;
    } else {
      throw new Error('No response from Gemini AI');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return await getPredefinedResponse(userMessage) + "\n\n💡 *Note: Using built-in responses. Check your API settings for enhanced AI features.*";
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

  // Database-only responses with CORRECT muscle group mappings
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

      try {
        const exercises = await fetchExercisesFromAPI(filters);
        
        if (exercises.length > 0) {
          const formattedExercises = formatExercisesForResponse(exercises);
          
          return `${isFirstMessage ? 'Welcome! ' : ''}Here are some ${userProfile.fitnessLevel} level exercises from our database:\n\n${formattedExercises}\n\n💡 These exercises are specifically selected for your fitness level. Would you like me to create a complete workout routine with these?`;
        } else {
          // NO DEFAULT EXERCISES - Only database suggestions
          return `I couldn't find specific exercises matching your request in our database right now. This might be because:\n\n• No exercises match your current fitness level (${userProfile.fitnessLevel})\n• The muscle group might not have exercises available\n• Try asking for different exercises or muscle groups\n\nAvailable muscle groups in our database:\n• Upper Back, Triceps, Biceps\n• Abs, Quads, Glutes\n• Delts, Cardiovascular System\n\n💡 You can also change your fitness level by telling me (e.g., "I'm intermediate").`;
        }
      } catch (error) {
        console.error('Error in workout response:', error);
        return "I'm having trouble accessing our exercise database right now. Please check your internet connection and try again. 🔄\n\nMake sure you're logged in and your backend server is running on localhost:8080.";
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
            return `${isFirstMessage ? 'Welcome! ' : ''}Here are some excellent ${userTerm} exercises for ${userProfile.fitnessLevel}s from our database:\n\n${formattedExercises}\n\n🎯 These exercises target your ${dbMuscleGroup} effectively. Start with lighter weights and focus on proper form!`;
          } else {
            return `I couldn't find ${userTerm} exercises for ${userProfile.fitnessLevel} level in our database. Try:\n\n• Telling me a different fitness level (e.g., "I'm beginner")\n• Asking for a different muscle group\n• Making sure you're logged in\n\nAvailable options: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts! 💪`;
          }
        } catch (error) {
          console.error('Error fetching muscle group exercises:', error);
          return "I'm having trouble accessing our exercise database right now. Please try again in a moment. 🔄\n\nMake sure your backend server is running and you're logged in.";
        }
      }
    }
    
    // Nutrition-related responses
    if (message.includes('diet') || message.includes('nutrition') || message.includes('food') || message.includes('eat')) {
      const nutritionResponses = [
        "Nutrition is 70% of your fitness journey! 🥗 Focus on:\n• Lean proteins (chicken, fish, beans)\n• Complex carbs (quinoa, sweet potatoes)\n• Healthy fats (avocado, nuts)\n• Plenty of vegetables\n\nWhat are your current eating habits like?",
        "For muscle building, aim for 1.6-2.2g protein per kg of body weight. For fat loss, create a moderate caloric deficit of 300-500 calories. What's your primary goal?",
        "Meal prep is a game-changer! 🍱 Try preparing proteins and vegetables in advance. Sunday prep can set you up for success all week. Would you like some easy meal prep ideas?"
      ];
      return nutritionResponses[Math.floor(Math.random() * nutritionResponses.length)];
    }
    
    // Motivation and goals
    if (message.includes('motivated') || message.includes('goal') || message.includes('progress')) {
      const motivationResponses = [
        "Remember, every expert was once a beginner! 🌟 Your progress might be slow, but it's still progress. Celebrate small wins - they add up to big transformations!",
        "Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. 🎯 Instead of 'get fit', try 'do 20 push-ups in a row by month-end'. What's your main fitness goal?",
        "Progress isn't always visible on the scale! 📏 Take measurements, progress photos, and note how you feel. You're building strength, endurance, and confidence every day! 💪"
      ];
      return motivationResponses[Math.floor(Math.random() * motivationResponses.length)];
    }
    
    // Form and technique
    if (message.includes('form') || message.includes('technique') || message.includes('correct')) {
      const formResponses = [
        "Proper form prevents injury and maximizes results! 🎯 Key principles:\n• Control the movement\n• Full range of motion\n• Mind-muscle connection\n\nWhich exercise would you like me to break down?",
        "Quality over quantity always! ✨ It's better to do 10 perfect reps than 20 sloppy ones. Focus on the muscle you're working and move with intention.",
        "Common form mistakes I see:\n❌ Rushing through reps\n❌ Using too much weight too soon\n❌ Neglecting the eccentric (lowering) portion\n\nNeed help with a specific exercise?"
      ];
      return formResponses[Math.floor(Math.random() * formResponses.length)];
    }
    
    // Beginner questions
    if (message.includes('beginner') || message.includes('start') || message.includes('new')) {
      return "Welcome to your fitness journey! 🎉 As a beginner, focus on:\n\n1️⃣ Learning basic movements\n2️⃣ Building consistency (start with 2-3 days/week)\n3️⃣ Progressive overload (gradually increase difficulty)\n4️⃣ Proper nutrition and hydration\n5️⃣ Getting adequate rest\n\nAsk me for specific exercises like 'show me back exercises' or 'triceps workout' to get started with real exercises from our database!";
    }
    
    // Rest and recovery
    if (message.includes('rest') || message.includes('recovery') || message.includes('sleep')) {
      return "Recovery is when the magic happens! ✨🛌\n\nRecovery essentials:\n• 7-9 hours of quality sleep\n• Stay hydrated (8+ glasses water daily)\n• 48-72 hours between training same muscle groups\n• Active recovery (light walks, stretching)\n• Proper nutrition post-workout\n\nYour muscles grow during rest, not just during workouts! Are you getting enough recovery time?";
    }
    
    // Fallback response - updated to not include greeting after first message
    if (isFirstMessage) {
      return "Welcome! I'm your AI fitness trainer! 💪 I'm here to help with:\n\n🏋️ **Exercises**: 'Show me back exercises', 'Give me triceps workout', 'Abs exercises'\n🥗 **Nutrition**: 'What should I eat?', 'Meal prep tips'\n🎯 **Goals**: 'Help me lose weight', 'I want to build muscle'\n📈 **Progress**: 'How to track progress', 'Staying motivated'\n\n💡 Available muscle groups: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts!\n\nWhat would you like to work on today?";
    } else {
      return "I'm here to help with your fitness journey! 💪 Try asking me about:\n\n🏋️ **Exercises**: 'Show me back exercises', 'Give me triceps workout', 'Abs exercises'\n🥗 **Nutrition**: 'What should I eat?', 'Meal prep tips'\n🎯 **Goals**: 'Help me lose weight', 'I want to build muscle'\n📈 **Progress**: 'How to track progress', 'Staying motivated'\n\n💡 Available muscle groups: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts!\n\nWhat would you like to work on?";
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
      {/* Simplified Header - Always shows GEMINI AI */}
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
          <span className="ml-2 text-xs px-2 py-1 rounded bg-lime-500 text-black">
            GEMINI AI
          </span>
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

        {/* AI Status Indicator - Always show */}
        <div className="mt-6 mb-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
            <div className="flex items-center text-green-400 text-sm mb-1">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              <strong>AI-Powered Fitness Coach</strong>
            </div>
            <p className="text-xs text-green-300">
              Powered by Google Gemini AI with access to your exercise database: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts!
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

      {/* Chat input - simplified placeholder */}
      <div className="fixed bottom-14 left-0 right-0 bg-[#1a1a1a] px-4 py-2 border-t border-zinc-700">
        <div className="max-w-3xl mx-auto w-full flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about workouts, nutrition, or motivation... (Gemini AI)"
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