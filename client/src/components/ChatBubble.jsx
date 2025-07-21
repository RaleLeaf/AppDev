import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBubble() {
  const navigate = useNavigate();

  // FIXED: Adjusted initial position to avoid BottomNav (which is 56px/14rem high)
  const getInitialPosition = () => ({
    x: window.innerWidth - 70,
    y: window.innerHeight - 140 // Increased from 125 to 140 to clear BottomNav
  });

  const [position, setPosition] = useState(getInitialPosition());
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleResize() {
      setPosition({
        x: window.innerWidth - 70,
        y: window.innerHeight - 140, // FIXED: Avoid BottomNav area
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse events (for desktop)
  function onMouseDown(e) {
    if (e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseMove(e) {
    if (!dragging) return;
    
    // ADDED: Constrain position to avoid BottomNav on mobile
    let newY = e.pageY - rel.y;
    const bottomNavHeight = 56; // BottomNav height (h-14 = 56px)
    const maxY = window.innerHeight - bottomNavHeight - 56 - 16; // Bubble height + padding
    
    // Only apply constraint on mobile/tablet screens
    if (window.innerWidth < 768) { // md breakpoint
      newY = Math.min(newY, maxY);
    }
    
    setPosition({
      x: e.pageX - rel.x,
      y: newY,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e) {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  // FIXED: Touch events with proper passive handling and position constraints
  function onTouchStart(e) {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: touch.pageX - rect.left,
      y: touch.pageY - rect.top,
    });
    e.stopPropagation();
  }

  function onTouchMove(e) {
    if (!dragging) return;
    const touch = e.touches[0];
    
    // ADDED: Constrain position to avoid BottomNav on mobile
    let newY = touch.pageY - rel.y;
    const bottomNavHeight = 56; // BottomNav height (h-14 = 56px)
    const maxY = window.innerHeight - bottomNavHeight - 56 - 16; // Bubble height + padding
    
    // Only apply constraint on mobile/tablet screens
    if (window.innerWidth < 768) { // md breakpoint
      newY = Math.min(newY, maxY);
    }
    
    setPosition({
      x: touch.pageX - rel.x,
      y: newY,
    });
    e.stopPropagation();
  }

  function onTouchEnd(e) {
    setDragging(false);
    e.stopPropagation();
  }

  // Click handler: navigate to /ai-helper only if NOT dragging
  function onClick() {
    if (!dragging) {
      navigate('/ai-helper');
    }
  }

  return (
    <div
      className="fixed cursor-pointer z-50"
      style={{
        left: position.x,
        top: position.y,
        width: 56,
        height: 56,
        borderRadius: '50%',
        backgroundColor: '#333333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        // ADDED: Prevent text selection and improve touch handling
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        touchAction: 'none', // This helps with dragging on touch devices
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
      <img src="chat_bubble.png" alt="Chat Bubble" className="w-7 h-7" draggable={false} />
    </div>
  );
}