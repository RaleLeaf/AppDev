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
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  
  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const useRealAI = !!apiKey;
  const selectedModel = 'gemini-1.5-flash';
  
  // ENHANCED: Comprehensive user profile state with all available fields
  const [userProfile, setUserProfile] = useState({
    // Basic Info
    username: null,
    displayName: null,
    firstName: null,
    lastName: null,
    bio: null,
    profilePictureUrl: null,
    
    // Demographics
    age: null,
    gender: null,
    dateOfBirth: null,
    location: null,
    timezone: null,
    
    // Physical Stats
    height: null,
    weight: null,
    targetWeight: null,
    bmi: null,
    bmiCategory: null,
    
    // Fitness Profile
    fitnessLevel: 'beginner',
    fitnessGoals: [],
    preferences: {},
    
    // Goals & Targets
    dailyCalorieGoal: null,
    weeklyWorkoutGoal: null,
    
    // Activity & Social
    workoutsCompletedCount: null,
    totalWorkoutMinutes: null,
    streakDays: null,
    longestStreak: null,
    followersCount: null,
    followingCount: null,
    
    // Achievement System
    totalPoints: null,
    currentRank: null,
    achievements: [],
    
    // Privacy & Preferences
    isProfilePublic: null,
    shareWorkouts: null,
    shareProgress: null,
    
    // Timestamps
    lastActiveAt: null,
    createdAt: null,
    updatedAt: null
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ENHANCED: Fetch comprehensive user profile data from backend
  const fetchUserProfile = async () => {
    try {
      const authToken = localStorage.getItem('authToken') || 
                        localStorage.getItem('userToken') || 
                        localStorage.getItem('gmToken') || 
                        user?.accessToken;

      if (!authToken || !user?.uid) {
        console.warn('❌ No auth token or user UID available');
        setIsLoadingProfile(false);
        return;
      }

      console.log('🔄 Fetching user profile for:', user.uid);

      // Try to get user profile by Firebase UID first
      const response = await fetch(`http://localhost:8080/api/user-profiles/by-firebase/${user.uid}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        console.log('📋 Raw profile data from backend:', profileData);
        
        // ENHANCED: Update user profile with ALL fetched data
        setUserProfile({
          // Basic Info
          username: profileData.username || null,
          displayName: profileData.displayName || null,
          firstName: profileData.firstName || null,
          lastName: profileData.lastName || null,
          bio: profileData.bio || null,
          profilePictureUrl: profileData.profilePictureUrl || null,
          
          // Demographics
          age: profileData.age || null,
          gender: profileData.gender || null,
          dateOfBirth: profileData.dateOfBirth || null,
          location: profileData.location || null,
          timezone: profileData.timezone || null,
          
          // Physical Stats
          height: profileData.height || null,
          weight: profileData.weight || null,
          targetWeight: profileData.targetWeight || null,
          bmi: profileData.bmi || null,
          bmiCategory: profileData.bmiCategory || null,
          
          // Fitness Profile
          fitnessLevel: (profileData.fitnessLevel || 'BEGINNER').toLowerCase(),
          fitnessGoals: profileData.fitnessGoals || [],
          preferences: profileData.preferences || {},
          
          // Goals & Targets
          dailyCalorieGoal: profileData.dailyCalorieGoal || null,
          weeklyWorkoutGoal: profileData.weeklyWorkoutGoal || null,
          
          // Activity & Social
          workoutsCompletedCount: profileData.workoutsCompletedCount || 0,
          totalWorkoutMinutes: profileData.totalWorkoutMinutes || 0,
          streakDays: profileData.streakDays || 0,
          longestStreak: profileData.longestStreak || 0,
          followersCount: profileData.followersCount || 0,
          followingCount: profileData.followingCount || 0,
          
          // Achievement System
          totalPoints: profileData.totalPoints || 0,
          currentRank: profileData.currentRank || 'BRONZE',
          achievements: profileData.achievements || [],
          
          // Privacy & Preferences
          isProfilePublic: profileData.isProfilePublic || false,
          shareWorkouts: profileData.shareWorkouts || false,
          shareProgress: profileData.shareProgress || false,
          
          // Timestamps
          lastActiveAt: profileData.lastActiveAt || null,
          createdAt: profileData.createdAt || null,
          updatedAt: profileData.updatedAt || null
        });

        console.log('✅ Comprehensive user profile loaded:', {
          name: profileData.firstName || profileData.displayName || profileData.username,
          fitnessLevel: profileData.fitnessLevel,
          goals: profileData.fitnessGoals,
          bmi: profileData.bmi,
          bmiCategory: profileData.bmiCategory,
          age: profileData.age,
          gender: profileData.gender,
          workoutStreak: profileData.streakDays,
          rank: profileData.currentRank,
          completedWorkouts: profileData.workoutsCompletedCount
        });
      } else {
        console.warn('❌ Failed to fetch user profile:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    } catch (error) {
      console.error('💥 Error fetching user profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Load user profile on component mount
  useEffect(() => {
    if (user?.uid) {
      fetchUserProfile();
    } else {
      console.warn('⚠️ No user UID available');
      setIsLoadingProfile(false);
    }
  }, [user?.uid]);

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
      const authToken = localStorage.getItem('authToken') || 
                        localStorage.getItem('userToken') || 
                        localStorage.getItem('gmToken') || 
                        user?.accessToken;
      
      if (!authToken) {
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

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const exercises = await response.json();
        return exercises;
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

  // ENHANCED: Build comprehensive user context for AI
  const buildUserContext = () => {
    const profile = userProfile;
    const displayName = profile.firstName || profile.displayName || profile.username || 'there';
    
    let context = `User Profile for ${displayName}:
- Fitness Level: ${profile.fitnessLevel.toUpperCase()}`;

    // Physical Stats
    if (profile.age) context += `\n- Age: ${profile.age}`;
    if (profile.gender) context += `\n- Gender: ${profile.gender}`;
    if (profile.height) context += `\n- Height: ${profile.height}cm`;
    if (profile.weight) context += `\n- Current Weight: ${profile.weight}kg`;
    if (profile.targetWeight) context += `\n- Target Weight: ${profile.targetWeight}kg`;
    if (profile.bmi) context += `\n- BMI: ${profile.bmi.toFixed(1)}`;
    if (profile.bmiCategory) context += ` (${profile.bmiCategory})`;

    // Goals & Targets
    if (profile.fitnessGoals?.length > 0) {
      context += `\n- Fitness Goals: ${profile.fitnessGoals.join(', ')}`;
    }
    if (profile.dailyCalorieGoal) context += `\n- Daily Calorie Goal: ${profile.dailyCalorieGoal}`;
    if (profile.weeklyWorkoutGoal) context += `\n- Weekly Workout Goal: ${profile.weeklyWorkoutGoal} sessions`;

    // Activity & Progress
    if (profile.workoutsCompletedCount > 0) {
      context += `\n- Workouts Completed: ${profile.workoutsCompletedCount}`;
    }
    if (profile.totalWorkoutMinutes > 0) {
      context += `\n- Total Workout Minutes: ${profile.totalWorkoutMinutes}`;
    }
    if (profile.streakDays > 0) {
      context += `\n- Current Streak: ${profile.streakDays} days`;
    }
    if (profile.longestStreak > 0) {
      context += `\n- Longest Streak: ${profile.longestStreak} days`;
    }

    // Achievement System
    if (profile.currentRank) {
      context += `\n- Current Rank: ${profile.currentRank}`;
    }
    if (profile.totalPoints > 0) {
      context += `\n- Total Points: ${profile.totalPoints}`;
    }
    if (profile.achievements?.length > 0) {
      context += `\n- Recent Achievements: ${profile.achievements.slice(-3).join(', ')}`;
    }

    return context.trim();
  };

  // ENHANCED: Gemini AI Response function with comprehensive user context
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

        const exercises = await fetchExercisesFromAPI(filters);
        if (exercises.length > 0) {
          exerciseContext = `\n\nAvailable exercises from our database:\n${formatExercisesForResponse(exercises)}`;
        }
      }

      // ENHANCED: Build comprehensive user context
      const userContextInfo = buildUserContext();

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
- Always tailor advice to the user's specific fitness level and goals

${userContextInfo}

${recentMessages ? `Recent Conversation Context:\n${recentMessages}\n` : ''}

Current User Message: "${userMessage}"
${exerciseContext}

ENHANCED INSTRUCTIONS:
- Keep responses SHORT and concise (50-150 words max)
- ${isFirstMessage ? 'Greet warmly but briefly, acknowledge their fitness level and BMI if available' : 'No greetings needed'}
- ALWAYS adapt advice to their ${userProfile.fitnessLevel.toUpperCase()} fitness level
- Consider their BMI (${userProfile.bmi ? userProfile.bmi.toFixed(1) : 'not available'}) and category (${userProfile.bmiCategory || 'not available'})
- Reference their workout history: ${userProfile.workoutsCompletedCount} completed workouts, ${userProfile.streakDays} day streak
- Acknowledge their rank: ${userProfile.currentRank} with ${userProfile.totalPoints} points
- If exercises are provided above, list them with numbers (1., 2., 3., etc.)
- Use bullet points for tips
- Include 1-2 relevant emojis only
- Be direct and actionable
- Focus on what they can do in THIS app only
- For progress tracking, say "track here in the app" or "use our features"
- Consider their goals: ${userProfile.fitnessGoals?.join(', ') || 'general fitness'}
- Age-appropriate advice for ${userProfile.age || 'unknown'} year old
- Gender-specific considerations for ${userProfile.gender || 'user'}
- Weight management advice: current ${userProfile.weight}kg, target ${userProfile.targetWeight}kg

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
            maxOutputTokens: 250,
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
      return await getPredefinedResponse(userMessage);
    }
  };

  // ENHANCED: Updated getPredefinedResponse with comprehensive user profile
  const getPredefinedResponse = async (userMessage) => {
    const message = userMessage.toLowerCase();
    const isFirstMessage = messages.length === 0;
    const profile = userProfile;
    const displayName = profile.firstName || profile.displayName || profile.username || 'there';
    
    // Enhanced welcome message with BMI and comprehensive profile
    if (isFirstMessage) {
      let welcomeMessage = `Welcome ${displayName}! 💪\n\n`;
      
      // Add fitness level and rank
      welcomeMessage += `Level: ${profile.fitnessLevel.toUpperCase()}`;
      if (profile.currentRank) welcomeMessage += ` • Rank: ${profile.currentRank}`;
      
      // Add BMI info if available
      if (profile.bmi && profile.bmiCategory) {
        welcomeMessage += `\n📊 BMI: ${profile.bmi.toFixed(1)} (${profile.bmiCategory})`;
      }
      
      // Add streak info
      if (profile.streakDays > 0) {
        welcomeMessage += `\n🔥 Current streak: ${profile.streakDays} days`;
      }
      
      // Add workout count
      if (profile.workoutsCompletedCount > 0) {
        welcomeMessage += `\n💪 Workouts completed: ${profile.workoutsCompletedCount}`;
      }
      
      // Add goals
      if (profile.fitnessGoals?.length > 0) {
        welcomeMessage += `\n🎯 Goals: ${profile.fitnessGoals.join(', ')}`;
      }
      
      // Add weight goal if applicable
      if (profile.weight && profile.targetWeight) {
        const weightDiff = profile.weight - profile.targetWeight;
        if (Math.abs(weightDiff) > 1) {
          welcomeMessage += `\n⚖️ Weight goal: ${profile.targetWeight}kg (${weightDiff > 0 ? `-${Math.abs(weightDiff).toFixed(1)}kg to go` : `+${Math.abs(weightDiff).toFixed(1)}kg to go`})`;
        }
      }
      
      welcomeMessage += `\n\n🏋️ Try: "back exercises", "triceps workout"\n🥗 Ask: "nutrition tips"\n🎯 Say: "motivation"\n\nWhat's your plan today?`;
      
      return welcomeMessage;
    }

    // Enhanced nutrition responses with BMI consideration
    if (message.includes('diet') || message.includes('nutrition') || message.includes('food') || message.includes('eat')) {
      let nutritionAdvice = "Nutrition guidance 🥗:\n";
      
      // BMI-based advice
      if (profile.bmi && profile.bmiCategory) {
        if (profile.bmiCategory === 'UNDERWEIGHT') {
          nutritionAdvice += "• Focus on healthy weight gain\n• Add calorie-dense foods\n• Increase protein intake\n";
        } else if (profile.bmiCategory === 'OVERWEIGHT' || profile.bmiCategory === 'OBESE') {
          nutritionAdvice += "• Create moderate calorie deficit\n• Emphasize lean proteins\n• Increase vegetables/fiber\n";
        } else {
          nutritionAdvice += "• Maintain balanced nutrition\n• Lean proteins & complex carbs\n• Stay hydrated\n";
        }
      }
      
      // Goal-specific advice
      if (profile.fitnessGoals?.includes('Build muscle') || profile.fitnessGoals?.includes('muscle_gain')) {
        nutritionAdvice += "• Protein: 1.6-2.2g per kg body weight\n";
      } else if (profile.fitnessGoals?.includes('Lose weight') || profile.fitnessGoals?.includes('weight_loss')) {
        nutritionAdvice += "• Create 300-500 calorie deficit\n";
      }
      
      // Calorie goal
      if (profile.dailyCalorieGoal) {
        nutritionAdvice += `• Your daily target: ${profile.dailyCalorieGoal} calories\n`;
      }
      
      nutritionAdvice += "\n📊 Track nutrition here in the app!";
      
      return nutritionAdvice;
    }
    
    // Enhanced motivation with comprehensive profile data
    if (message.includes('motivated') || message.includes('goal') || message.includes('progress')) {
      let motivationText = `You're crushing it, ${displayName}! 🌟\n\n`;
      
      // Current achievements
      if (profile.streakDays > 0) {
        motivationText += `🔥 ${profile.streakDays} day streak - amazing!\n`;
      }
      if (profile.workoutsCompletedCount > 0) {
        motivationText += `💪 ${profile.workoutsCompletedCount} workouts completed\n`;
      }
      if (profile.currentRank && profile.totalPoints > 0) {
        motivationText += `🏆 ${profile.currentRank} rank with ${profile.totalPoints} points\n`;
      }
      
      // BMI progress
      if (profile.bmi && profile.weight && profile.targetWeight) {
        const weightDiff = Math.abs(profile.weight - profile.targetWeight);
        if (weightDiff <= 5) {
          motivationText += `⚖️ So close to your weight goal!\n`;
        }
      }
      
      // Goals reminder
      if (profile.fitnessGoals?.length > 0) {
        motivationText += `\n🎯 Your goals: ${profile.fitnessGoals.join(', ')}\n`;
      }
      
      if (profile.weeklyWorkoutGoal) {
        motivationText += `📅 Weekly target: ${profile.weeklyWorkoutGoal} workouts\n`;
      }
      
      motivationText += "\n• Track progress here in the app\n• Celebrate every small win\n• You're stronger than yesterday! 💪";
      
      return motivationText;
    }

    // Enhanced workout responses with user's fitness level
    if (message.includes('workout') || message.includes('exercise')) {
      let filters = { difficulty: profile.fitnessLevel.toUpperCase() };
      
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
          
          let responseText = `Here are ${profile.fitnessLevel} exercises`;
          if (profile.fitnessGoals?.length > 0) {
            responseText += ` for your goals (${profile.fitnessGoals.join(', ')})`;
          }
          responseText += `:\n\n${formattedExercises}\n\n💪 `;
          
          // BMI-based advice
          if (profile.bmiCategory === 'OVERWEIGHT' || profile.bmiCategory === 'OBESE') {
            responseText += 'Combine with cardio for best results!';
          } else if (profile.bmiCategory === 'UNDERWEIGHT') {
            responseText += 'Focus on strength training to build muscle!';
          } else {
            responseText += profile.fitnessLevel === 'advanced' ? 'Push your limits with proper form!' : 
                           profile.fitnessLevel === 'intermediate' ? 'Focus on progressive overload!' : 
                           'Master the movement first!';
          }
          
          return responseText;
        } else {
          return `No ${profile.fitnessLevel} exercises found. Try:\n\n• Different muscle groups\n• Check login status\n\nAvailable: Upper Back, Triceps, Biceps, Abs, Quads, Glutes, Delts 💪`;
        }
      } catch (error) {
        console.error('Error in workout response:', error);
        return "Database connection issue 🔄 Check your connection and login status.";
      }
    }

    // Enhanced muscle group responses with user's fitness level
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
            difficulty: profile.fitnessLevel.toUpperCase() 
          });
          
          if (exercises.length > 0) {
            const formattedExercises = formatExercisesForResponse(exercises);
            let levelAdvice = '';
            
            // BMI-based advice
            if (profile.bmiCategory === 'OVERWEIGHT' || profile.bmiCategory === 'OBESE') {
              levelAdvice = 'Combine with cardio for weight loss!';
            } else if (profile.bmiCategory === 'UNDERWEIGHT') {
              levelAdvice = 'Focus on building muscle mass!';
            } else {
              levelAdvice = profile.fitnessLevel === 'advanced' ? 'Challenge yourself with perfect form!' : 
                           profile.fitnessLevel === 'intermediate' ? 'Focus on mind-muscle connection!' : 
                           'Master the movement first!';
            }
            
            return `${userTerm.toUpperCase()} exercises for ${profile.fitnessLevel} level:\n\n${formattedExercises}\n\n🎯 ${levelAdvice}`;
          } else {
            return `No ${userTerm} exercises for ${profile.fitnessLevel} level found.\n\n• Try different fitness level\n• Check other muscle groups\n• Verify login status 💪`;
          }
        } catch (error) {
          console.error('Error fetching muscle group exercises:', error);
          return "Database issue 🔄 Check connection and login.";
        }
      }
    }
    
    // Enhanced beginner welcome with user's actual level
    if (message.includes('beginner') || message.includes('start') || message.includes('new')) {
      const currentLevel = profile.fitnessLevel;
      let response = "";
      
      if (currentLevel === 'beginner') {
        response = "Perfect! You're at beginner level 🎉\n\nFocus on:\n• Learning proper form\n• Building consistency\n• 2-3 workouts/week\n• Progressive overload\n\n";
        
        if (profile.bmiCategory === 'OVERWEIGHT' || profile.bmiCategory === 'OBESE') {
          response += "💡 Add cardio for weight management";
        } else if (profile.bmiCategory === 'UNDERWEIGHT') {
          response += "💡 Focus on strength training first";
        } else {
          response += "Ready to start?";
        }
      } else if (currentLevel === 'intermediate') {
        response = "I see you're intermediate level! 💪\n\n• Vary your routines\n• Focus on progressive overload\n• 3-4 workouts/week\n• Track your lifts\n\nWhat muscle group today?";
      } else if (currentLevel === 'advanced') {
        response = "Advanced athlete detected! 🏆\n\n• Periodize training\n• Focus on weak points\n• 4-6 sessions/week\n• Perfect form always\n\nWhat's your focus?";
      }
      
      return response;
    }
    
    // Rest and recovery with level-specific advice
    if (message.includes('rest') || message.includes('recovery') || message.includes('sleep')) {
      let recoveryAdvice = "Recovery essentials ✨:\n• 7-9 hours sleep\n• Stay hydrated\n";
      
      if (profile.fitnessLevel === 'advanced') {
        recoveryAdvice += "• 48-72hrs rest between intense sessions\n• Consider deload weeks\n• Monitor overtraining";
      } else if (profile.fitnessLevel === 'intermediate') {
        recoveryAdvice += "• 48hrs rest between training same muscles\n• Active recovery days\n• Listen to your body";
      } else {
        recoveryAdvice += "• Rest 48hrs between full body workouts\n• Light walks on off days\n• Don't train if sore";
      }
      
      // Age-based recovery advice
      if (profile.age > 40) {
        recoveryAdvice += "\n• Extra attention to warm-up\n• Consider longer rest periods";
      }
      
      return recoveryAdvice + "\n\nMuscles grow during rest! 💪";
    }
    
    // Enhanced fallback response with comprehensive user info
    return `I'm here to help your ${profile.fitnessLevel} journey, ${displayName}! 💪\n\n🏋️ Exercises: "back workout", "triceps"\n🥗 Nutrition: "meal tips"\n🎯 Goals: "motivation"\n\nWhat do you need?`;
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

  // Show loading state while fetching profile
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 pt-4 pb-16 font-sans flex flex-col">
      {/* ENHANCED Header with comprehensive user info */}
      <div className="p-5 flex items-center sticky top-0 z-10 bg-[#1a1a1a]">
        <button 
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors" 
          onClick={handleBackClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center pr-8">
          <h1 className="text-xl md:text-2xl font-bold kanit-bold flex items-center justify-center">
            AI Fitness Trainer
            {apiKey && (
              <span className="ml-2 text-xs px-2 py-1 rounded bg-lime-500 text-black">
                GEMINI AI
              </span>
            )}
          </h1>
          <div className="text-xs text-lime-500 mt-1 capitalize flex items-center justify-center gap-2">
            <span>{userProfile.fitnessLevel} Level</span>
            {/* Show BMI category if user is underweight or overweight, otherwise show rank */}
            {userProfile.bmiCategory && (userProfile.bmiCategory === 'UNDERWEIGHT' || userProfile.bmiCategory === 'OVERWEIGHT' || userProfile.bmiCategory === 'OBESE') 
              ? <span>• {userProfile.bmiCategory}</span>
              : userProfile.currentRank && <span>• {userProfile.currentRank} Rank</span>
            }
            {userProfile.bmi && <span>• BMI: {userProfile.bmi.toFixed(1)}</span>}
            {userProfile.streakDays > 0 && <span>• 🔥{userProfile.streakDays}d streak</span>}
          </div>
        </div>
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

        {/* Enhanced Quick Action Buttons based on user level */}
        {messages.length === 0 && (
          <div className="mt-6 mb-4">
            <p className="text-sm text-zinc-400 mb-3">
              Quick questions for {userProfile.fitnessLevel} level:
            </p>
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

        {/* Enhanced AI Status Indicator with user profile info */}
        <div className="mt-6 mb-4">
          <div className={`${apiKey ? 'bg-green-900/20 border-green-500/30' : 'bg-yellow-900/20 border-yellow-500/30'} border rounded p-3`}>
            <div className={`flex items-center ${apiKey ? 'text-green-400' : 'text-yellow-400'} text-sm mb-1`}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              <strong>{apiKey ? 'AI-Powered Personal Trainer' : 'Personal Fitness Coach'}</strong>
            </div>
            <p className={`text-xs ${apiKey ? 'text-green-300' : 'text-yellow-300'}`}>
              {apiKey 
                ? `Customized for ${userProfile.fitnessLevel} level with BMI ${userProfile.bmi ? userProfile.bmi.toFixed(1) : 'unknown'}. Goals: ${userProfile.fitnessGoals?.join(', ') || 'General fitness'}`
                : `Built-in responses tailored for ${userProfile.fitnessLevel} level. Add Gemini AI key for enhanced personalization!`
              }
            </p>
          </div>
        </div>

        {/* Enhanced Workout Programs based on user level */}
        {messages.length === 0 && (
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-4 text-lime-500">
              Recommended for {userProfile.fitnessLevel.charAt(0).toUpperCase() + userProfile.fitnessLevel.slice(1)}
              {userProfile.bmiCategory && ` • ${userProfile.bmiCategory}`}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative bg-white/5 border border-purple-500 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
                  alt="Drill Essentials"
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-semibold text-sm md:text-base">
                    {userProfile.fitnessLevel === 'beginner' ? 'Drill Essentials' : 
                     userProfile.fitnessLevel === 'intermediate' ? 'Strength Builder' : 
                     'Elite Performance'}
                  </div>
                  <div className="text-lime-500 text-xs mt-1">
                    {userProfile.fitnessLevel === 'beginner' ? '06 Workouts · for Beginner' : 
                     userProfile.fitnessLevel === 'intermediate' ? '08 Workouts · for Intermediate' : 
                     '10 Workouts · for Advanced'}
                    {userProfile.bmiCategory === 'OVERWEIGHT' && ' · Includes Cardio'}
                  </div>
                </div>
              </div>

              <div className="relative bg-white/5 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Wake Up Call"
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-semibold text-sm md:text-base">
                    {userProfile.bmiCategory === 'UNDERWEIGHT' ? 'Mass Builder' : 'Wake Up Call'}
                  </div>
                  <div className="text-lime-500 text-xs mt-1">
                    04 Workouts · for {userProfile.weeklyWorkoutGoal ? `${userProfile.weeklyWorkoutGoal}× a Week` : '2× – 3× a Week'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced chat input with user context */}
      <div className="fixed bottom-14 left-0 right-0 bg-[#1a1a1a] px-4 py-2 border-t border-zinc-700">
        <div className="max-w-3xl mx-auto w-full flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask me about ${userProfile.fitnessLevel} workouts, nutrition, or motivation...${apiKey ? ' (Gemini AI)' : ''}`}
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