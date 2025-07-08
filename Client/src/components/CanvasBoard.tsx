import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric'; // ✅ Correct import

const CanvasBoard: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [color, setColor] = useState<string>('#000000');

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = new fabric.Canvas('canvas', {
      isDrawingMode: true,
      backgroundColor: '#fff',
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = color;

    canvasRef.current = canvas;

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      canvasRef.current.setWidth(clientWidth);
      canvasRef.current.setHeight(clientHeight);
      canvasRef.current.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
      canvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const brush = new fabric.PencilBrush(canvasRef.current);

    if (tool === 'pencil') {
      brush.color = color;
      brush.width = 2;
    } else if (tool === 'eraser') {
      brush.color = '#ffffff';
      brush.width = 10;
    }

    canvasRef.current.isDrawingMode = true;
    canvasRef.current.freeDrawingBrush = brush;
  }, [tool, color]);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    canvasRef.current.clear();
    canvasRef.current.backgroundColor = '#fff';
    canvasRef.current.renderAll();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-4 p-2 bg-gray-800 text-white">
        <button
          className={`px-3 py-1 rounded ${tool === 'pencil' ? 'bg-blue-600' : 'bg-gray-600'}`}
          onClick={() => setTool('pencil')}
        >
          Pencil
        </button>
        <button
          className={`px-3 py-1 rounded ${tool === 'eraser' ? 'bg-blue-600' : 'bg-gray-600'}`}
          onClick={() => setTool('eraser')}
        >
          Eraser
        </button>
        {tool === 'pencil' && (
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="ml-2 w-10 h-8 p-0 border-0 cursor-pointer"
            title="Select pencil color"
          />
        )}
        <button
          className="ml-auto px-3 py-1 rounded bg-red-600 hover:bg-red-700"
          onClick={clearCanvas}
        >
          Clear Canvas
        </button>
      </div>
      <div ref={containerRef} className="flex-grow">
        <canvas id="canvas" className="w-full h-full" />
      </div>
    </div>
  );
};

export default CanvasBoard;