import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBubble() {
  const navigate = useNavigate();

  const initialPos = { x: window.innerWidth - 70, y: window.innerHeight - 125 };

  const [position, setPosition] = useState(initialPos);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleResize() {
      setPosition({
        x: window.innerWidth - 70,
        y: window.innerHeight - 70,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setPosition({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e) {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  function onTouchStart(e) {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: touch.pageX - rect.left,
      y: touch.pageY - rect.top,
    });
    e.stopPropagation();
    e.preventDefault();
  }
  function onTouchMove(e) {
    if (!dragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.pageX - rel.x,
      y: touch.pageY - rel.y,
    });
    e.stopPropagation();
    e.preventDefault();
  }
  function onTouchEnd(e) {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
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
